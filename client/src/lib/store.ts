import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axiosConfig";
import toast from "react-hot-toast";
import { isLoggedIn } from "../utils/auth";
import { Product } from "../interfaces/types";

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "user" | "admin" | "staff";
  account: {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
  } | null;
}

export interface CartItem {
  id: string;
  product?: Product
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  id: string;
  product?: Product;
  productId: string;
  name: string;
  price: number;
  image: string;
}

interface Store {
  user: User | null;
  cart: CartItem[];
  wishlist: { items: WishlistItem[] };
  setUser: (user: User | null) => void;
  fetchCart: () => void;
  fetchWishlist: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: Omit<WishlistItem, "id">) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      wishlist: { items: [] },
      setUser: (user) => set({ user }),
      fetchCart: async () => {
        try {
          const response = await axiosInstance.get("/cart");
          set({ cart: response.data });
        } catch (error) {
          console.error(error);
        }
      },
      fetchWishlist: async () => {
        try {
          if (isLoggedIn()) {
            const response = await axiosInstance.get("/wishlist/me");
            set({ wishlist: response.data });
          }
        } catch (error) {
          console.error(error);
        }
      },
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (i) => i.productId === item.productId
          );
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...item, id: crypto.randomUUID() }],
          };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),
      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      addToWishlist: async (item) => {
        // const oldWishlistItems = [...get().wishlist.items]; // Store the old wishlist
        try {
          const response = await axiosInstance.post("/wishlist", {
            productId: item.productId,
          });
          const {
            data: { newItem },
          } = response;
          set((state) => ({
            wishlist: {
              ...state.wishlist,
              items: state.wishlist.items
                ? [...state.wishlist.items, newItem]
                : [newItem],
            },
          }));
          toast.success("Product added to wishlist!");
        } catch (error: any) {
          console.error(error);
          toast.error(error.message);
        }
      },
      removeFromWishlist: async (productId) => {
        const oldWishlistItems = [...get().wishlist.items]; // Store the old wishlist

        // Optimistic update: Remove the item from the local state
        set((state) => ({
          wishlist: {
            items: state.wishlist.items.filter(
              (item) => item.productId !== productId
            ),
          },
        }));

        try {
          await axiosInstance.delete(`/wishlist/${productId}`);
          toast.success("Product removed from wishlist");
        } catch (ex: any) {
          // Revert the optimistic update if the API request fails
          set({ wishlist: { items: oldWishlistItems } });
          toast.error(ex.message);
          console.error(ex);
        }
      },
    }),
    {
      name: "ecommerce-store",
    }
  )
);
