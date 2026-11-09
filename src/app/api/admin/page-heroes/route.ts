export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import {
  deletePageHeroOverride,
  listPageHeroOverrides,
  normalizePagePath,
  savePageHeroOverride,
} from "@/lib/page-heroes";
import { deleteRemovedUploads } from "@/lib/uploads";
import registry from "@/generated/page-registry.json";

type RegistryPage = {
  path: string;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
};

const pages = (registry as { pages: RegistryPage[] }).pages;

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "Unauthorized") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.error("Page heading request failed:", error);
  const message =
    error instanceof Error && error.message.includes("MONGODB_URI")
      ? "Database is not configured (MONGODB_URI missing)"
      : "Request failed";
  return NextResponse.json({ error: message }, { status: 500 });
}

function isKnownPath(path: string): boolean {
  return pages.some((page) => page.path === normalizePagePath(path));
}

export async function GET() {
  try {
    await requireAdmin();
    const overrides = await listPageHeroOverrides();
    const byPath = new Map(overrides.map((item) => [item.path, item]));
    return NextResponse.json({
      pages: pages.map((page) => ({ ...page, override: byPath.get(page.path) ?? null })),
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = (await request.json()) as {
      path?: string;
      eyebrow?: string;
      title?: string;
      subtitle?: string;
      image?: string;
    };
    if (!body.path || !isKnownPath(body.path)) {
      return NextResponse.json({ error: "Unknown page" }, { status: 400 });
    }
    for (const value of [body.eyebrow, body.title, body.subtitle, body.image]) {
      if (value !== undefined && (typeof value !== "string" || value.length > 2000)) {
        return NextResponse.json({ error: "Invalid value" }, { status: 400 });
      }
    }
    const { before } = await savePageHeroOverride({
      path: body.path,
      eyebrow: body.eyebrow,
      title: body.title,
      subtitle: body.subtitle,
      image: body.image,
    });
    await deleteRemovedUploads(before?.image, body.image);
    revalidatePath(normalizePagePath(body.path));
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}

/** Reset a page heading to its built-in text: ?path=/about */
export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const path = new URL(request.url).searchParams.get("path");
    if (!path || !isKnownPath(path)) {
      return NextResponse.json({ error: "Unknown page" }, { status: 400 });
    }
    const before = await deletePageHeroOverride(path);
    await deleteRemovedUploads(before?.image, "");
    revalidatePath(normalizePagePath(path));
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
