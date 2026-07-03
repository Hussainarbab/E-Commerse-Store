// @ts-nocheck
import { Router } from 'express';
import { Order } from '../models/order.model.js';
import { Cart } from '../models/cart.model.js';
import { Coupon } from '../models/coupon.model.js';
import { Invoice } from '../models/invoice.model.js';
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
  try {
    const { shippingAddress, paymentMethod = 'cod', coupon } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.discountPrice || item.product.price,
    }));

    let totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (coupon) {
      const couponDoc = await Coupon.findOne({
        code: coupon.toUpperCase(),
        active: true,
        expiresAt: { $gt: new Date() },
      });
      if (couponDoc) {
        totalAmount = Math.round(totalAmount * (1 - couponDoc.discountPercent / 100) * 100) / 100;
      }
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
    });

    await Invoice.create({ order: order._id, pdfUrl: `/api/invoices/${order._id}/preview` });
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

orderRoutes.put('/:id', protect, adminOnly, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});
