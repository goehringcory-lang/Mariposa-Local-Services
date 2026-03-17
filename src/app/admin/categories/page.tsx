"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  _count: { providers: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName.trim(),
        description: newDescription.trim() || null,
      }),
    });

    if (res.ok) {
      setNewName("");
      setNewDescription("");
      loadCategories();
    }
    setAdding(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? Providers in it will need reassignment."))
      return;

    await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
    loadCategories();
  }

  if (loading) return <p className="text-lg text-gray-400 py-8">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Manage Categories
      </h1>

      {/* Add Category Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-600 mb-4">
          Add New Category
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name"
            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
            required
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description (optional)"
            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={adding}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-lg text-lg min-h-[48px] disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl shadow p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-bold text-gray-600">{cat.name}</p>
              <p className="text-base text-gray-400">
                {cat.description || "No description"} &middot;{" "}
                {cat._count.providers} providers &middot; Order: {cat.sortOrder}
              </p>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-danger hover:text-red-700 font-bold text-base min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
