"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { COUNTRIES } from '@/lib/countries';

type CountryPickerProps = {
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
};

export function CountryPicker({ value, onChange, placeholder = 'Select country' }: CountryPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return COUNTRIES;
    return COUNTRIES.filter((country) => country.toLowerCase().includes(query));
  }, [search]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => searchRef.current?.focus(), 50);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const selectCountry = (country: string) => {
    onChange(country);
    setOpen(false);
    setSearch('');
  };

  const close = () => {
    setOpen(false);
    setSearch('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-sm transition hover:border-indigo-500/40"
      >
        <span className={value ? 'text-white' : 'text-slate-500'}>{value || placeholder}</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={close}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Select country"
            className="flex max-h-[80vh] w-full max-w-md flex-col rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Select Country</h2>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none focus:border-indigo-500/50"
              />
            </div>

            <ul className="flex-1 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-slate-400">No countries found.</li>
              ) : (
                filtered.map((country) => (
                  <li key={country}>
                    <button
                      type="button"
                      onClick={() => selectCountry(country)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-indigo-500/20 ${
                        value === country ? 'bg-indigo-500/30 font-medium text-indigo-200' : 'text-slate-200'
                      }`}
                    >
                      {country}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
