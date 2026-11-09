import { randomBytes } from "crypto";
import { Binary } from "mongodb";
import { getDb } from "@/lib/db";
import {
  type UploadFolder,
  mimeToExtension,
  parseUploadApiUrl,
} from "@/lib/uploads-shared";

export * from "@/lib/uploads-shared";

export type StoredUploadDoc = {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer | Binary;
  createdAt: Date;
  updatedAt: Date;
};

const COLLECTION = "stored_uploads";

/** `${Date.now()}-${randomHex}.${ext}` */
export function generateUploadFilename(mimeType: string): string {
  return `${Date.now()}-${randomBytes(6).toString("hex")}.${mimeToExtension(mimeType)}`;
}

/** Detect the real image type from file bytes (do not trust the browser-sent MIME type). */
export function sniffImageMime(buffer: Buffer): string | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return "image/png";
  }
  if (buffer.length >= 6 && ["GIF87a", "GIF89a"].includes(buffer.subarray(0, 6).toString("ascii"))) {
    return "image/gif";
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

/** MongoDB returns stored Buffers as BSON Binary; normalise to a Node Buffer. */
export function toBuffer(data: unknown): Buffer | null {
  if (!data) return null;
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof Binary) {
    return Buffer.from(data.buffer.subarray(0, data.position));
  }
  if (data instanceof Uint8Array) return Buffer.from(data);
  return null;
}

export async function ensureUploadIndexes(): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTION).createIndex(
    { folder: 1, filename: 1 },
    { unique: true },
  );
}

export async function saveStoredUpload(input: {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
}): Promise<void> {
  const db = await getDb();
  const now = new Date();
  await db.collection(COLLECTION).updateOne(
    { folder: input.folder, filename: input.filename },
    {
      $set: {
        folder: input.folder,
        filename: input.filename,
        mimeType: input.mimeType,
        size: input.size,
        data: new Binary(input.data),
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );
}

export async function getStoredUpload(
  folder: UploadFolder,
  filename: string,
): Promise<StoredUploadDoc | null> {
  const db = await getDb();
  const doc = await db.collection<StoredUploadDoc>(COLLECTION).findOne({ folder, filename });
  return doc;
}

export async function deleteStoredUpload(
  folder: UploadFolder,
  filename: string,
): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection(COLLECTION).deleteOne({ folder, filename });
  return result.deletedCount > 0;
}

export async function deleteUploadByUrl(url: string | null | undefined): Promise<boolean> {
  const parsed = url ? parseUploadApiUrl(url) : null;
  if (!parsed) return false;
  return deleteStoredUpload(parsed.folder, parsed.filename);
}

/** All /api/uploads/... URLs referenced anywhere inside a JSON-like value. */
export function collectUploadUrls(value: unknown, found = new Set<string>()): Set<string> {
  if (typeof value === "string") {
    if (parseUploadApiUrl(value)) found.add(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectUploadUrls(item, found);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectUploadUrls(item, found);
  }
  return found;
}

/** Delete stored uploads that were referenced before but are no longer referenced after a save. */
export async function deleteRemovedUploads(before: unknown, after: unknown): Promise<number> {
  const kept = collectUploadUrls(after);
  let deleted = 0;
  for (const url of collectUploadUrls(before)) {
    if (kept.has(url) || (await isUploadReferenced(url))) continue;
    if (await deleteUploadByUrl(url)) deleted += 1;
  }
  return deleted;
}

const REFERENCE_COLLECTIONS = [
  "cms_content",
  "cms_site_data",
  "cms_gallery_overrides",
  "cms_page_heroes",
  "gear_products",
];

/** True if any saved content still points at this upload (it may be reused in two places). */
export async function isUploadReferenced(url: string): Promise<boolean> {
  const db = await getDb();
  for (const name of REFERENCE_COLLECTIONS) {
    const docs = await db.collection(name).find({}).project({ _id: 0 }).toArray();
    if (docs.some((doc) => JSON.stringify(doc).includes(url))) return true;
  }
  return false;
}
