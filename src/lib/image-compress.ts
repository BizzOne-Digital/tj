/** Client-side: shrink large images so uploads stay under Vercel's ~4.5MB request limit. */
const TARGET_BYTES = 4 * 1024 * 1024;

export async function prepareImageForUpload(file: File): Promise<File> {
  if (file.size <= TARGET_BYTES || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    let scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.85),
      );
      if (blob && blob.size <= TARGET_BYTES) {
        return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
      }
      scale *= 0.75;
    }
  } catch {
    // fall through and upload the original
  }
  return file;
}
