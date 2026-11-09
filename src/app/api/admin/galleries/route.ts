export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import {
  HOME_GALLERY_KEYS,
  listGalleryOverrides,
  normalizeGalleryKey,
  saveGalleryOverride,
} from "@/lib/gallery-overrides";
import { getGalleryImagesFromFolders, getPublicImages, homeGalleryFolders } from "@/lib/media";
import { deleteRemovedUploads, parseUploadApiUrl } from "@/lib/uploads";
import manifest from "@/generated/media-manifest.json";

const HOME_LABELS: Record<(typeof HOME_GALLERY_KEYS)[number], string> = {
  "home:program": "Home page: Programs photos",
  "home:training": "Home page: Training photos",
  "home:team": "Home page: Team gallery",
};

const recursiveImages = (manifest as { recursiveImages: Record<string, string[]> }).recursiveImages;

function labelForFolder(key: string): string {
  const parts = key.split("/").map((part) => part.replace(/-\d{8}T\d+Z-\d+-\d+/g, "").trim());
  return parts.slice(-2).join(" / ");
}

function isKnownKey(key: string): boolean {
  return (
    (HOME_GALLERY_KEYS as readonly string[]).includes(key) ||
    Object.prototype.hasOwnProperty.call(recursiveImages, key)
  );
}

function baseImagesFor(key: string): string[] {
  if (key === "home:program") return getGalleryImagesFromFolders([...homeGalleryFolders.program]);
  if (key === "home:training") return getGalleryImagesFromFolders([...homeGalleryFolders.training]);
  if (key === "home:team") return getGalleryImagesFromFolders([...homeGalleryFolders.team]);
  return getPublicImages(key);
}

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "Unauthorized") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.error("Gallery request failed:", error);
  const message =
    error instanceof Error && error.message.includes("MONGODB_URI")
      ? "Database is not configured (MONGODB_URI missing)"
      : "Request failed";
  return NextResponse.json({ error: message }, { status: 500 });
}

/** No query: list galleries. ?key=<folder>: photos of one gallery with current edits. */
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const rawKey = new URL(request.url).searchParams.get("key");
    const overrides = await listGalleryOverrides();
    const byKey = new Map(overrides.map((item) => [item.key, item]));

    if (rawKey) {
      const key = normalizeGalleryKey(rawKey);
      if (!isKnownKey(key)) return NextResponse.json({ error: "Unknown gallery" }, { status: 404 });
      const override = byKey.get(key);
      return NextResponse.json({
        key,
        base: baseImagesFor(key),
        hidden: override?.hidden ?? [],
        added: override?.added ?? [],
      });
    }

    const special = HOME_GALLERY_KEYS.map((key) => ({
      key,
      label: HOME_LABELS[key],
      count: baseImagesFor(key).length,
      edited: byKey.has(key),
    }));
    const folders = Object.entries(recursiveImages)
      .filter(([key, images]) => images.length > 0 && key !== "brand" && key !== "sponsors")
      .map(([key, images]) => ({
        key,
        label: labelForFolder(key),
        count: images.length,
        edited: byKey.has(normalizeGalleryKey(key)),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json({ galleries: [...special, ...folders] });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = (await request.json()) as { key?: string; hidden?: unknown; added?: unknown };
    const key = body.key ? normalizeGalleryKey(body.key) : "";
    if (!key || !isKnownKey(key)) {
      return NextResponse.json({ error: "Unknown gallery" }, { status: 400 });
    }

    const isStringList = (value: unknown): value is string[] =>
      Array.isArray(value) && value.length <= 2000 && value.every((v) => typeof v === "string" && v.length < 1000);
    if (!isStringList(body.hidden) || !isStringList(body.added)) {
      return NextResponse.json({ error: "hidden and added must be lists of paths" }, { status: 400 });
    }
    if (!body.added.every((url) => parseUploadApiUrl(url))) {
      return NextResponse.json({ error: "Added photos must be uploaded images" }, { status: 400 });
    }

    const before = await saveGalleryOverride({ key, hidden: body.hidden, added: body.added });
    await deleteRemovedUploads(before?.added, body.added);
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
