"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NodeEditor, type Json } from "@/components/admin/JsonEditor";
import { useToast } from "@/components/admin/Toast";

type Section = { name: string; value: Json; edited: boolean };
type ModuleInfo = { key: string; label: string; description: string; pages: string[] };

function humanize(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}

function SectionCard({
  moduleKey,
  section,
  onSaved,
}: {
  moduleKey: string;
  section: Section;
  onSaved: () => void;
}) {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Json>(section.value);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDraft(section.value);
    setDirty(false);
  }, [section.value]);

  async function save() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/site-data/${moduleKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: section.name, value: draft }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setDirty(false);
      showToast("Saved. The live site is updated.");
      onSaved();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Save failed", "error");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!window.confirm("Reset this section to the original built-in content? Your edits will be lost.")) return;
    setBusy(true);
    try {
      const res = await fetch(
        `/api/admin/site-data/${moduleKey}?section=${encodeURIComponent(section.name)}`,
        { method: "DELETE" },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Reset failed");
      showToast("Reset to original content");
      onSaved();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Reset failed", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-lg border border-mountie-blue/10 bg-white shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-display text-lg font-bold uppercase text-deep-navy">
          {humanize(section.name)}
        </span>
        <span className="flex items-center gap-2 text-xs">
          {dirty && <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">Unsaved</span>}
          {section.edited && (
            <span className="rounded-full bg-electric-blue/10 px-2 py-0.5 font-semibold text-electric-blue">Edited</span>
          )}
          <span className="text-electric-blue">{open ? "Hide" : "Edit"}</span>
        </span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-mountie-blue/10 p-5">
          <NodeEditor
            name={section.name}
            value={draft}
            bare
            onChange={(next) => {
              setDraft(next);
              setDirty(true);
            }}
          />
          <div className="flex flex-wrap gap-3 border-t border-mountie-blue/10 pt-4">
            <button type="button" className="btn-primary disabled:opacity-50" disabled={busy || !dirty} onClick={save}>
              {busy ? "Working..." : "Save Changes"}
            </button>
            {dirty && (
              <button
                type="button"
                className="rounded-sm border border-mountie-blue/30 px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  setDraft(section.value);
                  setDirty(false);
                }}
              >
                Discard
              </button>
            )}
            {section.edited && (
              <button
                type="button"
                className="rounded-sm border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
                disabled={busy}
                onClick={reset}
              >
                Reset to original
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSiteDataModulePage() {
  const params = useParams<{ key: string }>();
  const moduleKey = params.key;
  const [info, setInfo] = useState<ModuleInfo | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/site-data/${moduleKey}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setInfo(data.module);
      setSections(data.sections);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [moduleKey]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <p>Loading...</p>;
  if (error || !info) return <p className="text-red-600">{error || "Not found"}</p>;

  return (
    <div>
      <Link href="/admin/site-data" className="text-sm font-semibold text-electric-blue hover:underline">
        Back to Site Content
      </Link>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase text-deep-navy">{info.label}</h1>
      <p className="mt-2 text-sm text-mountie-blue/70">{info.description}</p>
      <p className="mt-1 text-xs text-cool-grey">Shown on: {info.pages.join(", ")}</p>

      <div className="mt-6 space-y-4">
        {sections.map((section) => (
          <SectionCard key={section.name} moduleKey={moduleKey} section={section} onSaved={load} />
        ))}
      </div>
    </div>
  );
}
