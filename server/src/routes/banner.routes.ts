import { Router } from 'express';
import { Banner } from '../models/banner.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

export const bannerRoutes = Router();

bannerRoutes.get('/', async (_req, res) => {
  const banners = await Banner.find({ active: true });
  res.json(banners);
});

bannerRoutes.post('/', protect, adminOnly, async (req, res) => {
  const banner = await Banner.create(req.body);
  res.status(201).json(banner);
});
