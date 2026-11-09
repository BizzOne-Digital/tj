"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/admin/Toast";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Invalid email or password");
      }
      const requested = searchParams.get("next") || "";
      const next =
        requested.startsWith("/admin") && !requested.startsWith("//") ? requested : "/admin";
      router.push(next);
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Login failed", "error");
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
          Sign in with your admin email and password to manage the site.
        </p>
        <label className="mt-6 block text-sm font-semibold text-deep-navy">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-input mt-2"
            autoComplete="username"
            required
          />
        </label>
        <label className="mt-4 block text-sm font-semibold text-deep-navy">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-input mt-2"
            autoComplete="current-password"
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
