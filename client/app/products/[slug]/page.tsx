"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: products } = await api.get('/products');
      const found = products.find((item: any) => item.slug === params.slug);
      setProduct(found || null);
      if (found) {
        const { data } = await api.get(`/reviews/${found._id}`);
        setReviews(data);
      }
    };
    load();
  }, [params.slug]);

  const submitReview = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!product) return;
    await api.post(`/reviews/${product._id}`, { rating, comment });
    const { data } = await api.get(`/reviews/${product._id}`);
    setReviews(data);
    setComment('');
  };

  if (!product) return <main className="min-h-screen bg-slate-950 p-8 text-slate-300">Loading...</main>;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Featured product</p>
            <h1 className="mt-3 text-4xl font-semibold">{product.name}</h1>
            <p className="mt-4 text-slate-300">{product.description}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-semibold">${product.price}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm">Stock: {product.stock}</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">Leave a review</h2>
            <form className="mt-4 space-y-3" onSubmit={submitReview}>
              <select className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} star{value > 1 ? 's' : ''}</option>)}
              </select>
              <textarea className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3" placeholder="Share your thoughts" value={comment} onChange={(e) => setComment(e.target.value)} />
              <button className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-medium">Submit Review</button>
            </form>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <div className="mt-4 space-y-3">
            {reviews.map((review) => (
              <div key={review._id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.user?.firstName || 'User'}</p>
                  <p className="text-sm text-slate-400">{review.rating}/5</p>
                </div>
                <p className="mt-2 text-sm text-slate-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
