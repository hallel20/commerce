import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import staffMiddleware from "../middlewares/staffMiddleware";
import { AuthenticatedRequest } from "../types/declare";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  staffMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const users = await prisma.user.findMany({
      include: { orders: true, cart: true, wishlist: true, account: true },
    });
    res.json(users);
  })
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { orders: true, cart: true, wishlist: true, account: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  })
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  })
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(user);
  })
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "User deleted successfully" });
  })
);


export default router;
