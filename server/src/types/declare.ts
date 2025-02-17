import { Request } from "express";

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

export interface AuthenticatedRequest extends Request {
  user?: User | null;
}
