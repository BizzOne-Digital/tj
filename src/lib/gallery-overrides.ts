import { cache } from "react";
import { getDb } from "@/lib/db";

const COLLECTION = "cms_gallery_overrides";

export type GalleryOverride = {
  /** Folder path inside public/ (or a special key such as "home:team"). */
  key: string;
  /** Built-in photos hidden from the gallery. */
  hidden: string[];
  /** Uploaded photos (usually /api/uploads/gallery/...) shown first. */
  added: string[];
  updatedAt?: Date;
};

export const HOME_GALLERY_KEYS = ["home:program", "home:training", "home:team"] as const;

export function normalizeGalleryKey(key: string): string {
  return key.replace(/\\/g, "/").replace(/^\/+/, "").replace(/\/+$/, "");
}

const readAll = cache(async (): Promise<Map<string, GalleryOverride>> => {
  if (!process.env.MONGODB_URI) return new Map();
  try {
    const db = await getDb();
    const docs = await db.collection<GalleryOverride>(COLLECTION).find({}).toArray();
    return new Map(docs.map((doc) => [doc.key, doc]));
  } catch (error) {
    console.error("Gallery edits unavailable, using built-in photos:", error);
    return new Map();
  }
});

export async function getGalleryOverride(key: string): Promise<GalleryOverride | null> {
  const all = await readAll();
  return all.get(normalizeGalleryKey(key)) ?? null;
}

export async function listGalleryOverrides(): Promise<GalleryOverride[]> {
  return Array.from((await readAll()).values()).map((doc) => ({
    key: doc.key,
    hidden: doc.hidden ?? [],
    added: doc.added ?? [],
  }));
}

/** Apply admin edits to a gallery's built-in photo list. */
export async function applyGalleryOverrides(key: string, base: string[]): Promise<string[]> {
  const override = await getGalleryOverride(key);
  if (!override) return base;
  const hidden = new Set(override.hidden ?? []);
  const result: string[] = [];
  const seen = new Set<string>();
  for (const src of [...(override.added ?? []), ...base]) {
    if (hidden.has(src) || seen.has(src)) continue;
    seen.add(src);
    result.push(src);
  }
  return result;
}

export async function saveGalleryOverride(input: {
  key: string;
  hidden: string[];
  added: string[];
}): Promise<GalleryOverride | null> {
  const key = normalizeGalleryKey(input.key);
  const db = await getDb();
  const col = db.collection<GalleryOverride>(COLLECTION);
  const before = await col.findOne({ key });
  if (input.hidden.length === 0 && input.added.length === 0) {
    await col.deleteOne({ key });
  } else {
    await col.updateOne(
      { key },
      { $set: { key, hidden: input.hidden, added: input.added, updatedAt: new Date() } },
      { upsert: true },
    );
  }
  return before;
}
