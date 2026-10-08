export type MediaManifest = {
  generatedAt: string;
  recursiveImages: Record<string, string[]>;
  directImages: Record<string, string[]>;
  subfolders: Record<string, string[]>;
};

let cached: MediaManifest | null = null;

function loadManifest(): MediaManifest | null {
  if (cached) return cached;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    cached = require("@/generated/media-manifest.json") as MediaManifest;
    return cached;
  } catch {
    return null;
  }
}

export function manifestRecursiveImages(folderPath: string): string[] | null {
  const manifest = loadManifest();
  if (!manifest) return null;
  const key = folderPath.replace(/\\/g, "/").replace(/^\//, "");
  return [...(manifest.recursiveImages[key] ?? [])];
}

export function manifestSubfolders(folderPath: string): string[] | null {
  const manifest = loadManifest();
  if (!manifest) return null;
  const key = folderPath.replace(/\\/g, "/").replace(/^\//, "");
  return [...(manifest.subfolders[key] ?? [])];
}

export function manifestDirectImages(folderPath: string): string[] | null {
  const manifest = loadManifest();
  if (!manifest) return null;
  const key = folderPath.replace(/\\/g, "/").replace(/^\//, "");
  return [...(manifest.directImages?.[key] ?? [])];
}
