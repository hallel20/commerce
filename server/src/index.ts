import asyncHandler from 'express-async-handler';
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables early
dotenv.config();

// Import routes
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cartRoutes from "./routes/cartRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
import accountRoutes from "./routes/accountRoutes";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";

//Import Middlewares
import authMiddleware from "./middlewares/authMiddleware";
import { AuthenticatedRequest } from './types/declare';
import path from "path";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(authMiddleware)

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Commerce API Documentation",
      version: "1.0.0",
      description: "API documentation for the Commerce platform",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
      {
        url: "https://commerce.cyberwizdev.com.ng",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.get("/api/v1/profile", asyncHandler((req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return
  }

  res.json({ message: "Welcome to your profile", user: req.user });
}))

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown); // Handles Ctrl + C
 