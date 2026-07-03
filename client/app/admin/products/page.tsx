"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get('/products').then(({ data }) => setProducts(data)).catch(() => setProducts([]));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold">Products Management</h1>
        <p className="mt-2 text-slate-400">Create, edit, and manage your product catalog.</p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div>
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-sm text-slate-400">{product.sku}</p>
                </div>
                <div className="text-sm text-slate-300">Stock: {product.stock}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
