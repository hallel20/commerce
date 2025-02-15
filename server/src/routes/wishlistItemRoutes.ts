import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/wishlist-items:
 *   get:
 *     summary: Get all wishlist items
 *     tags: [WishlistItems]
 *     responses:
 *       200:
 *         description: List of wishlist items
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlistItems = await prisma.wishlistItem.findMany({
      include: { wishlist: true },
    });
    res.json(wishlistItems);
  })
);

/**
 * @swagger
 * /api/wishlist-items/{id}:
 *   get:
 *     summary: Get a wishlist item by ID
 *     tags: [WishlistItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist item details
 *       404:
 *         description: Wishlist item not found
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: { id: req.params.id },
      include: { wishlist: true },
    });

    if (!wishlistItem) {
      res.status(404).json({ message: "Wishlist item not found" });
      return;
    }

    res.json(wishlistItem);
  })
);

/**
 * @swagger
 * /api/wishlist-items:
 *   post:
 *     summary: Create a new wishlist item
 *     tags: [WishlistItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wishlistId
 *               - productId
 *             properties:
 *               wishlistId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Wishlist item created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlistItem = await prisma.wishlistItem.create({
      data: req.body,
    });
    res.status(201).json(wishlistItem);
  })
);

/**
 * @swagger
 * /api/wishlist-items/{id}:
 *   put:
 *     summary: Update a wishlist item
 *     tags: [WishlistItems]
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
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wishlist item updated successfully
 *       404:
 *         description: Wishlist item not found
 */
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlistItem = await prisma.wishlistItem.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(wishlistItem);
  })
);

/**
 * @swagger
 * /api/wishlist-items/{id}:
 *   delete:
 *     summary: Delete a wishlist item
 *     tags: [WishlistItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist item deleted successfully
 *       404:
 *         description: Wishlist item not found
 */
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await prisma.wishlistItem.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Wishlist item deleted successfully" });
  })
);

export default router;