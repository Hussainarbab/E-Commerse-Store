// @ts-nocheck
import { Router } from 'express';
import { Invoice } from '../models/invoice.model.js';
import { protect } from '../middleware/auth.middleware.js';

export const invoiceRoutes = Router();

invoiceRoutes.get('/:orderId', protect, async (req, res) => {
  const invoice = await Invoice.findOne({ order: req.params.orderId });
  res.json(invoice || { message: 'No invoice generated yet' });
});

invoiceRoutes.post('/:orderId', protect, async (req, res) => {
  const invoice = await Invoice.create({ order: req.params.orderId, pdfUrl: req.body.pdfUrl });
  res.status(201).json(invoice);
});
