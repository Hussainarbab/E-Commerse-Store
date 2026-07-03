// @ts-nocheck
import { Router } from 'express';
import { Category } from '../models/category.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

export const categoryRoutes = Router();

categoryRoutes.get('/', async (_req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

categoryRoutes.post('/', protect, adminOnly, async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

categoryRoutes.put('/:id', protect, adminOnly, async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

categoryRoutes.delete('/:id', protect, adminOnly, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
});
