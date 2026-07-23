"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function InvoicePage() {
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    api.get('/invoices/1').then(({ data }) => setInvoice(data)).catch(() => setInvoice(null));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
        <h1 className="text-3xl font-semibold">Invoice</h1>
        <p className="mt-2 text-slate-400">Download or preview your receipt.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          {invoice ? (
            <>
              <p className="text-lg font-semibold">Invoice #{invoice._id?.slice(-6) || 'N/A'}</p>
              <p className="mt-2 text-sm text-slate-400">PDF: {invoice.pdfUrl || 'Not generated yet'}</p>
            </>
          ) : (
            <p className="text-slate-400">No invoice available yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
