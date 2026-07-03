"use client";

import Link from 'next/link';
import { PageShell } from '../components/PageShell';

const cards = [
  { label: 'Revenue', value: '$48K' },
  { label: 'Orders', value: '312' },
  { label: 'Customers', value: '1.2K' },
  { label: 'Products Sold', value: '4.8K' },
];

export default function AdminDashboardPage() {
  return (
    <PageShell>
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Arbabcollection Admin</h1>
            <p className="mt-2 text-slate-400">Manage watches, laptops, makeup, groceries, and all store operations.</p>
          </div>
          <Link href="/admin/products" className="rounded-full bg-indigo-500 px-4 py-2 text-sm">Manage Products</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-6">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    </PageShell>
  );
}
