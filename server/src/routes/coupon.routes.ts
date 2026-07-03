// @ts-nocheck
import { Router } from 'express';
import { Coupon } from '../models/coupon.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

export const couponRoutes = Router();

couponRoutes.get('/', async (_req, res) => {
  const coupons = await Coupon.find({ active: true });
  res.json(coupons);
});

couponRoutes.post('/', protect, adminOnly, async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
});
