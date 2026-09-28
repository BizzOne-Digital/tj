export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createContent, listContent, type CmsContentType } from "@/lib/cms";
import { revalidateCmsContent } from "@/lib/cms-revalidate";

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const type = new URL(request.url).searchParams.get("type") as CmsContentType | null;
    if (!type) {
      return NextResponse.json({ error: "type query param required" }, { status: 400 });
    }
    const items = await listContent(type);
    return NextResponse.json({
      items: items.map((item) => ({
        ...item,
        _id: item._id?.toString(),
      })),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = (await request.json()) as {
      type?: CmsContentType;
      slug?: string;
      data?: Record<string, unknown>;
      order?: number;
      published?: boolean;
    };

    if (!body.type || !body.data) {
      return NextResponse.json({ error: "type and data are required" }, { status: 400 });
    }

    const item = await createContent({
      type: body.type,
      slug: body.slug,
      data: body.data,
      order: body.order,
      published: body.published,
    });

    revalidateCmsContent(body.type, body.slug);

    return NextResponse.json({ item: { ...item, _id: item._id?.toString() } });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
