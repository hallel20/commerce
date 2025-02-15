import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: List of carts
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  asyncHandler(async (req: Request, res) => {
    const carts = await prisma.cart.findMany({
      include: { items: true, user: true },
    });
    res.json(carts);
  })
);

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart details
 *       404:
 *         description: Cart not found
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res) => {
    const cart = await prisma.cart.findUnique({
      where: { id: req.params.id },
      include: { items: true, user: true },
    });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    res.json(cart);
  })
);

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  asyncHandler(async (req: Request, res) => {
    const cart = await prisma.cart.create({
      data: req.body,
    });
    res.status(201).json(cart);
  })
);

/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     summary: Update a cart
 *     tags: [Carts]
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
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart not found
 */
router.put(
  "/:id",
  asyncHandler(async (req: Request, res) => {
    const cart = await prisma.cart.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(cart);
  })
);

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     summary: Delete a cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 */
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await prisma.cart.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Cart deleted successfully" });
  })
);

export default router;
