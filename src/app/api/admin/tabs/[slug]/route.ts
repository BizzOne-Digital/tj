export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteTabGroup, getTabGroup, saveTabGroup } from "@/lib/cms";
import { revalidateSiteNavigation } from "@/lib/cms-revalidate";
import type { CmsTabItem } from "@/lib/cms";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { slug } = await params;
    const group = await getTabGroup(slug);
    if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ group });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { slug } = await params;
    const body = (await request.json()) as { name?: string; tabs?: CmsTabItem[] };
    if (!body.name || !Array.isArray(body.tabs)) {
      return NextResponse.json({ error: "name and tabs are required" }, { status: 400 });
    }
    const group = await saveTabGroup(slug, { name: body.name, tabs: body.tabs });
    revalidateSiteNavigation();
    return NextResponse.json({ group });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { slug } = await params;
    const deleted = await deleteTabGroup(slug);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateSiteNavigation();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
