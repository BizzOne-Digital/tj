"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ModuleSummary = {
  key: string;
  label: string;
  group: string;
  description: string;
  pages: string[];
  sectionCount: number;
  editedCount: number;
};

export default function AdminSiteDataPage() {
  const [modules, setModules] = useState<ModuleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-data")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setModules(data.modules);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = modules.filter(
      (item) =>
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.pages.some((page) => page.toLowerCase().includes(q)),
    );
    const map = new Map<string, ModuleSummary[]>();
    for (const item of filtered) map.set(item.group, [...(map.get(item.group) ?? []), item]);
    return Array.from(map.entries());
  }, [modules, query]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Site Content</h1>
      <p className="mt-2 text-sm text-mountie-blue/70">
        Edit the text, schedules, prices, results, coaches and images shown on every page. Pick a
        topic, change what you need, and click Save. Changes appear on the live site right away.
      </p>

      <input
        className="form-input mt-6 max-w-md"
        placeholder="Search by topic or page (for example: schedule, /pricing)"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {loading && <p className="mt-6">Loading...</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}

      <div className="mt-6 space-y-8">
        {groups.map(([group, items]) => (
          <section key={group}>
            <h2 className="font-display text-xl font-bold uppercase text-mountie-blue">{group}</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <Link
                  key={item.key}
                  href={`/admin/site-data/${item.key}`}
                  className="rounded-lg border border-mountie-blue/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold uppercase text-deep-navy">{item.label}</h3>
                    {item.editedCount > 0 && (
                      <span className="shrink-0 rounded-full bg-electric-blue/10 px-2 py-0.5 text-xs font-semibold text-electric-blue">
                        {item.editedCount} edited
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-mountie-blue/70">{item.description}</p>
                  <p className="mt-3 text-xs text-cool-grey">
                    {item.sectionCount} sections · Used on: {item.pages.join(", ")}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {!loading && groups.length === 0 && !error && <p>No matching topics.</p>}
      </div>
    </div>
  );
}
