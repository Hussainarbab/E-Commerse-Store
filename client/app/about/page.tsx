import Link from 'next/link';
import Navbar from '../components/Navbar';

const values = [
  { title: 'Global Selection', desc: 'Watches, laptops, groceries, makeup, fashion, and more — sourced from trusted brands worldwide.' },
  { title: 'Quality First', desc: 'Every product is carefully selected so you shop with confidence, every single time.' },
  { title: 'Customer Care', desc: 'Fast delivery, secure checkout, and friendly support — because you deserve the best experience.' },
];

const milestones = [
  { year: '2024', event: 'Arbabcollection was founded with a vision to bring the world\'s best products to one place.' },
  { year: '2025', event: 'Expanded into electronics, beauty, groceries, and lifestyle categories.' },
  { year: '2026', event: 'Launched a full online store serving customers across the globe.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_45%)]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <p className="mb-4 inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">
          About Arbab
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          Welcome to Arbabcollection — where the world shops in one place.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Arbabcollection was built by Arbab with a simple mission: make it easy for everyone to discover and buy
          the finest products from around the world — from luxury watches and powerful laptops to everyday groceries
          and premium makeup.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Hi, I&apos;m <strong className="text-white">Arbab</strong> — the founder of Arbabcollection. I started this
              platform because I believed shopping should feel exciting, simple, and truly global. Whether you need a
              sleek smartwatch, a high-performance laptop, fresh groceries, or the latest makeup trends, Arbabcollection
              brings it all together under one trusted roof.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              What began as a passion for quality products has grown into a full ecommerce destination serving customers
              who want variety, value, and a premium shopping experience — no matter where they are in the world.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 className="text-2xl font-semibold">What We Sell</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {['Watches & Jewelry', 'Laptops & Tech', 'Groceries & Food', 'Makeup & Beauty', 'Fashion & Clothing', 'Home & Kitchen', 'Sports & Fitness', 'Mobile & Tablets'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-indigo-400">✦</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/shop" className="mt-6 inline-flex rounded-full bg-indigo-500 px-5 py-3 text-sm font-medium">
              Explore the Shop
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-semibold">Our Values</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h3 className="font-medium">{v.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-semibold">Our Journey</h2>
        <div className="mt-8 space-y-6">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
              <span className="shrink-0 rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-300">{m.year}</span>
              <p className="text-sm text-slate-300">{m.event}</p>
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
