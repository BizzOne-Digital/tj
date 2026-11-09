export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { SITE_DATA_META, isSiteDataKey } from "@/config/site-data-registry";
import {
  getEditableDefaults,
  getSiteData,
  getSiteDataOverrides,
  resetSiteDataExport,
  saveSiteDataExport,
} from "@/lib/site-data";
import { deleteRemovedUploads } from "@/lib/uploads";

type Params = { params: Promise<{ key: string }> };

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "Unauthorized") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.error("Site data request failed:", error);
  const message =
    error instanceof Error && error.message.includes("MONGODB_URI")
      ? "Database is not configured (MONGODB_URI missing)"
      : "Request failed";
  return NextResponse.json({ error: message }, { status: 500 });
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

/** Sections of one module: current value (with edits applied) and whether it was edited. */
export async function GET(_request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isSiteDataKey(key)) return NextResponse.json({ error: "Unknown module" }, { status: 404 });

    const meta = SITE_DATA_META.find((item) => item.key === key)!;
    const merged = (await getSiteData(key)) as Record<string, unknown>;
    const overrides = await getSiteDataOverrides(key);
    const defaults = getEditableDefaults(key);

    const sections = Object.keys(defaults).map((name) => ({
      name,
      value: merged[name],
      edited: name in overrides,
    }));

    return NextResponse.json({
      module: {
        key: meta.key,
        label: meta.label,
        group: meta.group,
        description: meta.description,
        pages: meta.pages,
      },
      sections,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

/** Save one section: body { section: string, value: any }. */
export async function PUT(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isSiteDataKey(key)) return NextResponse.json({ error: "Unknown module" }, { status: 404 });

    const body = (await request.json()) as { section?: string; value?: unknown };
    if (!body.section || body.value === undefined) {
      return NextResponse.json({ error: "section and value are required" }, { status: 400 });
    }

    const currentMerged = (await getSiteData(key)) as Record<string, unknown>;
    const result = await saveSiteDataExport(key, body.section, body.value);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

    // Delete stored images that the previous version used and the new one does not.
    await deleteRemovedUploads(currentMerged[body.section], body.value);
    revalidateSite();
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}

/** Reset one section back to the built-in content: ?section=name */
export async function DELETE(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isSiteDataKey(key)) return NextResponse.json({ error: "Unknown module" }, { status: 404 });

    const section = new URL(request.url).searchParams.get("section");
    if (!section) return NextResponse.json({ error: "section is required" }, { status: 400 });
    if (!(section in getEditableDefaults(key))) {
      return NextResponse.json({ error: "Unknown section" }, { status: 400 });
    }

    const result = await resetSiteDataExport(key, section);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

    await deleteRemovedUploads(result.before, {});
    revalidateSite();
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
