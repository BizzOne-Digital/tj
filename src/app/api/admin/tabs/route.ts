export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { listTabGroups, createTabGroup } from "@/lib/cms";
import { revalidateSiteNavigation } from "@/lib/cms-revalidate";

export async function GET() {
  try {
    await requireAdmin();
    const groups = await listTabGroups();
    return NextResponse.json({ groups });
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
    const body = (await request.json()) as { slug?: string; name?: string };
    if (!body.slug || !body.name) {
      return NextResponse.json({ error: "slug and name are required" }, { status: 400 });
    }
    const group = await createTabGroup({ slug: body.slug, name: body.name, tabs: [] });
    revalidateSiteNavigation();
    return NextResponse.json({ group });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
