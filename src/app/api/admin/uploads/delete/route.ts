export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteUploadByUrl } from "@/lib/uploads";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = (await request.json()) as { url?: string };
    if (!body.url) {
      return NextResponse.json({ error: "url required" }, { status: 400 });
    }
    const deleted = await deleteUploadByUrl(body.url);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
