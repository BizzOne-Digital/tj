import { cache } from "react";
import { getDb } from "@/lib/db";
import {
  SITE_DATA_META,
  SITE_DATA_MODULES,
  isSiteDataKey,
  type SiteDataKey,
  type SiteDataModules,
} from "@/config/site-data-registry";

const COLLECTION = "cms_site_data";
export const MAX_SITE_DATA_BYTES = 900_000;

type SiteDataDoc = {
  key: string;
  exports: Record<string, unknown>;
  updatedAt: Date;
};

export type JsonKind = "array" | "object" | "string" | "number" | "boolean" | "null";

export function jsonKind(value: unknown): JsonKind | "unsupported" {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return Number.isFinite(value) ? "number" : "unsupported";
    case "boolean":
      return "boolean";
    case "object": {
      const proto = Object.getPrototypeOf(value);
      return proto === Object.prototype || proto === null ? "object" : "unsupported";
    }
    default:
      return "unsupported";
  }
}

/** True when the value can safely round-trip through JSON / MongoDB. */
export function isJsonSafe(value: unknown, depth = 0): boolean {
  if (depth > 25) return false;
  const kind = jsonKind(value);
  if (kind === "unsupported") return false;
  if (kind === "array") return (value as unknown[]).every((item) => isJsonSafe(item, depth + 1));
  if (kind === "object") {
    return Object.values(value as Record<string, unknown>).every((item) =>
      isJsonSafe(item, depth + 1),
    );
  }
  return true;
}

/** Editable exports of a module: plain JSON values only (no functions, Sets, class instances). */
export function getEditableDefaults(key: SiteDataKey): Record<string, unknown> {
  const meta = SITE_DATA_META.find((item) => item.key === key);
  const skip = new Set(meta?.skipExports ?? []);
  const result: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(SITE_DATA_MODULES[key] as Record<string, unknown>)) {
    if (skip.has(name)) continue;
    if (!isJsonSafe(value)) continue;
    result[name] = value;
  }
  return result;
}

const readOverrides = cache(async (key: SiteDataKey): Promise<Record<string, unknown>> => {
  if (!process.env.MONGODB_URI) return {};
  try {
    const db = await getDb();
    const doc = await db.collection<SiteDataDoc>(COLLECTION).findOne({ key });
    return doc?.exports ?? {};
  } catch (error) {
    console.error(`Site data unavailable for "${key}", using built-in content:`, error);
    return {};
  }
});

export async function getSiteDataOverrides(key: SiteDataKey): Promise<Record<string, unknown>> {
  return readOverrides(key);
}

/**
 * Content for a module with admin edits applied on top of the built-in defaults.
 * Falls back to the defaults if MongoDB is unavailable, so public pages never break.
 */
export async function getSiteData<K extends SiteDataKey>(key: K): Promise<SiteDataModules[K]> {
  const defaults = SITE_DATA_MODULES[key];
  const overrides = await readOverrides(key);
  const editable = getEditableDefaults(key);
  const merged: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
  for (const [name, value] of Object.entries(overrides)) {
    // Ignore stale overrides whose shape no longer matches the built-in default.
    if (name in editable && jsonKind(value) === jsonKind(editable[name])) {
      merged[name] = value;
    }
  }
  return merged as SiteDataModules[K];
}

export type SaveSiteDataResult =
  | { ok: true; before: unknown; after: unknown }
  | { ok: false; error: string };

export async function saveSiteDataExport(
  key: string,
  exportName: string,
  value: unknown,
): Promise<SaveSiteDataResult> {
  if (!isSiteDataKey(key)) return { ok: false, error: "Unknown content module" };
  const editable = getEditableDefaults(key);
  if (!Object.prototype.hasOwnProperty.call(editable, exportName)) {
    return { ok: false, error: "Unknown or non-editable section" };
  }
  if (!isJsonSafe(value)) return { ok: false, error: "Value is not valid content" };
  if (jsonKind(value) !== jsonKind(editable[exportName])) {
    return { ok: false, error: `Expected a ${jsonKind(editable[exportName])} for this section` };
  }
  if (Buffer.byteLength(JSON.stringify(value)) > MAX_SITE_DATA_BYTES) {
    return { ok: false, error: "Content is too large" };
  }

  const db = await getDb();
  const col = db.collection<SiteDataDoc>(COLLECTION);
  const existing = await col.findOne({ key });
  await col.updateOne(
    { key },
    {
      $set: { [`exports.${exportName}`]: value, updatedAt: new Date() },
    },
    { upsert: true },
  );
  return { ok: true, before: existing?.exports?.[exportName], after: value };
}

export async function resetSiteDataExport(
  key: string,
  exportName: string,
): Promise<{ ok: boolean; before?: unknown; error?: string }> {
  if (!isSiteDataKey(key)) return { ok: false, error: "Unknown content module" };
  const db = await getDb();
  const col = db.collection<SiteDataDoc>(COLLECTION);
  const existing = await col.findOne({ key });
  await col.updateOne(
    { key },
    { $unset: { [`exports.${exportName}`]: "" }, $set: { updatedAt: new Date() } },
  );
  return { ok: true, before: existing?.exports?.[exportName] };
}
