"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/admin/Toast";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error("Invalid password");
      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      showToast("Invalid password", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-deep-navy px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl"
      >
        <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Admin Login</h1>
        <p className="mt-2 text-sm text-mountie-blue/70">
          Sign in to manage tabs, content, and images.
        </p>
        <label className="mt-6 block text-sm font-semibold text-deep-navy">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-input mt-2"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-6 w-full disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
