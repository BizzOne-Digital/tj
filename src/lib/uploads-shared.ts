export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const UPLOAD_URL_PREFIX = "/api/uploads/";
export const LEGACY_UPLOAD_PREFIX = "/uploads/";
export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function isUploadApiUrl(url: string | null | undefined): boolean {
  return Boolean(url?.startsWith(UPLOAD_URL_PREFIX));
}

export function parseUploadApiUrl(url: string): { folder: UploadFolder; filename: string } | null {
  if (!url.startsWith(UPLOAD_URL_PREFIX)) return null;
  const rest = url.slice(UPLOAD_URL_PREFIX.length);
  const [folder, filename] = rest.split("/");
  if (!folder || !filename || filename.includes("..") || filename.includes("/")) {
    return null;
  }
  if (!UPLOAD_FOLDERS.includes(folder as UploadFolder)) return null;
  return { folder: folder as UploadFolder, filename };
}

export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return PLACEHOLDER_IMAGE;
  if (url.startsWith(LEGACY_UPLOAD_PREFIX)) return PLACEHOLDER_IMAGE;
  return url;
}

export function mimeToExtension(mimeType: string): string {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

export function generateUploadFilename(mimeType: string): string {
  const ext = mimeToExtension(mimeType);
  const random = Math.random().toString(16).slice(2, 10);
  return `${Date.now()}-${random}.${ext}`;
}
