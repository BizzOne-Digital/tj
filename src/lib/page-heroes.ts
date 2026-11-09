import { cache } from "react";
import { getDb } from "@/lib/db";

const COLLECTION = "cms_page_heroes";

export type PageHeroOverride = {
  path: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Optional background image (usually /api/uploads/pages/...). */
  image?: string;
  updatedAt?: Date;
};

export function normalizePagePath(path: string): string {
  const clean = path.split("?")[0].split("#")[0].trim();
  if (!clean || clean === "/") return "/";
  return clean.replace(/\/+$/, "") || "/";
}

const readAll = cache(async (): Promise<Map<string, PageHeroOverride>> => {
  if (!process.env.MONGODB_URI) return new Map();
  try {
    const db = await getDb();
    const docs = await db.collection<PageHeroOverride>(COLLECTION).find({}).toArray();
    return new Map(docs.map((doc) => [doc.path, doc]));
  } catch (error) {
    console.error("Page heading overrides unavailable, using built-in text:", error);
    return new Map();
  }
});

export async function getPageHeroOverride(path: string): Promise<PageHeroOverride | null> {
  const all = await readAll();
  return all.get(normalizePagePath(path)) ?? null;
}

export async function listPageHeroOverrides(): Promise<PageHeroOverride[]> {
  const all = await readAll();
  return Array.from(all.values()).map((doc) => ({
    path: doc.path,
    eyebrow: doc.eyebrow,
    title: doc.title,
    subtitle: doc.subtitle,
    image: doc.image,
  }));
}

export async function savePageHeroOverride(input: {
  path: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: string;
}): Promise<{ before?: PageHeroOverride | null }> {
  const path = normalizePagePath(input.path);
  const db = await getDb();
  const col = db.collection<PageHeroOverride>(COLLECTION);
  const before = await col.findOne({ path });
  const clean = (value?: string) => (value && value.trim() ? value.trim() : undefined);
  const fields = {
    eyebrow: clean(input.eyebrow),
    title: clean(input.title),
    subtitle: clean(input.subtitle),
    image: clean(input.image),
  };
  const set: Record<string, string | Date> = { path, updatedAt: new Date() };
  const unset: Record<string, ""> = {};
  for (const [name, value] of Object.entries(fields)) {
    if (value) set[name] = value;
    else unset[name] = "";
  }
  await col.updateOne(
    { path },
    Object.keys(unset).length ? { $set: set, $unset: unset } : { $set: set },
    { upsert: true },
  );
  return { before };
}

export async function deletePageHeroOverride(path: string): Promise<PageHeroOverride | null> {
  const db = await getDb();
  const col = db.collection<PageHeroOverride>(COLLECTION);
  const before = await col.findOne({ path: normalizePagePath(path) });
  await col.deleteOne({ path: normalizePagePath(path) });
  return before;
}
