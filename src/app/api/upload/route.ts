export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  UPLOAD_FOLDERS,
  UPLOAD_URL_PREFIX,
  deleteUploadByUrl,
  ensureUploadIndexes,
  generateUploadFilename,
  saveStoredUpload,
  type UploadFolder,
} from "@/lib/uploads";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    await ensureUploadIndexes();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (!folder || !UPLOAD_FOLDERS.includes(folder as UploadFolder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File exceeds 8MB limit" }, { status: 400 });
    }

    const replaceUrl = formData.get("replaceUrl");
    if (typeof replaceUrl === "string" && replaceUrl) {
      await deleteUploadByUrl(replaceUrl);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = generateUploadFilename(file.type);
    const uploadFolder = folder as UploadFolder;

    await saveStoredUpload({
      folder: uploadFolder,
      filename,
      mimeType: file.type,
      size: buffer.length,
      data: buffer,
    });

    const url = `${UPLOAD_URL_PREFIX}${uploadFolder}/${filename}`;
    return NextResponse.json({
      success: true,
      url,
      filename,
      size: buffer.length,
      folder: uploadFolder,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
