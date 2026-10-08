"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { LocalImageField } from "@/components/admin/LocalImageField";
import { useToast } from "@/components/admin/Toast";
import type { CmsContentType } from "@/lib/cms";
import { isUploadApiUrl } from "@/lib/uploads-shared";

type ContentItem = {
  _id: string;
  type: CmsContentType;
  slug?: string;
  order: number;
  published: boolean;
  data: Record<string, unknown>;
};

const TYPE_LABELS: Record<CmsContentType, string> = {
  news: "News",
  announcement: "Announcements",
  program: "Programs",
  staff: "Staff",
  sponsor: "Sponsors",
  faq: "FAQs",
};

const IMAGE_FOLDER: Record<CmsContentType, "pages" | "gallery" | "products" | "misc"> = {
  news: "pages",
  announcement: "pages",
  program: "products",
  staff: "gallery",
  sponsor: "gallery",
  faq: "misc",
};

function defaultData(type: CmsContentType): Record<string, unknown> {
  switch (type) {
    case "news":
      return {
        slug: `news-${Date.now()}`,
        title: "New Article",
        excerpt: "",
        content: "",
        datePublished: new Date().toISOString().slice(0, 10),
        category: "News",
        image: "",
      };
    case "announcement":
      return { id: `announcement-${Date.now()}`, message: "", href: "/", active: true };
    case "program":
      return {
        id: `program-${Date.now()}`,
        title: "New Program",
        description: "",
        href: "/programs",
        image: "",
        featured: false,
      };
    case "staff":
      return {
        id: `staff-${Date.now()}`,
        name: "",
        role: "",
        photo: "",
        email: "",
        phone: "",
        quote: "",
        featured: false,
      };
    case "sponsor":
      return { id: `sponsor-${Date.now()}`, name: "", logo: "", url: "", tier: "partner" };
    case "faq":
      return { id: `faq-${Date.now()}`, question: "", answer: "", category: "General" };
    default:
      return {};
  }
}

export default function AdminContentPage() {
  const params = useParams<{ type: CmsContentType }>();
  const type = params.type;
  const { showToast } = useToast();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [savedSnapshot, setSavedSnapshot] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const activeItem = useMemo(
    () => items.find((item) => item._id === activeId),
    [items, activeId],
  );

  useEffect(() => {
    if (!type) return;
    fetch(`/api/admin/content?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        if (data.items?.[0]) setActiveId(data.items[0]._id);
      })
      .finally(() => setLoading(false));
  }, [type]);

  function updateActiveData(patch: Record<string, unknown>) {
    if (!activeItem) return;
    setItems((prev) =>
      prev.map((item) =>
        item._id === activeItem._id ? { ...item, data: { ...item.data, ...patch } } : item,
      ),
    );
  }

  useEffect(() => {
    const item = items.find((entry) => entry._id === activeId);
    if (item) setSavedSnapshot(item.data);
  }, [activeId, items]);

  function getPreviousImageUrl(data: Record<string, unknown>, snapshot: Record<string, unknown>) {
    for (const key of ["image", "photo", "logo"]) {
      const prev = String(snapshot[key] || "");
      const next = String(data[key] || "");
      if (prev && prev !== next && isUploadApiUrl(prev)) {
        return prev;
      }
    }
    return undefined;
  }

  async function saveActive() {
    if (!activeItem) return;
    setSaving(true);
    try {
      const previousImageUrl = getPreviousImageUrl(activeItem.data, savedSnapshot);
      const response = await fetch(`/api/admin/content/${activeItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: (activeItem.data.slug as string) || activeItem.slug,
          data: activeItem.data,
          order: activeItem.order,
          published: activeItem.published,
          previousImageUrl,
        }),
      });
      if (!response.ok) throw new Error("Save failed");
      setSavedSnapshot(activeItem.data);
      showToast("Content saved — live site updated");
    } catch {
      showToast("Failed to save content", "error");
    } finally {
      setSaving(false);
    }
  }

  async function createItem() {
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        slug: (defaultData(type).slug as string) || (defaultData(type).id as string),
        data: defaultData(type),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      showToast("Failed to create item", "error");
      return;
    }
    setItems((prev) => [...prev, data.item]);
    setActiveId(data.item._id);
    showToast("Item created");
  }

  async function deleteActive() {
    if (!activeItem || !window.confirm("Delete this item?")) return;
    const imageUrl =
      (activeItem.data.image as string) ||
      (activeItem.data.photo as string) ||
      (activeItem.data.logo as string);
    const response = await fetch(`/api/admin/content/${activeItem._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    if (!response.ok) {
      showToast("Failed to delete item", "error");
      return;
    }
    setItems((prev) => prev.filter((item) => item._id !== activeItem._id));
    setActiveId(items[0]?._id || "");
    showToast("Item deleted");
  }

  if (!type || !TYPE_LABELS[type]) {
    return <p>Unknown content type.</p>;
  }

  if (loading) return <p>Loading {TYPE_LABELS[type]}...</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">{TYPE_LABELS[type]}</h1>
          <p className="mt-2 text-sm text-mountie-blue/70">Add, edit, delete, and upload images.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-primary" onClick={createItem}>Add New</button>
          <button type="button" className="rounded-sm border border-red-300 px-4 py-2 text-sm font-semibold text-red-600" onClick={deleteActive}>
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setActiveId(item._id)}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${
              item._id === activeId ? "bg-electric-blue text-white" : "bg-white text-deep-navy"
            }`}
          >
            {(item.data.title as string) ||
              (item.data.name as string) ||
              (item.data.question as string) ||
              (item.data.message as string) ||
              item.slug ||
              "Item"}
          </button>
        ))}
      </div>

      {activeItem && (
        <div className="mt-6 space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={activeItem.published}
              onChange={(event) =>
                setItems((prev) =>
                  prev.map((item) =>
                    item._id === activeItem._id ? { ...item, published: event.target.checked } : item,
                  ),
                )
              }
            />
            Published
          </label>

          {Object.entries(activeItem.data).map(([key, value]) => {
            if (key === "image" || key === "photo" || key === "logo") {
              return (
                <LocalImageField
                  key={key}
                  label={key}
                  folder={IMAGE_FOLDER[type]}
                  value={String(value || "")}
                  onChange={(url) => updateActiveData({ [key]: url })}
                />
              );
            }
            if (typeof value === "boolean") {
              return (
                <label key={key} className="flex items-center gap-2 text-sm font-semibold capitalize">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(event) => updateActiveData({ [key]: event.target.checked })}
                  />
                  {key}
                </label>
              );
            }
            if (typeof value === "string" || typeof value === "number") {
              const isLong = key === "content" || key === "answer" || key === "description";
              return (
                <label key={key} className="block text-sm font-semibold capitalize">
                  {key}
                  {isLong ? (
                    <textarea
                      className="form-input mt-2 min-h-32"
                      value={String(value)}
                      onChange={(event) => updateActiveData({ [key]: event.target.value })}
                    />
                  ) : (
                    <input
                      className="form-input mt-2"
                      value={String(value)}
                      onChange={(event) => updateActiveData({ [key]: event.target.value })}
                    />
                  )}
                </label>
              );
            }
            return null;
          })}

          <button type="button" className="btn-primary" disabled={saving} onClick={saveActive}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}
