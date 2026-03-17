"use client";

import { useState } from "react";
import StarRating from "@/components/ui/StarRating";

export default function ReviewForm({ providerId }: { providerId: string }) {
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!authorName.trim()) {
      setError("Please enter your name.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/providers/${providerId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName: authorName.trim(), rating, comment: comment.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
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
          Thank you for your review!
        </p>
        <p className="text-lg text-gray-500">
          Your feedback helps others find great local services.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-primary hover:text-primary-dark text-lg font-medium min-h-[48px]"
        >
          See all reviews
        </button>
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

      <div>
        <label
          htmlFor="authorName"
          className="block text-lg font-bold text-gray-600 mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
          placeholder="Enter your first name"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-bold text-gray-600 mb-2">
          Rating
        </label>
        <StarRating rating={rating} size="lg" interactive onChange={setRating} />
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-lg font-bold text-gray-600 mb-2"
        >
          Comment (optional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
          rows={4}
          placeholder="Tell others about your experience..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary-dark text-white text-xl font-bold px-8 py-4 rounded-xl transition-colors min-h-[56px] disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
