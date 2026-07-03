"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data)).catch(() => setOrders([]));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold">Orders</h1>
        <p className="mt-2 text-slate-400">Track and update order statuses.</p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          {orders.map((order) => (
            <div key={order._id} className="mb-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>
                  <p className="text-sm text-slate-400">Status: {order.status}</p>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-300">${order.totalAmount || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
