import { Router } from 'express';
import { Order } from '../models/order.model.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

export const orderRoutes = Router();

orderRoutes.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

orderRoutes.get('/', protect, adminOnly, async (_req, res) => {
  const orders = await Order.find().populate('user').sort({ createdAt: -1 });
  res.json(orders);
});

orderRoutes.post('/', protect, async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user._id });
  res.status(201).json(order);
});

orderRoutes.put('/:id', protect, adminOnly, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});
