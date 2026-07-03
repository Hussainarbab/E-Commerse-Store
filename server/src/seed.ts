import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.model.js';
import { Category } from './models/category.model.js';
import { Product } from './models/product.model.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const categories = [
  { name: 'Watches & Jewelry', slug: 'watches-jewelry' },
  { name: 'Laptops & Computers', slug: 'laptops-computers' },
  { name: 'Groceries & Food', slug: 'groceries-food' },
  { name: 'Makeup & Beauty', slug: 'makeup-beauty' },
  { name: 'Fashion & Clothing', slug: 'fashion-clothing' },
  { name: 'Mobile & Tablets', slug: 'mobile-tablets' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Sports & Fitness', slug: 'sports-fitness' },
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fragrances', slug: 'fragrances' },
];

const products = [
  // Watches
  { name: 'Arbab Classic Gold Watch', slug: 'arbab-classic-gold-watch', description: 'Elegant stainless steel watch with sapphire crystal and water resistance.', price: 349, discountPrice: 299, stock: 40, sku: 'WCH-001', category: 'watches-jewelry', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['watch', 'luxury'] },
  { name: 'Nova Smart Watch Pro', slug: 'nova-smart-watch-pro', description: 'Fitness tracking, heart rate monitor, and 7-day battery life.', price: 199, discountPrice: 169, stock: 60, sku: 'WCH-002', category: 'watches-jewelry', images: ['https://images.unsplash.com/photo-1544117762-33de9f3a5f1c?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['smartwatch', 'fitness'] },
  { name: 'Silver Diamond Bracelet', slug: 'silver-diamond-bracelet', description: 'Handcrafted 925 silver bracelet with cubic zirconia stones.', price: 129, stock: 30, sku: 'JWL-001', category: 'watches-jewelry', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['jewelry', 'bracelet'] },

  // Laptops
  { name: 'Arbab Pro Laptop 15"', slug: 'arbab-pro-laptop-15', description: 'Intel Core i7, 16GB RAM, 512GB SSD — built for work and creativity.', price: 1299, discountPrice: 1149, stock: 25, sku: 'LAP-001', category: 'laptops-computers', images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['laptop', 'work'] },
  { name: 'UltraBook Air 13"', slug: 'ultrabook-air-13', description: 'Lightweight ultrabook with all-day battery and stunning display.', price: 999, discountPrice: 899, stock: 35, sku: 'LAP-002', category: 'laptops-computers', images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['laptop', 'ultrabook'] },
  { name: 'Gaming Beast RTX Laptop', slug: 'gaming-beast-rtx-laptop', description: 'RTX graphics, 32GB RAM, 1TB SSD for serious gaming performance.', price: 1899, discountPrice: 1699, stock: 15, sku: 'LAP-003', category: 'laptops-computers', images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['gaming', 'laptop'] },

  // Groceries
  { name: 'Organic Honey Jar 500g', slug: 'organic-honey-jar-500g', description: 'Pure organic wildflower honey sourced from natural farms.', price: 18, discountPrice: 14, stock: 200, sku: 'GRC-001', category: 'groceries-food', images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['organic', 'honey'] },
  { name: 'Premium Olive Oil 1L', slug: 'premium-olive-oil-1l', description: 'Extra virgin cold-pressed olive oil from Mediterranean groves.', price: 24, stock: 150, sku: 'GRC-002', category: 'groceries-food', images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['olive-oil', 'gourmet'] },
  { name: 'Assorted Dry Fruits Pack', slug: 'assorted-dry-fruits-pack', description: 'Premium almonds, cashews, walnuts, and raisins — 1kg gift pack.', price: 32, discountPrice: 27, stock: 100, sku: 'GRC-003', category: 'groceries-food', images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['dry-fruits', 'healthy'] },

  // Makeup
  { name: 'Velvet Matte Lipstick Set', slug: 'velvet-matte-lipstick-set', description: '6-shade long-lasting matte lipstick collection for every occasion.', price: 45, discountPrice: 38, stock: 80, sku: 'MKP-001', category: 'makeup-beauty', images: ['https://images.unsplash.com/photo-1586495777744-4413d210d0c8?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['lipstick', 'makeup'] },
  { name: 'Glow Foundation SPF 30', slug: 'glow-foundation-spf-30', description: 'Full-coverage foundation with SPF protection and natural finish.', price: 38, stock: 70, sku: 'MKP-002', category: 'makeup-beauty', images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['foundation', 'skincare'] },
  { name: 'Luxury Eyeshadow Palette', slug: 'luxury-eyeshadow-palette', description: '24 highly pigmented shades — mattes, shimmers, and metallics.', price: 55, discountPrice: 47, stock: 55, sku: 'MKP-003', category: 'makeup-beauty', images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['eyeshadow', 'palette'] },

  // Fashion
  { name: 'Classic Leather Jacket', slug: 'classic-leather-jacket', description: 'Genuine leather jacket with modern slim fit design.', price: 189, discountPrice: 159, stock: 45, sku: 'FAS-001', category: 'fashion-clothing', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['jacket', 'leather'] },
  { name: 'Premium Cotton T-Shirt Pack', slug: 'premium-cotton-tshirt-pack', description: 'Pack of 3 soft breathable cotton tees in essential colors.', price: 49, stock: 120, sku: 'FAS-002', category: 'fashion-clothing', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['tshirt', 'basics'] },

  // Mobile
  { name: 'Arbab X Smartphone', slug: 'arbab-x-smartphone', description: '6.7" AMOLED display, 128GB storage, triple camera system.', price: 699, discountPrice: 629, stock: 50, sku: 'MOB-001', category: 'mobile-tablets', images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['phone', 'smartphone'] },
  { name: 'Pro Tablet 11"', slug: 'pro-tablet-11', description: '11-inch tablet with stylus support and 10-hour battery.', price: 449, discountPrice: 399, stock: 40, sku: 'MOB-002', category: 'mobile-tablets', images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['tablet', 'stylus'] },

  // Home
  { name: 'Smart Air Fryer 5L', slug: 'smart-air-fryer-5l', description: 'Digital air fryer with 8 presets for healthy cooking.', price: 89, discountPrice: 74, stock: 65, sku: 'HOM-001', category: 'home-kitchen', images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['kitchen', 'appliance'] },
  { name: 'Luxury Bedding Set', slug: 'luxury-bedding-set', description: 'Egyptian cotton 400-thread count sheet set — king size.', price: 120, discountPrice: 99, stock: 35, sku: 'HOM-002', category: 'home-kitchen', images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['bedding', 'home'] },

  // Sports
  { name: 'Pro Running Shoes', slug: 'pro-running-shoes', description: 'Lightweight cushioned running shoes for all terrains.', price: 129, discountPrice: 109, stock: 75, sku: 'SPT-001', category: 'sports-fitness', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['shoes', 'running'] },
  { name: 'Yoga Mat Premium', slug: 'yoga-mat-premium', description: 'Non-slip eco-friendly yoga mat with carrying strap.', price: 35, stock: 90, sku: 'SPT-002', category: 'sports-fitness', images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['yoga', 'fitness'] },

  // Electronics
  { name: 'Aurora Wireless Headphones', slug: 'aurora-wireless-headphones', description: 'Premium noise-cancelling wireless headphones with immersive sound.', price: 299, discountPrice: 249, stock: 55, sku: 'ELC-001', category: 'electronics', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['audio', 'headphones'] },
  { name: '4K Smart TV 55"', slug: '4k-smart-tv-55', description: 'Ultra HD smart TV with built-in streaming apps and HDR.', price: 599, discountPrice: 529, stock: 20, sku: 'ELC-002', category: 'electronics', images: ['https://images.unsplash.com/photo-1593359677870-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['tv', 'smart'] },

  // Fragrances
  { name: 'Arbab Signature Perfume', slug: 'arbab-signature-perfume', description: 'Elegant unisex fragrance with woody and citrus notes — 100ml.', price: 85, discountPrice: 72, stock: 60, sku: 'FRG-001', category: 'fragrances', images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'], featured: true, tags: ['perfume', 'luxury'] },
  { name: 'Rose Oud Eau de Parfum', slug: 'rose-oud-eau-de-parfum', description: 'Rich Middle Eastern inspired oud and rose blend — 50ml.', price: 95, stock: 45, sku: 'FRG-002', category: 'fragrances', images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'], featured: false, tags: ['oud', 'perfume'] },
];

const seed = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxecart';
  try {
    await mongoose.connect(mongoUri);
  } catch {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const memoryServer = await MongoMemoryServer.create();
    await mongoose.connect(memoryServer.getUri());
  }

  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  const adminPassword = await bcrypt.hash('Admin@123', 10);
  await User.create({
    firstName: 'Arbab',
    lastName: 'Hussan',
    username: 'arbab',
    email: 'arbabhussan63@gmail.com',
    phone: '1234567890',
    password: adminPassword,
    country: 'Pakistan',
    city: 'Karachi',
    address: 'Arbabcollection HQ',
    role: 'admin',
  });

  const categoryMap: Record<string, mongoose.Types.ObjectId> = {};
  for (const cat of categories) {
    const created = await Category.create(cat);
    categoryMap[cat.slug] = created._id;
  }

  for (const product of products) {
    const { category, ...rest } = product;
    await Product.create({ ...rest, category: categoryMap[category] });
  }

  console.log(`Seed complete: ${categories.length} categories, ${products.length} products`);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
