"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LocalImageField } from "@/components/admin/LocalImageField";
import { useToast } from "@/components/admin/Toast";

type Override = {
  path: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: string;
};

type PageRow = {
  path: string;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  override: Override | null;
};

function PageEditor({ page, onChanged }: { page: PageRow; onChanged: () => void }) {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    eyebrow: page.override?.eyebrow ?? "",
    title: page.override?.title ?? "",
    subtitle: page.override?.subtitle ?? "",
    image: page.override?.image ?? "",
  });

  useEffect(() => {
    setForm({
      eyebrow: page.override?.eyebrow ?? "",
      title: page.override?.title ?? "",
      subtitle: page.override?.subtitle ?? "",
      image: page.override?.image ?? "",
    });
  }, [page.override]);

  async function save() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/page-heroes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: page.path, ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      showToast("Page heading saved");
      onChanged();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Save failed", "error");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!window.confirm("Remove your changes and use the original heading for this page?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/page-heroes?path=${encodeURIComponent(page.path)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Reset failed");
      showToast("Reset to original heading");
      onChanged();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Reset failed", "error");
    } finally {
      setBusy(false);
    }
  }

  const field = (name: "eyebrow" | "title" | "subtitle", label: string, original: string | null) => (
    <label className="block text-sm font-semibold text-deep-navy">
      {label}
      <input
        className="form-input mt-1"
        value={form[name]}
        placeholder={original ?? "Original text comes from Site Content"}
        onChange={(event) => setForm((prev) => ({ ...prev, [name]: event.target.value }))}
      />
    </label>
  );

  return (
    <div className="rounded-lg border border-mountie-blue/10 bg-white shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>
          <span className="block font-semibold text-deep-navy">{page.override?.title || page.title || page.path}</span>
          <span className="block text-xs text-cool-grey">{page.path}</span>
        </span>
        <span className="flex items-center gap-2 text-xs">
          {page.override && (
            <span className="rounded-full bg-electric-blue/10 px-2 py-0.5 font-semibold text-electric-blue">Edited</span>
          )}
          <span className="text-electric-blue">{open ? "Hide" : "Edit"}</span>
        </span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-mountie-blue/10 p-5">
          <p className="text-xs text-cool-grey">
            Leave a field empty to keep the original text. Greyed text shows the original.
          </p>
          {field("eyebrow", "Small label above the title", page.eyebrow)}
          {field("title", "Main title", page.title)}
          {field("subtitle", "Subtitle", page.subtitle)}
          <LocalImageField
            label="Header background image (optional)"
            folder="pages"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-primary disabled:opacity-50" disabled={busy} onClick={save}>
              {busy ? "Working..." : "Save Changes"}
            </button>
            {page.override && (
              <button
                type="button"
                className="rounded-sm border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
                disabled={busy}
                onClick={reset}
              >
                Reset to original
              </button>
            )}
            <a
              href={page.path}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-mountie-blue/30 px-4 py-2 text-sm font-semibold"
            >
              View page
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPageHeadingsPage() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/page-heroes");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setPages(data.pages);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pages.filter(
      (page) =>
        !q ||
        page.path.toLowerCase().includes(q) ||
        (page.title ?? "").toLowerCase().includes(q) ||
        (page.override?.title ?? "").toLowerCase().includes(q),
    );
  }, [pages, query]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Page Headings</h1>
      <p className="mt-2 text-sm text-mountie-blue/70">
        Change the big title, small label, subtitle and background image at the top of any page.
        Body text, schedules and photos are edited under Site Content.
      </p>
      <input
        className="form-input mt-6 max-w-md"
        placeholder="Search pages"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {loading && <p className="mt-6">Loading...</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}
      <div className="mt-6 space-y-3">
        {visible.map((page) => (
          <PageEditor key={page.path} page={page} onChanged={load} />
        ))}
      </div>
    </div>
  );
}
