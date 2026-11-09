"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import { PLACEHOLDER_IMAGE, resolveImageUrl } from "@/lib/uploads-shared";
import type { UploadFolder } from "@/lib/uploads-shared";
import { prepareImageForUpload } from "@/lib/image-compress";
import { cn, encodePublicAssetPath } from "@/lib/utils";

type LocalImageFieldProps = {
  label: string;
  value?: string;
  folder: UploadFolder;
  onChange: (url: string) => void;
  className?: string;
};

/**
 * Admin image picker. Uploads to POST /api/upload (stored in MongoDB) and returns the
 * public URL (/api/uploads/<folder>/<filename>) through onChange.
 *
 * Replacing / removing only changes the value in the form. The old stored image is
 * deleted by the server when the parent record is saved, so abandoning an edit never
 * leaves a live page pointing at a deleted image.
 */
export function LocalImageField({
  label,
  value = "",
  folder,
  onChange,
  className,
}: LocalImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();
  const resolved = value ? resolveImageUrl(value) : "";
  const previewUrl =
    resolved && resolved !== PLACEHOLDER_IMAGE ? encodePublicAssetPath(resolved) : "";

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", await prepareImageForUpload(file));
      formData.append("folder", folder);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
      showToast("Image uploaded. Click Save to publish.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Upload failed", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-semibold capitalize text-deep-navy">{label}</label>
      <div className="flex flex-wrap items-start gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-mountie-blue/20 bg-light-bg">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-cool-grey">
              {value ? "Legacy image" : "No image"}
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-deep-navy/60 text-xs font-semibold text-white">
              Uploading...
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-sm bg-electric-blue px-3 py-1.5 text-xs font-semibold uppercase text-white disabled:opacity-50"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? "Uploading..." : value ? "Replace" : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                className="rounded-sm border border-mountie-blue/30 px-3 py-1.5 text-xs font-semibold uppercase text-deep-navy disabled:opacity-50"
                disabled={uploading}
                onClick={() => onChange("")}
              >
                Remove
              </button>
            )}
          </div>
          <p className="truncate text-xs text-cool-grey" title={value}>
            {value || "JPEG, PNG, WebP or GIF, up to 8MB"}
          </p>
        </div>
      </div>
    </div>
  );
}
