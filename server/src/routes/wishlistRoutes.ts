import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/wishlists:
 *   get:
 *     summary: Get all wishlists
 *     tags: [Wishlists]
 *     responses:
 *       200:
 *         description: List of wishlists
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlists = await prisma.wishlist.findMany({
      include: { items: true, user: true },
    });
    res.json(wishlists);
  })
);

/**
 * @swagger
 * /api/wishlists/{id}:
 *   get:
 *     summary: Get a wishlist by ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist details
 *       404:
 *         description: Wishlist not found
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: req.params.id },
      include: { items: true, user: true },
    });

    if (!wishlist) {
      res.status(404).json({ message: "Wishlist not found" });
      return;
    }

    res.json(wishlist);
  })
);

/**
 * @swagger
 * /api/wishlists:
 *   post:
 *     summary: Create a new wishlist
 *     tags: [Wishlists]
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
 *         description: Wishlist created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlist = await prisma.wishlist.create({
      data: req.body,
    });
    res.status(201).json(wishlist);
  })
);

/**
 * @swagger
 * /api/wishlists/{id}:
 *   put:
 *     summary: Update a wishlist
 *     tags: [Wishlists]
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
 *         description: Wishlist updated successfully
 *       404:
 *         description: Wishlist not found
 */
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const wishlist = await prisma.wishlist.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(wishlist);
  })
);

/**
 * @swagger
 * /api/wishlists/{id}:
 *   delete:
 *     summary: Delete a wishlist
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist deleted successfully
 *       404:
 *         description: Wishlist not found
 */
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await prisma.wishlist.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Wishlist deleted successfully" });
  })
);

export default router;
