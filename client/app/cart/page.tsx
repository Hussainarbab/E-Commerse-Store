"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function CartPage() {
  const [cart, setCart] = useState<any>({ items: [] });

  const loadCart = () => {
    api.get('/cart').then(({ data }) => setCart(data)).catch(() => setCart({ items: [] }));
  };

  useEffect(() => { loadCart(); }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <p className="mt-2 text-slate-400">Review items before checkout.</p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          {cart.items.length === 0 ? <p className="text-slate-400">Your cart is empty.</p> : cart.items.map((item: any) => (
            <div key={item.product?._id || item.product} className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div>
                <h2 className="font-semibold">{item.product?.name || 'Product'}</h2>
                <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
              </div>
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm" onClick={() => api.delete(`/cart/${item.product?._id || item.product}`).then(loadCart)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
