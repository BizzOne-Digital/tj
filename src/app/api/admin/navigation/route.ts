export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { getNavigation, saveNavigation } from "@/lib/cms";
import { revalidateSiteNavigation } from "@/lib/cms-revalidate";
import type { NavItem } from "@/config/navigation";

export async function GET() {
  try {
    await requireAdmin();
    const items = await getNavigation();
    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = (await request.json()) as { items?: NavItem[] };
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ error: "items array required" }, { status: 400 });
    }
    const items = await saveNavigation(body.items);
    revalidateSiteNavigation();
    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
