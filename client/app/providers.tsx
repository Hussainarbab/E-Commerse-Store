"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      api.get('/auth/me').catch(() => window.localStorage.removeItem('token'));
    }
    setReady(true);
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
