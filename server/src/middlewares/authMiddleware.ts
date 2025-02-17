import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/declare";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    // If no token is provided, set req.user to null and proceed
    req.user = null;
    return next();
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Fetch the user and their account from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { account: true }, // Include the associated account
    });

    if (!user) {
      // If the user doesn't exist, set req.user to null and proceed
      req.user = null;
      return next();
    }

    // Attach the user and account to req.user
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      account: user.account,
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, set req.user to null and proceed
    req.user = null;
    next();
  }
};

export default authMiddleware;
