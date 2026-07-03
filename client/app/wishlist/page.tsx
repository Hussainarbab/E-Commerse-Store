"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);

  const loadItems = () => {
    api.get('/wishlist').then(({ data }) => setItems(data)).catch(() => setItems([]));
  };

  useEffect(() => { loadItems(); }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold">Wishlist</h1>
        <p className="mt-2 text-slate-400">Save your favorite products for later.</p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          {items.length === 0 ? <p className="text-slate-400">Your wishlist is empty.</p> : items.map((item) => (
            <div key={item._id} className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div>
                <h2 className="font-semibold">{item.product?.name || 'Product'}</h2>
                <p className="text-sm text-slate-400">{item.product?.description || ''}</p>
              </div>
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm" onClick={() => api.delete(`/wishlist/${item.product?._id}`).then(loadItems)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
