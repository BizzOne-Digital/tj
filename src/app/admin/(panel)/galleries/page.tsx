"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import { prepareImageForUpload } from "@/lib/image-compress";
import { encodePublicAssetPath } from "@/lib/utils";

type GalleryRow = { key: string; label: string; count: number; edited: boolean };

function Thumb({
  src,
  badge,
  action,
  actionLabel,
  dimmed,
}: {
  src: string;
  badge?: string;
  action: () => void;
  actionLabel: string;
  dimmed?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-mountie-blue/15 bg-white">
      <div className="relative aspect-square bg-light-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={encodePublicAssetPath(src)}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover ${dimmed ? "opacity-30" : ""}`}
        />
        {badge && (
          <span className="absolute left-1 top-1 rounded bg-electric-blue px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
            {badge}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={action}
        className="w-full border-t border-mountie-blue/10 px-2 py-1.5 text-xs font-semibold uppercase text-deep-navy hover:bg-light-bg"
      >
        {actionLabel}
      </button>
    </div>
  );
}

function GalleryEditor({ galleryKey, onSaved }: { galleryKey: string; onSaved: () => void }) {
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [base, setBase] = useState<string[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [added, setAdded] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setLoading(true);
    setDirty(false);
    fetch(`/api/admin/galleries?key=${encodeURIComponent(galleryKey)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setBase(data.base);
        setHidden(data.hidden);
        setAdded(data.added);
      })
      .catch((error) => showToast(error instanceof Error ? error.message : "Failed to load", "error"))
      .finally(() => setLoading(false));
  }, [galleryKey, showToast]);

  async function uploadFiles(files: FileList) {
    setUploading(true);
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", await prepareImageForUpload(file));
        formData.append("folder", "gallery");
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          showToast(`${file.name}: ${data.error || "Upload failed"}`, "error");
          continue;
        }
        uploaded.push(data.url);
      }
      if (uploaded.length) {
        setAdded((prev) => [...uploaded, ...prev]);
        setDirty(true);
        showToast(`${uploaded.length} photo(s) uploaded. Click Save to publish.`);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/galleries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: galleryKey, hidden, added }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setDirty(false);
      showToast("Gallery saved. The live site is updated.");
      onSaved();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  const hiddenSet = new Set(hidden);

  if (loading) return <p className="mt-6">Loading photos...</p>;

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={(event) => event.target.files?.length && void uploadFiles(event.target.files)}
        />
        <button
          type="button"
          className="btn-primary disabled:opacity-50"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? "Uploading..." : "Add Photos"}
        </button>
        <button
          type="button"
          className="rounded-sm border border-mountie-blue/30 px-4 py-2 text-sm font-semibold disabled:opacity-50"
          disabled={saving || !dirty}
          onClick={save}
        >
          {saving ? "Saving..." : "Save Gallery"}
        </button>
        {dirty && <span className="text-sm font-semibold text-amber-700">Unsaved changes</span>}
      </div>

      {added.length > 0 && (
        <section>
          <h3 className="font-display text-lg font-bold uppercase text-deep-navy">Added photos ({added.length})</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {added.map((src) => (
              <Thumb
                key={src}
                src={src}
                badge="New"
                actionLabel="Remove"
                action={() => {
                  setAdded((prev) => prev.filter((item) => item !== src));
                  setDirty(true);
                }}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="font-display text-lg font-bold uppercase text-deep-navy">
          Original photos ({base.length - base.filter((src) => hiddenSet.has(src)).length} shown)
        </h3>
        {base.length === 0 && <p className="mt-2 text-sm text-cool-grey">No built-in photos in this gallery.</p>}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {base.map((src) => (
            <Thumb
              key={src}
              src={src}
              dimmed={hiddenSet.has(src)}
              badge={hiddenSet.has(src) ? "Hidden" : undefined}
              actionLabel={hiddenSet.has(src) ? "Show" : "Hide"}
              action={() => {
                setHidden((prev) => (prev.includes(src) ? prev.filter((item) => item !== src) : [...prev, src]));
                setDirty(true);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function AdminGalleriesPage() {
  const [galleries, setGalleries] = useState<GalleryRow[]>([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/galleries");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setGalleries(data.galleries);
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
    return galleries.filter((item) => !q || item.label.toLowerCase().includes(q));
  }, [galleries, query]);

  const current = galleries.find((item) => item.key === selected);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Photo Galleries</h1>
      <p className="mt-2 text-sm text-mountie-blue/70">
        Pick a gallery, upload new photos, and hide any original photo you do not want shown. Photos
        you add appear first.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,420px)_1fr]">
        <input
          className="form-input"
          placeholder="Search galleries"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="form-input"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          aria-label="Gallery"
        >
          <option value="">Choose a gallery...</option>
          {visible.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label} ({item.count}){item.edited ? " - edited" : ""}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="mt-6">Loading...</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}
      {current && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-deep-navy">{current.label}</h2>
          <GalleryEditor key={current.key} galleryKey={current.key} onSaved={load} />
        </div>
      )}
    </div>
  );
}
