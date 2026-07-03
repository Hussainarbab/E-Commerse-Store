// @ts-nocheck
import { Router } from 'express';
import { Cart } from '../models/cart.model.js';
import { protect } from '../middleware/auth.middleware.js';

export const cartRoutes = Router();

cartRoutes.get('/', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart || { items: [] });
});

cartRoutes.post('/:productId', protect, async (req, res) => {
  const quantity = Number(req.body.quantity || 1);
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const existing = cart.items.find((item) => item.product.toString() === req.params.productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: req.params.productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

cartRoutes.delete('/:productId', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.json({ items: [] });
  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
});
