import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
}

interface Store {
  user: User | null;
  cart: CartItem[];
  wishlist: WishlistItem[];
  setUser: (user: User | null) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: Omit<WishlistItem, 'id'>) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      wishlist: [],
      setUser: (user) => set({ user }),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.productId === item.productId);
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
      addToWishlist: (item) =>
        set((state) => {
          if (state.wishlist.some((i) => i.productId === item.productId)) {
            return state;
          }
          return {
            wishlist: [...state.wishlist, { ...item, id: crypto.randomUUID() }],
          };
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.productId !== productId),
        })),
    }),
    {
      name: 'ecommerce-store',
    }
  )
);