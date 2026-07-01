const cards = [
  { label: 'Revenue', value: '$48K' },
  { label: 'Orders', value: '312' },
  { label: 'Customers', value: '1.2K' },
  { label: 'Products Sold', value: '4.8K' },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-400">Monitor sales, products, customers, reviews, and site operations.</p>
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
  );
}
