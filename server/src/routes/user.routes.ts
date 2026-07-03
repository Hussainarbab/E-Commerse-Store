// @ts-nocheck
import { Router } from 'express';
import { User } from '../models/user.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

export const userRoutes = Router();

userRoutes.get('/', protect, adminOnly, async (_req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

userRoutes.put('/:id/suspend', protect, adminOnly, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isSuspended: true }, { new: true });
  res.json(user);
});
