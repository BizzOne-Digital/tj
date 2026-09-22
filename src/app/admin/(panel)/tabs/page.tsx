"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

type TabItem = { id: string; label: string; href: string; order: number };
type TabGroup = { slug: string; name: string; tabs: TabItem[] };

export default function AdminTabsPage() {
  const { showToast } = useToast();
  const [groups, setGroups] = useState<TabGroup[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const activeGroup = groups.find((group) => group.slug === activeSlug);

  useEffect(() => {
    fetch("/api/admin/tabs")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.groups || []);
        if (data.groups?.[0]) setActiveSlug(data.groups[0].slug);
      })
      .finally(() => setLoading(false));
  }, []);

  function updateActiveTabs(tabs: TabItem[]) {
    setGroups((prev) =>
      prev.map((group) => (group.slug === activeSlug ? { ...group, tabs } : group)),
    );
  }

  async function saveGroup() {
    if (!activeGroup) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/tabs/${activeGroup.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: activeGroup.name, tabs: activeGroup.tabs }),
      });
      if (!response.ok) throw new Error("Save failed");
      showToast("Tabs saved");
    } catch {
      showToast("Failed to save tabs", "error");
    } finally {
      setSaving(false);
    }
  }

  async function addGroup() {
    const slug = window.prompt("Enter a slug (e.g. summer-league):");
    const name = window.prompt("Enter display name:");
    if (!slug || !name) return;
    const response = await fetch("/api/admin/tabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name }),
    });
    if (!response.ok) {
      showToast("Failed to create tab group", "error");
      return;
    }
    const data = await response.json();
    setGroups((prev) => [...prev, data.group]);
    setActiveSlug(data.group.slug);
    showToast("Tab group created");
  }

  async function deleteGroup() {
    if (!activeGroup) return;
    if (!window.confirm(`Delete tab group "${activeGroup.name}"?`)) return;
    const response = await fetch(`/api/admin/tabs/${activeGroup.slug}`, { method: "DELETE" });
    if (!response.ok) {
      showToast("Failed to delete tab group", "error");
      return;
    }
    setGroups((prev) => prev.filter((group) => group.slug !== activeGroup.slug));
    setActiveSlug(groups[0]?.slug || "");
    showToast("Tab group deleted");
  }

  if (loading) return <p>Loading tabs...</p>;
  if (!activeGroup) return <p>No tab groups found.</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Section Tabs</h1>
          <p className="mt-2 text-sm text-mountie-blue/70">
            Manage horizontal tabs shown on program, league, and event pages.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-primary" onClick={addGroup}>Add Group</button>
          <button type="button" className="rounded-sm border border-red-300 px-4 py-2 text-sm font-semibold text-red-600" onClick={deleteGroup}>
            Delete Group
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {groups.map((group) => (
          <button
            key={group.slug}
            type="button"
            onClick={() => setActiveSlug(group.slug)}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${
              group.slug === activeSlug ? "bg-electric-blue text-white" : "bg-white text-deep-navy"
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
        <label className="block text-sm font-semibold">
          Group Name
          <input
            className="form-input mt-2"
            value={activeGroup.name}
            onChange={(event) =>
              setGroups((prev) =>
                prev.map((group) =>
                  group.slug === activeSlug ? { ...group, name: event.target.value } : group,
                ),
              )
            }
          />
        </label>

        <div className="mt-6 space-y-4">
          {activeGroup.tabs.map((tab, index) => (
            <div key={tab.id} className="grid gap-3 rounded-md border border-mountie-blue/10 p-4 md:grid-cols-[1fr_1fr_auto]">
              <input
                className="form-input"
                value={tab.label}
                placeholder="Tab label"
                onChange={(event) => {
                  const tabs = [...activeGroup.tabs];
                  tabs[index] = { ...tabs[index], label: event.target.value };
                  updateActiveTabs(tabs);
                }}
              />
              <input
                className="form-input"
                value={tab.href}
                placeholder="/path-or-url"
                onChange={(event) => {
                  const tabs = [...activeGroup.tabs];
                  tabs[index] = { ...tabs[index], href: event.target.value };
                  updateActiveTabs(tabs);
                }}
              />
              <button
                type="button"
                className="text-sm font-semibold text-red-600"
                onClick={() => updateActiveTabs(activeGroup.tabs.filter((_, i) => i !== index))}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-sm border border-mountie-blue/20 px-4 py-2 text-sm font-semibold"
            onClick={() =>
              updateActiveTabs([
                ...activeGroup.tabs,
                {
                  id: `tab-${Date.now()}`,
                  label: "New Tab",
                  href: "/",
                  order: activeGroup.tabs.length,
                },
              ])
            }
          >
            Add Tab
          </button>
          <button type="button" className="btn-primary" disabled={saving} onClick={saveGroup}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
