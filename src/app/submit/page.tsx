"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function SubmitPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    categoryId: "",
    areaServed: "Mariposa & Surrounding Areas",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/providers/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-success text-6xl mb-4">&#10003;</div>
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            Submission Received!
          </h1>
          <p className="text-xl text-gray-500 mb-4">
            Thank you for submitting your business. We will review your listing
            and get back to you shortly.
          </p>
          <p className="text-lg text-gray-400 mb-6">
            Once approved, you&apos;ll receive an email with a link to complete
            your listing payment.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-lg font-bold px-6 py-3 rounded-xl transition-colors min-h-[48px]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
        List Your Business
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Submit your information below to get started.
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-danger px-4 py-3 rounded-lg text-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Business / Your Name *
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
              placeholder="e.g., John's Handyman Services"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
              placeholder="(209) 555-1234"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
              placeholder="you@email.com"
              required
            />
            <p className="text-base text-gray-300 mt-1">
              Used for account management and payment — not shown publicly
            </p>
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Service Category *
            </label>
            <select
              id="categoryId"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none bg-white"
              required
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Description of Services *
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
              rows={5}
              placeholder="Describe the services you offer, your experience, availability, etc."
              required
            />
          </div>

          <div>
            <label
              htmlFor="areaServed"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Area Served
            </label>
            <input
              type="text"
              id="areaServed"
              value={form.areaServed}
              onChange={(e) =>
                setForm({ ...form, areaServed: e.target.value })
              }
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
              placeholder="Mariposa, Midpines, El Portal..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-dark text-white text-xl font-bold px-8 py-4 rounded-xl transition-colors min-h-[56px] disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
