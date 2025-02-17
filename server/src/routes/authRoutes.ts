import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const router = express.Router();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, address, phone } = req.body;

    if (!email || !password || !firstName || !lastName || !address || !phone) {
      res.status(400).json({ message: "All fields are required" });
      return; // Use `return` to exit the function early
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: `${firstName} ${lastName}`,
          account: {
            create: {
              firstName,
              lastName,
              address,
              phone,
            },
          },
        },
      });

      res.status(201).json({ message: "User created successfully", user });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Error creating user", error: error.message });
    }
  })
);;

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  })
);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated
 *       400:
 *         description: Invalid refresh token
 */
router.post(
  "/refresh-token",
  asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: "Refresh token is required" });
    }

    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
        userId: string;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        res.status(400).json({ message: "Invalid refresh token" });
        return
      }

      const newAccessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "15m", // Short-lived access token
      });

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Invalid refresh token", error: error.message });
    }
  })
);

export default router;
