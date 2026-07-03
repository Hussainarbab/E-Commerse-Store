"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('token')));
  }, []);

  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-xl font-semibold">Arbabcollection</Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Arbab</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm" onClick={() => { localStorage.removeItem('token'); setIsLoggedIn(false); }}>Logout</button>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm">Login</Link>
              <Link href="/signup" className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
