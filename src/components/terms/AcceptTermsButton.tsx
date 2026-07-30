"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AcceptTermsButton({
  token,
  businessName,
}: {
  token: string;
  businessName: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAccept() {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/providers/accept-terms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to record your agreement");
      }

      // The page re-reads the provider and renders the confirmed state.
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-danger px-4 py-3 rounded-lg text-lg mb-4">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleAccept}
        disabled={submitting}
        className="w-full bg-primary hover:bg-primary-dark text-white text-xl font-bold px-8 py-4 rounded-xl transition-colors min-h-[56px] disabled:opacity-50"
      >
        {submitting ? "Recording..." : "I Agree to These Terms"}
      </button>
      <p className="text-base text-gray-400 mt-2 text-center">
        Clicking this records that {businessName} agreed, along with
        today&apos;s date.
      </p>
    </div>
  );
}
