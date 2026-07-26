"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "CLOSED", label: "Closed" },
];

export default function LeadStatusControl({
  leadId,
  status,
}: {
  leadId: string;
  status: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function updateStatus(next: string) {
    if (next === status) return;
    setSaving(true);

    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    setSaving(false);
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {STATUSES.map((s) => (
        <button
          key={s.value}
          onClick={() => updateStatus(s.value)}
          disabled={saving}
          className={`px-4 py-2 rounded-lg text-base font-bold min-h-[48px] disabled:opacity-50 ${
            status === s.value
              ? "bg-primary text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
