import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.model.js';
import { Category } from './models/category.model.js';
import { Product } from './models/product.model.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxecart');

  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  const adminPassword = await bcrypt.hash('Admin@123', 10);
  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    email: 'arbabhussan63@gmail.com',
    phone: '1234567890',
    password: adminPassword,
    country: 'Pakistan',
    city: 'Karachi',
    address: 'Head Office',
    role: 'admin',
  });

  const category = await Category.create({ name: 'Electronics', slug: 'electronics' });
  await Product.create({
    name: 'Aurora Headphones',
    slug: 'aurora-headphones',
    description: 'Premium wireless headphones with immersive sound.',
    price: 299,
    discountPrice: 249,
    stock: 25,
    sku: 'SKU-001',
    category: category._id,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    featured: true,
    tags: ['audio', 'wireless'],
  });

  console.log('Seed data created');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
