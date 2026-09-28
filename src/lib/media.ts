import fs from "fs";
import path from "path";
import { publicMedia } from "@/config/public-media";
import {
  manifestDirectImages,
  manifestRecursiveImages,
  manifestSubfolders,
} from "@/lib/media-manifest";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".bmp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);

const PUBLIC_ROOT = path.join(process.cwd(), "public");

function publicUrlFromAbsolute(absolutePath: string): string {
  const relative = path.relative(PUBLIC_ROOT, absolutePath);
  return `/${relative.split(path.sep).join("/")}`;
}

/** Return the first existing public video URL from candidate paths (with or without leading /). */
export function resolvePublicVideoSrc(candidates: string[]): string | null {
  for (const candidate of candidates) {
    const normalized = candidate.replace(/^\//, "");
    const abs = path.join(PUBLIC_ROOT, normalized);
    if (!fs.existsSync(abs)) continue;
    const ext = path.extname(abs).toLowerCase();
    if (VIDEO_EXTENSIONS.has(ext)) {
      return publicUrlFromAbsolute(abs);
    }
  }
  return null;
}

/** Find the first video file in a public subfolder (non-recursive). */
export function findFirstPublicVideoInFolder(folderPath: string): string | null {
  const absPath = path.join(PUBLIC_ROOT, folderPath);
  if (!fs.existsSync(absPath)) return null;

  for (const entry of fs.readdirSync(absPath, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!VIDEO_EXTENSIONS.has(ext)) continue;
    return publicUrlFromAbsolute(path.join(absPath, entry.name));
  }

  return null;
}

function scanPublicImagesFromDisk(folderPath: string): string[] {
  const absPath = path.join(PUBLIC_ROOT, folderPath);
  if (!fs.existsSync(absPath)) return [];

  const results: string[] = [];

  function walk(dir: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        results.push(publicUrlFromAbsolute(full));
      }
    }
  }

  walk(absPath);
  return results.sort();
}

function scanPublicSubfoldersFromDisk(folderPath: string): string[] {
  const absPath = path.join(PUBLIC_ROOT, folderPath);
  if (!fs.existsSync(absPath)) return [];
  return fs
    .readdirSync(absPath, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/** Recursively collect image URLs under a public/ subfolder. */
export function getPublicImages(folderPath: string): string[] {
  const fromManifest = manifestRecursiveImages(folderPath);
  if (fromManifest !== null) return fromManifest;
  return scanPublicImagesFromDisk(folderPath);
}

/** Images in this folder only (not nested subfolders) — avoids cropped-looking collage grids. */
export function getDirectPublicImages(folderPath: string): string[] {
  const fromManifest = manifestDirectImages(folderPath);
  if (fromManifest !== null) return fromManifest;

  const absPath = path.join(PUBLIC_ROOT, folderPath);
  if (!fs.existsSync(absPath)) return [];

  const results: string[] = [];
  try {
    for (const entry of fs.readdirSync(absPath, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      if (!IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;
      results.push(publicUrlFromAbsolute(path.join(absPath, entry.name)));
    }
  } catch {
    return [];
  }
  return results.sort();
}

export function listPublicSubfolders(folderPath: string): string[] {
  const fromManifest = manifestSubfolders(folderPath);
  if (fromManifest) return fromManifest;
  return scanPublicSubfoldersFromDisk(folderPath);
}

export type GallerySection = {
  title: string;
  folderPath: string;
  images: string[];
};

export type MeetSeasonData = {
  id: string;
  label: string;
  sections: GallerySection[];
};

function collectGallerySections(
  folderPath: string,
  titleParts: string[],
  sections: GallerySection[],
) {
  const subfolders = listPublicSubfolders(folderPath);
  const directImages = getDirectPublicImages(folderPath);

  if (directImages.length > 0) {
    sections.push({
      title: titleParts.join(" — ") || folderPath.split("/").pop() || "Photos",
      folderPath,
      images: directImages,
    });
  } else if (subfolders.length === 0) {
    const images = getPublicImages(folderPath);
    if (images.length > 0) {
      sections.push({
        title: titleParts.join(" — ") || folderPath.split("/").pop() || "Photos",
        folderPath,
        images,
      });
    }
  }

  if (subfolders.length === 0) return;

  for (const sub of subfolders) {
    collectGallerySections(`${folderPath}/${sub}`, [...titleParts, sub], sections);
  }
}

/** Scan Meet the Mounties seasons and nested team galleries. */
export function scanMeetTheMounties(): MeetSeasonData[] {
  const base = publicMedia.meetTheMounties;
  return listPublicSubfolders(base).map((seasonName) => {
    const seasonPath = `${base}/${seasonName}`;
    const sections: GallerySection[] = [];
    const topFolders = listPublicSubfolders(seasonPath);

    if (topFolders.length === 0) {
      const images = getPublicImages(seasonPath);
      if (images.length > 0) {
        sections.push({ title: seasonName, folderPath: seasonPath, images });
      }
    } else {
      for (const folder of topFolders) {
        collectGallerySections(`${seasonPath}/${folder}`, [folder], sections);
      }
    }

    const id = seasonName
      .replace(/\s*Season\s*$/i, "")
      .replace(/–/g, "-")
      .trim();

    return { id, label: seasonName, sections };
  });
}

/** Pre-load team images keyed by team id for elementary teams page. */
export function getElementaryTeamImages(): Record<string, string[]> {
  const { elementaryTeams } = publicMedia;
  const map: Record<string, string> = {
    "lee-industries": elementaryTeams.leeIndustries,
    "nittany-energy": elementaryTeams.nittanyEnergy,
    "marble-granite": elementaryTeams.marbleGranite,
    "under-pressure": elementaryTeams.underPressure,
    "lions-1-2": elementaryTeams.lions1st2nd,
    "glenn-hawbaker": elementaryTeams.glennHawbaker,
    "warhawks-1-2": elementaryTeams.warhawks1st2nd,
    "lions-pre-k": elementaryTeams.lionsPreK,
    "warhawks-pre-k": elementaryTeams.warhawksPreK,
  };

  const result: Record<string, string[]> = {};
  for (const [id, folderPath] of Object.entries(map)) {
    let images = getPublicImages(folderPath);
    if (id === "marble-granite") {
      // Show only the clean team photo — hide Drive roster graphic with names
      images = [`/${folderPath}/team-photo.jpg`];
    }
    result[id] = images;
  }
  return result;
}

/** Collect images from multiple public/ folders (deduped), optionally capped. */
export function getGalleryImagesFromFolders(folderPaths: string[], limit?: number): string[] {
  const seen = new Set<string>();
  const images: string[] = [];

  for (const folderPath of folderPaths) {
    for (const src of getPublicImages(folderPath)) {
      if (seen.has(src)) continue;
      seen.add(src);
      images.push(src);
      if (limit !== undefined && images.length >= limit) {
        return images;
      }
    }
  }

  return images;
}

export const homeGalleryFolders = {
  program: [
    publicMedia.about,
    publicMedia.elementaryAction,
    publicMedia.littleDribblers,
  ],
  training: [publicMedia.elementaryAction],
  team: [
    publicMedia.elementaryAction,
    `${publicMedia.meetTheMounties}/2025-26 Season`,
    publicMedia.littleDribblers,
  ],
} as const;
