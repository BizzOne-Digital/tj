export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getStoredUpload, UPLOAD_FOLDERS, type UploadFolder } from "@/lib/uploads";

type Params = { params: Promise<{ folder: string; filename: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { folder, filename } = await params;

  if (
    !folder ||
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    folder.includes("..") ||
    folder.includes("/") ||
    !UPLOAD_FOLDERS.includes(folder as UploadFolder)
  ) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const doc = await getStoredUpload(folder as UploadFolder, filename);
  if (!doc?.data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = Buffer.isBuffer(doc.data) ? doc.data : Buffer.from(doc.data as Uint8Array);

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
