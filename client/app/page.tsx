import Link from 'next/link';
import Navbar from './components/Navbar';

const categories = [
  { name: 'Watches', icon: '⌚', href: '/shop?category=watches-jewelry' },
  { name: 'Laptops', icon: '💻', href: '/shop?category=laptops-computers' },
  { name: 'Groceries', icon: '🛒', href: '/shop?category=groceries-food' },
  { name: 'Makeup', icon: '💄', href: '/shop?category=makeup-beauty' },
  { name: 'Fashion', icon: '👗', href: '/shop?category=fashion-clothing' },
  { name: 'Mobile', icon: '📱', href: '/shop?category=mobile-tablets' },
  { name: 'Home', icon: '🏠', href: '/shop?category=home-kitchen' },
  { name: 'Sports', icon: '⚽', href: '/shop?category=sports-fitness' },
];

const featuredProducts = [
  { name: 'Arbab Classic Gold Watch', price: '$299', badge: 'Watches', href: '/shop?category=watches-jewelry' },
  { name: 'Arbab Pro Laptop 15"', price: '$1,149', badge: 'Laptops', href: '/shop?category=laptops-computers' },
  { name: 'Velvet Matte Lipstick Set', price: '$38', badge: 'Makeup', href: '/shop?category=makeup-beauty' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.22),_transparent_40%)]">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">
            Arbabcollection — Shop the World
          </p>
          <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">
            Everything you need, from watches to groceries.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Discover watches, laptops, makeup, groceries, fashion, electronics, and more — all in one global marketplace founded by Arbab.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="rounded-full bg-white px-5 py-3 font-medium text-slate-900">Shop Now</Link>
            <Link href="/about" className="rounded-full border border-white/20 px-5 py-3 font-medium">About Arbab</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <div className="grid gap-4">
            <div className="rounded-2xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Featured at Arbabcollection</p>
              <h2 className="mt-2 text-2xl font-semibold">Global Products, Local Trust</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {featuredProducts.map((product) => (
                <Link key={product.name} href={product.href} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-indigo-500/40">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{product.badge}</p>
                  <h3 className="mt-2 text-sm font-medium">{product.name}</h3>
                  <p className="mt-3 text-lg font-semibold">{product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-semibold">Shop by Category</h2>
        <p className="mt-2 text-center text-sm text-slate-400">Watches, laptops, groceries, makeup, and everything in between</p>
        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-indigo-500/40 hover:bg-indigo-500/10"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-3 font-medium">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Worldwide Products', desc: 'From luxury watches to daily groceries — sourced globally for you.' },
            { title: 'Secure Checkout', desc: 'Safe payments and protected orders on every purchase.' },
            { title: 'Fast Delivery', desc: 'Quick shipping so your favorites arrive on time.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        <p>© 2026 Arbabcollection. Founded by Arbab.</p>
      </footer>
    </main>
  );
}
