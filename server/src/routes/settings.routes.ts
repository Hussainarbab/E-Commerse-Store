import { Router } from 'express';
import { Settings } from '../models/settings.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

export const settingsRoutes = Router();

settingsRoutes.get('/', async (_req, res) => {
  const settings = await Settings.findOne();
  res.json(settings || { siteName: 'LuxeCart' });
});

settingsRoutes.put('/', protect, adminOnly, async (req, res) => {
  const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(settings);
});
