"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Provider {
  id: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  categoryId: string;
  areaServed: string;
  status: string;

  createdAt: string;
  category: { name: string };
}

export default function AdminProviderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    fetch(`/api/admin/providers/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProvider(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleAction(action: string) {
    setActionLoading(action);
    try {
      const res = await fetch(`/api/admin/providers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProvider(updated);
      }
    } finally {
      setActionLoading("");
    }
  }

  if (loading) {
    return <p className="text-lg text-gray-400 py-8">Loading...</p>;
  }

  if (!provider) {
    return <p className="text-lg text-gray-400 py-8">Provider not found.</p>;
  }

  return (
    <div>
      <Link
        href="/admin/providers"
        className="text-primary hover:text-primary-dark text-lg font-medium min-h-[48px] inline-flex items-center mb-6"
      >
        &larr; Back to Providers
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <h1 className="text-3xl font-bold text-gray-700">{provider.name}</h1>
          <span
            className={`px-3 py-1 rounded text-sm font-bold ${
              provider.status === "APPROVED"
                ? "bg-green-100 text-green-800"
                : provider.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : provider.status === "REJECTED"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {provider.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-base font-bold text-gray-400">Phone</p>
            <p className="text-lg text-gray-600">{provider.phone}</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-400">Email</p>
            <p className="text-lg text-gray-600">{provider.email}</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-400">Category</p>
            <p className="text-lg text-gray-600">{provider.category.name}</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-400">Area Served</p>
            <p className="text-lg text-gray-600">{provider.areaServed}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-base font-bold text-gray-400">Description</p>
            <p className="text-lg text-gray-600 whitespace-pre-line">
              {provider.description}
            </p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-400">Submitted</p>
            <p className="text-lg text-gray-600">
              {new Date(provider.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
          {provider.status === "PENDING" && (
            <>
              <button
                onClick={() => handleAction("approve")}
                disabled={!!actionLoading}
                className="bg-success hover:bg-success-dark text-white font-bold px-6 py-3 rounded-lg text-lg min-h-[48px] disabled:opacity-50"
              >
                {actionLoading === "approve"
                  ? "Approving..."
                  : "Approve"}
              </button>
              <button
                onClick={() => handleAction("reject")}
                disabled={!!actionLoading}
                className="bg-danger hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg text-lg min-h-[48px] disabled:opacity-50"
              >
                {actionLoading === "reject" ? "Rejecting..." : "Reject"}
              </button>
            </>
          )}
          {provider.status === "APPROVED" && (
            <button
              onClick={() => handleAction("suspend")}
              disabled={!!actionLoading}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-lg text-lg min-h-[48px] disabled:opacity-50"
            >
              {actionLoading === "suspend" ? "Suspending..." : "Suspend"}
            </button>
          )}
          {(provider.status === "REJECTED" ||
            provider.status === "SUSPENDED") && (
            <button
              onClick={() => handleAction("approve")}
              disabled={!!actionLoading}
              className="bg-success hover:bg-success-dark text-white font-bold px-6 py-3 rounded-lg text-lg min-h-[48px] disabled:opacity-50"
            >
              {actionLoading === "approve" ? "Approving..." : "Re-approve"}
            </button>
          )}
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this provider?")) {
                handleAction("delete").then(() => router.push("/admin/providers"));
              }
            }}
            disabled={!!actionLoading}
            className="bg-red-100 hover:bg-red-200 text-danger font-bold px-6 py-3 rounded-lg text-lg min-h-[48px] disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
