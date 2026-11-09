export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { SITE_DATA_META } from "@/config/site-data-registry";
import { getEditableDefaults, getSiteDataOverrides } from "@/lib/site-data";

/** List every editable content module with how many sections it has and how many are edited. */
export async function GET() {
  try {
    await requireAdmin();
    const modules = await Promise.all(
      SITE_DATA_META.map(async (meta) => {
        const sections = Object.keys(getEditableDefaults(meta.key));
        const overrides = await getSiteDataOverrides(meta.key);
        return {
          key: meta.key,
          label: meta.label,
          group: meta.group,
          description: meta.description,
          pages: meta.pages,
          sectionCount: sections.length,
          editedCount: sections.filter((name) => name in overrides).length,
        };
      }),
    );
    return NextResponse.json({ modules });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Site data list failed:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
