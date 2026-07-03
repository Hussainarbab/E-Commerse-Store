"use client";

import Navbar from './Navbar';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
