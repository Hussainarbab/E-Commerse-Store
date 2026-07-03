"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { PageShell } from '../components/PageShell';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.get('/products').then(({ data }) => setProducts(data)).catch(() => setProducts([]));
    api.get('/categories').then(({ data }) => setCategories(data)).catch(() => setCategories([]));
  }, []);

  const filtered = useMemo(() => {
    if (!categorySlug) return products;
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return products;
    return products.filter((p) => String(p.category) === String(cat._id) || String(p.category?._id) === String(cat._id));
  }, [products, categories, categorySlug]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  const addToCart = async (productId: string) => {
    await api.post(`/cart/${productId}`, { quantity: 1 });
  };

  const addToWishlist = async (productId: string) => {
    await api.post(`/wishlist/${productId}`);
  };

  return (
    <PageShell>
      <main className="min-h-screen bg-slate-950 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">
                {activeCategory ? activeCategory.name : 'Shop All'}
              </h1>
              <p className="mt-2 text-slate-400">
                {activeCategory
                  ? `Browse ${activeCategory.name.toLowerCase()} at Arbabcollection.`
                  : 'Watches, laptops, groceries, makeup, fashion, and more — worldwide.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/wishlist" className="rounded-full border border-white/10 px-4 py-2 text-sm">Wishlist</Link>
              <Link href="/cart" className="rounded-full bg-indigo-500 px-4 py-2 text-sm">Cart</Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/shop"
              className={`rounded-full px-4 py-2 text-sm transition ${!categorySlug ? 'bg-indigo-500' : 'border border-white/10 hover:border-indigo-500/40'}`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/shop?category=${cat.slug}`}
                className={`rounded-full px-4 py-2 text-sm transition ${categorySlug === cat.slug ? 'bg-indigo-500' : 'border border-white/10 hover:border-indigo-500/40'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.length === 0 ? (
              <p className="col-span-full text-slate-400">No products found in this category.</p>
            ) : filtered.map((product) => (
              <div key={product._id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="h-48 w-full object-cover" />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-slate-900/70 text-slate-500">No image</div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {product.discountPrice ? (
                        <>
                          <span className="text-lg font-semibold text-emerald-400">${product.discountPrice}</span>
                          <span className="ml-2 text-sm text-slate-500 line-through">${product.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold">${product.price}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-full border border-white/10 px-3 py-2 text-sm" onClick={() => addToWishlist(product._id)}>♡</button>
                      <button className="rounded-full bg-indigo-500 px-3 py-2 text-sm" onClick={() => addToCart(product._id)}>Add to Cart</button>
                    </div>
                  </div>
                  <Link href={`/products/${product.slug}`} className="mt-4 inline-flex text-sm text-indigo-300">View details →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
