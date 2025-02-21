// src/interfaces/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images?: Image[];
  category: Category;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Order {
  id: string;
  user: User;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: String;
  email: String;
  name: String;
  password: String;
  role: "admin" | "staff" | "user";
  orders: Order[];
  cart?: Cart;
  wishlist?: Wishlist;
  account?: Account;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  order: Order;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  firstName: string;
  picture: Image[]; // Assuming `Image` is another type/interface
  lastName: string;
  address: string;
  phone: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}