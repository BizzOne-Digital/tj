"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import type { NavItem } from "@/config/navigation";

export default function AdminNavigationPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/navigation")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!response.ok) throw new Error("Save failed");
      showToast("Navigation saved");
    } catch {
      showToast("Failed to save navigation", "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading navigation...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Main Navigation</h1>
      <p className="mt-2 text-sm text-mountie-blue/70">Edit header menu links and dropdown children.</p>

      <div className="mt-6 space-y-4">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="form-input"
                value={item.label}
                placeholder="Label"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], label: event.target.value };
                  setItems(next);
                }}
              />
              <input
                className="form-input"
                value={item.href || ""}
                placeholder="Href (leave empty if dropdown)"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], href: event.target.value || undefined };
                  setItems(next);
                }}
              />
            </div>
            {item.children && (
              <div className="mt-3 space-y-2 border-l-2 border-electric-blue/20 pl-4">
                {item.children.map((child, childIndex) => (
                  <div key={`${child.label}-${childIndex}`} className="grid gap-2 md:grid-cols-2">
                    <input
                      className="form-input"
                      value={child.label}
                      onChange={(event) => {
                        const next = [...items];
                        const children = [...(next[index].children || [])];
                        children[childIndex] = { ...children[childIndex], label: event.target.value };
                        next[index] = { ...next[index], children };
                        setItems(next);
                      }}
                    />
                    <input
                      className="form-input"
                      value={child.href || ""}
                      onChange={(event) => {
                        const next = [...items];
                        const children = [...(next[index].children || [])];
                        children[childIndex] = { ...children[childIndex], href: event.target.value };
                        next[index] = { ...next[index], children };
                        setItems(next);
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="text-sm font-semibold text-electric-blue"
                  onClick={() => {
                    const next = [...items];
                    next[index] = {
                      ...next[index],
                      children: [...(next[index].children || []), { label: "New Link", href: "/" }],
                    };
                    setItems(next);
                  }}
                >
                  Add child link
                </button>
              </div>
            )}
            <div className="mt-3 flex gap-3">
              {!item.children && (
                <button
                  type="button"
                  className="text-sm font-semibold text-electric-blue"
                  onClick={() => {
                    const next = [...items];
                    next[index] = { ...next[index], children: [{ label: "New Link", href: "/" }] };
                    setItems(next);
                  }}
                >
                  Convert to dropdown
                </button>
              )}
              <button
                type="button"
                className="text-sm font-semibold text-red-600"
                onClick={() => setItems(items.filter((_, i) => i !== index))}
              >
                Delete item
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded-sm border border-mountie-blue/20 px-4 py-2 text-sm font-semibold"
          onClick={() => setItems([...items, { label: "New Item", href: "/" }])}
        >
          Add nav item
        </button>
        <button type="button" className="btn-primary" disabled={saving} onClick={save}>
          {saving ? "Saving..." : "Save Navigation"}
        </button>
      </div>
    </div>
  );
}
