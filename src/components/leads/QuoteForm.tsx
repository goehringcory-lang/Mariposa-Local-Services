"use client";

import { useState } from "react";

export default function QuoteForm({
  providerId,
  providerName,
}: {
  providerId: string;
  providerName: string;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — hidden from humans, irresistible to bots.
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/providers/${providerId}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send your request");
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
      <div className="text-center py-6">
        <p className="text-xl font-bold text-success mb-2">
          Your request has been sent!
        </p>
        <p className="text-lg text-gray-500">
          {providerName} has your details and should get back to you soon. If
          it&apos;s urgent, give them a call directly using the number above.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-danger px-4 py-3 rounded-lg text-lg">
          {error}
        </div>
      )}

      <p className="text-lg text-gray-500">
        Not ready to call? Send {providerName} the details and they&apos;ll get
        back to you.
      </p>

      <div>
        <label
          htmlFor="customerName"
          className="block text-lg font-bold text-gray-600 mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
          placeholder="Enter your name"
          maxLength={100}
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-lg font-bold text-gray-600 mb-2"
        >
          Your Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
          placeholder="(209) 555-0123"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-lg font-bold text-gray-600 mb-2"
        >
          Your Email{" "}
          <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-lg font-bold text-gray-600 mb-2"
        >
          What do you need done?
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
          rows={4}
          placeholder="Describe the job — the more detail, the better the quote."
          maxLength={2000}
          required
        />
      </div>

      {/* Honeypot. Hidden from sighted users and screen readers alike; only a
          bot filling every field will trip it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary-dark text-white text-xl font-bold px-8 py-4 rounded-xl transition-colors min-h-[56px] disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
