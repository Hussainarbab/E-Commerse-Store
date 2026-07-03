"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import api from '@/lib/api';
import { CountryPicker } from '../components/CountryPicker';

const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const passwordRules = [
  { key: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { key: 'upper', label: 'One uppercase letter (A–Z)', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'lower', label: 'One lowercase letter (a–z)', test: (p: string) => /[a-z]/.test(p) },
  { key: 'number', label: 'One number (0–9)', test: (p: string) => /\d/.test(p) },
  { key: 'symbol', label: 'One special symbol (!@#$…)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const ruleStatus = useMemo(
    () => passwordRules.map((rule) => ({ ...rule, met: rule.test(form.password) })),
    [form.password],
  );

  const strengthScore = ruleStatus.filter((r) => r.met).length;
  const strengthLabel =
    strengthScore === 0 ? '' :
    strengthScore <= 2 ? 'Weak' :
    strengthScore <= 4 ? 'Medium' : 'Strong';

  const strengthColor =
    strengthScore <= 2 ? 'bg-rose-500' :
    strengthScore <= 4 ? 'bg-amber-500' : 'bg-emerald-500';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!passwordPolicy.test(form.password)) {
      setError('Password must be 8+ chars with uppercase, lowercase, number, and special character.');
      return;
    }

    try {
      await api.post('/auth/signup', form);
      setSuccess('Account created. You can now log in.');
      setTimeout(() => router.push('/login'), 900);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed.');
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-slate-400">Join Arbabcollection — watches, laptops, makeup, groceries, and more.</p>
        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="First Name" value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Last Name" value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Username" value={form.username} onChange={(e) => handleChange('username', e.target.value)} />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Phone Number" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
          <CountryPicker value={form.country} onChange={(country) => handleChange('country', country)} />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="City" value={form.city} onChange={(e) => handleChange('city', e.target.value)} />
          <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3" placeholder="Address" value={form.address} onChange={(e) => handleChange('address', e.target.value)} />

          <input
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <input
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3"
            placeholder="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
          />

          <label className="md:col-span-2 flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-slate-900 accent-indigo-500"
            />
            Show password
          </label>

          {form.password ? (
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-300">Password strength</p>
                {strengthLabel ? (
                  <span className={`text-sm font-medium ${strengthScore <= 2 ? 'text-rose-400' : strengthScore <= 4 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {strengthLabel}
                  </span>
                ) : null}
              </div>
              <div className="mt-2 flex gap-1">
                {passwordRules.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${i < strengthScore ? strengthColor : 'bg-white/10'}`}
                  />
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {ruleStatus.map((rule) => (
                  <li key={rule.key} className="flex items-center gap-2 text-sm">
                    <span className={rule.met ? 'text-emerald-400' : 'text-slate-500'}>
                      {rule.met ? '✓' : '○'}
                    </span>
                    <span className={rule.met ? 'text-emerald-300' : 'text-slate-400'}>
                      {rule.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {form.confirmPassword && form.password !== form.confirmPassword ? (
            <p className="md:col-span-2 text-sm text-rose-400">Passwords do not match.</p>
          ) : null}
          {error ? <p className="md:col-span-2 text-sm text-rose-400">{error}</p> : null}
          {success ? <p className="md:col-span-2 text-sm text-emerald-400">{success}</p> : null}
          <button className="md:col-span-2 rounded-2xl bg-indigo-500 px-4 py-3 font-medium">Sign Up</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-indigo-300">Login</Link>
        </p>
      </div>
    </main>
  );
}
