"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to continue your shopping journey.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <button className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-medium">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          No account? <Link href="/signup" className="text-indigo-300">Create one</Link>
        </p>
      </div>
    </main>
  );
}
