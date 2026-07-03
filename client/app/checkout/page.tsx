"use client";

import { useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/orders', { shippingAddress, paymentMethod: 'cod', coupon });
      setMessage(`Order #${data._id.slice(-6)} placed successfully.`);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Checkout failed.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <p className="mt-2 text-slate-400">Complete your order with cash on delivery.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <textarea className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Shipping address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          <button className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-medium">Place Order</button>
          {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
          <Link href="/invoice" className="inline-flex text-sm text-indigo-300">View invoice →</Link>
        </form>
      </div>
    </main>
  );
}
