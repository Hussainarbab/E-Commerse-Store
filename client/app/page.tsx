import Link from 'next/link';
import { motion } from 'framer-motion';

const featuredProducts = [
  { name: 'Aurora Headphones', price: '$299', badge: 'Best Seller' },
  { name: 'Nova Smart Watch', price: '$199', badge: 'New' },
  { name: 'Luma Backpack', price: '$129', badge: 'Trending' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.22),_transparent_40%)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="text-2xl font-semibold">LuxeCart</div>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="#">Home</Link>
          <Link href="#">Shop</Link>
          <Link href="#">Categories</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border border-white/20 px-4 py-2 text-sm">Login</Link>
          <Link href="/signup" className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium">Signup</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mb-4 inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">Premium shopping experience</p>
          <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">Elevate your everyday essentials.</h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">Discover beautifully curated products, fast checkout, and a personalized experience built for modern shoppers.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="rounded-full bg-white px-5 py-3 font-medium text-slate-900">Shop Now</Link>
            <Link href="/admin" className="rounded-full border border-white/20 px-5 py-3 font-medium">View Admin</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }} className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <div className="grid gap-4">
            <div className="rounded-2xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Featured Collection</p>
              <h2 className="mt-2 text-2xl font-semibold">Smart Tech, Timeless Design</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {featuredProducts.map((product) => (
                <div key={product.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{product.badge}</p>
                  <h3 className="mt-2 font-medium">{product.name}</h3>
                  <p className="mt-3 text-lg font-semibold">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {["Fast Delivery", "Secure Payments", "24/7 Support"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h3 className="font-medium">{item}</h3>
              <p className="mt-2 text-sm text-slate-400">Crafted for reliability and a premium experience.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
