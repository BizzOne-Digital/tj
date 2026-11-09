export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getStoredUpload, toBuffer, UPLOAD_FOLDERS, type UploadFolder } from "@/lib/uploads";

type Params = { params: Promise<{ folder: string; filename: string }> };

const SAFE_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export async function GET(_request: Request, { params }: Params) {
  const { folder, filename } = await params;

  if (
    !folder ||
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\") ||
    !SAFE_FILENAME.test(filename) ||
    !UPLOAD_FOLDERS.includes(folder as UploadFolder)
  ) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const doc = await getStoredUpload(folder as UploadFolder, filename);
    const data = toBuffer(doc?.data);
    if (!doc || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Length": String(data.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Upload fetch failed:", error);
    return NextResponse.json({ error: "Unavailable" }, { status: 500 });
  }
}
