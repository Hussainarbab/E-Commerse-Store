// @ts-nocheck
import { Router } from 'express';
import { Wishlist } from '../models/wishlist.model.js';
import { protect } from '../middleware/auth.middleware.js';

export const wishlistRoutes = Router();

wishlistRoutes.get('/', protect, async (req, res) => {
  const items = await Wishlist.find({ user: req.user._id }).populate('product');
  res.json(items);
});

wishlistRoutes.post('/:productId', protect, async (req, res) => {
  const item = await Wishlist.create({ user: req.user._id, product: req.params.productId });
  res.status(201).json(item);
});

wishlistRoutes.delete('/:productId', protect, async (req, res) => {
  await Wishlist.deleteOne({ user: req.user._id, product: req.params.productId });
  res.json({ message: 'Removed from wishlist' });
});
