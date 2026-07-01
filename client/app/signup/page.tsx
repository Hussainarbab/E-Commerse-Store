import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-slate-400">Join LuxeCart for a polished ecommerce experience.</p>
        <form className="mt-8 grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="First Name" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Last Name" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Username" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Email" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Phone Number" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Country" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="City" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Address" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Password" type="password" />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Confirm Password" type="password" />
          <button className="md:col-span-2 rounded-2xl bg-indigo-500 px-4 py-3 font-medium">Sign Up</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-indigo-300">Login</Link>
        </p>
      </div>
    </main>
  );
}
