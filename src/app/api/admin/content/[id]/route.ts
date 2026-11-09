export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteContent, getContentById, updateContent } from "@/lib/cms";
import { revalidateCmsContent } from "@/lib/cms-revalidate";
import { deleteRemovedUploads } from "@/lib/uploads";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const existing = await getContentById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = (await request.json()) as {
      slug?: string;
      data?: Record<string, unknown>;
      order?: number;
      published?: boolean;
    };

    const item = await updateContent(id, {
      slug: body.slug,
      data: body.data,
      order: body.order,
      published: body.published,
    });

    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Remove stored images that this save no longer references.
    if (body.data) await deleteRemovedUploads(existing.data, body.data);

    revalidateCmsContent(existing.type, (body.slug || existing.slug) as string | undefined);

    return NextResponse.json({ item: { ...item, _id: item._id?.toString() } });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const existing = await getContentById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const deleted = await deleteContent(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await deleteRemovedUploads(existing.data, {});
    revalidateCmsContent(existing.type, existing.slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
