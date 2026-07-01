const stats = [
  { label: 'Recent Orders', value: '12' },
  { label: 'Wishlist Count', value: '6' },
  { label: 'Cart Count', value: '3' },
  { label: 'Profile Completion', value: '84%' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold">User Dashboard</h1>
        <p className="mt-2 text-slate-400">Manage your orders, wishlist, cart, and settings from one place.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
