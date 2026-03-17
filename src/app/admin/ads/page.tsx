"use client";

import { useState, useEffect } from "react";

interface Ad {
  id: string;
  title: string;
  businessName: string;
  imageUrl: string | null;
  linkUrl: string | null;
  description: string | null;
  placement: string;
  active: boolean;
  sortOrder: number;
  clicks: number;
  startDate: string;
  endDate: string | null;
}

const emptyForm = {
  title: "",
  businessName: "",
  imageUrl: "",
  linkUrl: "",
  description: "",
  placement: "sidebar",
};

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadAds();
  }, []);

  async function loadAds() {
    const res = await fetch("/api/admin/ads");
    const data = await res.json();
    setAds(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(ad: Ad) {
    setEditingId(ad.id);
    setForm({
      title: ad.title,
      businessName: ad.businessName,
      imageUrl: ad.imageUrl || "",
      linkUrl: ad.linkUrl || "",
      description: ad.description || "",
      placement: ad.placement,
    });
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      const res = await fetch("/api/admin/ads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      if (res.ok) {
        cancelForm();
        loadAds();
      }
    } else {
      const res = await fetch("/api/admin/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        cancelForm();
        loadAds();
      }
    }
    setSaving(false);
  }

  async function toggleActive(ad: Ad) {
    await fetch("/api/admin/ads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: ad.id, active: !ad.active }),
    });
    loadAds();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this ad?")) return;
    await fetch(`/api/admin/ads?id=${id}`, { method: "DELETE" });
    loadAds();
  }

  const placementLabels: Record<string, string> = {
    sidebar: "Sidebar",
    banner: "Banner (between sections)",
    category: "Category Pages",
  };

  if (loading) return <p className="text-lg text-gray-400 py-8">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Manage Ads</h1>
        {!showForm && (
          <button
            onClick={openCreate}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-lg text-lg min-h-[48px]"
          >
            Create New Ad
          </button>
        )}
      </div>

      {/* Create / Edit Ad Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-600 mb-4">
            {editingId ? "Edit Ad" : "New Ad"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-bold text-gray-600 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) =>
                    setForm({ ...form, businessName: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
                  placeholder="e.g., Mariposa Pizza Co."
                  required
                />
              </div>
              <div>
                <label className="block text-base font-bold text-gray-600 mb-1">
                  Ad Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
                  placeholder="e.g., Best Pizza in Town!"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-bold text-gray-600 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-base font-bold text-gray-600 mb-1">
                  Link URL (optional)
                </label>
                <input
                  type="url"
                  value={form.linkUrl}
                  onChange={(e) =>
                    setForm({ ...form, linkUrl: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
                  placeholder="https://their-website.com"
                />
              </div>
              <div>
                <label className="block text-base font-bold text-gray-600 mb-1">
                  Placement
                </label>
                <select
                  value={form.placement}
                  onChange={(e) =>
                    setForm({ ...form, placement: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none bg-white"
                >
                  <option value="sidebar">Sidebar — shows on homepage</option>
                  <option value="banner">
                    Banner — shows between page sections
                  </option>
                  <option value="category">
                    Category — shows on category listing pages
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-base font-bold text-gray-600 mb-1">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
                  placeholder="Short description of the business"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-success hover:bg-success-dark text-white font-bold px-6 py-3 rounded-lg text-lg min-h-[48px] disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Create Ad"}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-6 py-3 rounded-lg text-lg min-h-[48px]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ad List */}
      {ads.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-lg text-gray-400">
            No ads created yet. Click &quot;Create New Ad&quot; to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !ad.active ? "opacity-60" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-lg font-bold text-gray-600">
                    {ad.businessName}
                  </p>
                  <span
                    className={`px-2 py-1 rounded text-sm font-bold ${
                      ad.active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {ad.active ? "Active" : "Paused"}
                  </span>
                  <span className="px-2 py-1 rounded text-sm font-bold bg-blue-100 text-blue-800">
                    {placementLabels[ad.placement] || ad.placement}
                  </span>
                </div>
                <p className="text-base text-gray-500 mt-1">{ad.title}</p>
                {ad.description && (
                  <p className="text-sm text-gray-400 mt-1">{ad.description}</p>
                )}
                <p className="text-sm text-gray-400 mt-1">
                  {ad.clicks} clicks
                  {ad.linkUrl && (
                    <>
                      {" "}
                      &middot;{" "}
                      <span className="text-primary">{ad.linkUrl}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => openEdit(ad)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-4 py-2 rounded-lg text-base min-h-[48px]"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleActive(ad)}
                  className={`font-bold px-4 py-2 rounded-lg text-base min-h-[48px] ${
                    ad.active
                      ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                      : "bg-green-100 hover:bg-green-200 text-green-800"
                  }`}
                >
                  {ad.active ? "Pause" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="bg-red-100 hover:bg-red-200 text-danger font-bold px-4 py-2 rounded-lg text-base min-h-[48px]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
