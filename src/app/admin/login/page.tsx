"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-danger px-4 py-3 rounded-lg text-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-bold text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-primary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white text-xl font-bold px-8 py-4 rounded-xl transition-colors min-h-[56px] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
