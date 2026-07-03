// @ts-nocheck
import { Router } from 'express';
import { Review } from '../models/review.model.js';
import { protect } from '../middleware/auth.middleware.js';

export const reviewRoutes = Router();

reviewRoutes.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'firstName lastName');
  res.json(reviews);
});

reviewRoutes.post('/:productId', protect, async (req, res) => {
  const review = await Review.create({ user: req.user._id, product: req.params.productId, ...req.body });
  res.status(201).json(review);
});
