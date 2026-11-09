export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  UPLOAD_FOLDERS,
  UPLOAD_URL_PREFIX,
  ensureUploadIndexes,
  generateUploadFilename,
  saveStoredUpload,
  sniffImageMime,
  type UploadFolder,
} from "@/lib/uploads";

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (typeof folder !== "string" || !UPLOAD_FOLDERS.includes(folder as UploadFolder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP or GIF." },
        { status: 400 },
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File exceeds 8MB limit" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // The browser-sent type can be spoofed; confirm the bytes really are an allowed image.
    const detectedMime = sniffImageMime(buffer);
    if (!detectedMime || !ALLOWED_MIME_TYPES.has(detectedMime)) {
      return NextResponse.json(
        { error: "File content is not a valid JPEG, PNG, WebP or GIF image" },
        { status: 400 },
      );
    }

    await ensureUploadIndexes();

    const uploadFolder = folder as UploadFolder;
    const filename = generateUploadFilename(detectedMime);

    await saveStoredUpload({
      folder: uploadFolder,
      filename,
      mimeType: detectedMime,
      size: buffer.length,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      url: `${UPLOAD_URL_PREFIX}${uploadFolder}/${filename}`,
      filename,
      size: buffer.length,
      folder: uploadFolder,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Upload failed:", error);
    const message =
      error instanceof Error && error.message.includes("MONGODB_URI")
        ? "Database is not configured (MONGODB_URI missing)"
        : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
