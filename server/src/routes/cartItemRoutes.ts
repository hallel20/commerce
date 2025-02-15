import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/cart-items:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const cartItems = await prisma.cartItem.findMany({
      include: { cart: true },
    });
    res.json(cartItems);
  })
);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   get:
 *     summary: Get a cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item details
 *       404:
 *         description: Cart item not found
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: req.params.id },
      include: { cart: true },
    });

    if (!cartItem) {
      res.status(404).json({ message: "Cart item not found" });
      return;
    }

    res.json(cartItem);
  })
);

/**
 * @swagger
 * /api/cart-items:
 *   post:
 *     summary: Create a new cart item
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartId
 *               - productId
 *               - quantity
 *             properties:
 *               cartId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart item created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const cartItem = await prisma.cartItem.create({
      data: req.body,
    });
    res.status(201).json(cartItem);
  })
);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   put:
 *     summary: Update a cart item
 *     tags: [CartItems]
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
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 */
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const cartItem = await prisma.cartItem.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(cartItem);
  })
);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   delete:
 *     summary: Delete a cart item
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 */
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await prisma.cartItem.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Cart item deleted successfully" });
  })
);

export default router;