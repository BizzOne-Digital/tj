import { getDb } from "@/lib/db";
import {
  type UploadFolder,
  parseUploadApiUrl,
} from "@/lib/uploads-shared";

export * from "@/lib/uploads-shared";

export type StoredUploadDoc = {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
};

const COLLECTION = "stored_uploads";

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
        data: input.data,
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
