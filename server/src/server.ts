// @ts-nocheck
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { authRoutes } from './routes/auth.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { orderRoutes } from './routes/order.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { settingsRoutes } from './routes/settings.routes.js';
import { bannerRoutes } from './routes/banner.routes.js';
import { couponRoutes } from './routes/coupon.routes.js';
import { wishlistRoutes } from './routes/wishlist.routes.js';
import { cartRoutes } from './routes/cart.routes.js';
import { reviewRoutes } from './routes/review.routes.js';
import { invoiceRoutes } from './routes/invoice.routes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/invoices', invoiceRoutes);

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxecart';
    try {
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB');
    } catch (error) {
      if (process.env.NODE_ENV === 'production') throw error;
      console.warn('Local MongoDB unavailable — starting in-memory database for development.');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const memoryServer = await MongoMemoryServer.create();
      await mongoose.connect(memoryServer.getUri());
      console.log('Connected to in-memory MongoDB');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
