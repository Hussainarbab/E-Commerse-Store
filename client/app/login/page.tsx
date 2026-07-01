import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to continue your shopping journey.</p>
        <form className="mt-8 space-y-4">
          <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Email" />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Password" type="password" />
          <button className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-medium">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          No account? <Link href="/signup" className="text-indigo-300">Create one</Link>
        </p>
      </div>
    </main>
  );
}
