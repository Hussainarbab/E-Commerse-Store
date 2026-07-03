import { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-950 p-16 text-slate-400">Loading shop...</main>}>
      <ShopContent />
    </Suspense>
  );
}
