"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import { resolveImageUrl } from "@/lib/uploads-shared";
import type { UploadFolder } from "@/lib/uploads-shared";
import { cn } from "@/lib/utils";

type LocalImageFieldProps = {
  label: string;
  value?: string;
  folder: UploadFolder;
  onChange: (url: string) => void;
  className?: string;
};

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
  const previewUrl = value ? resolveImageUrl(value) : "";

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      if (value) formData.append("replaceUrl", value);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
      showToast("Image uploaded");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Upload failed", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (value) {
      await fetch("/api/admin/uploads/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      }).catch(() => undefined);
    }
    onChange("");
    showToast("Image removed");
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-semibold text-deep-navy">{label}</label>
      <div className="flex flex-wrap items-start gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-md border border-mountie-blue/20 bg-light-bg">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={previewUrl.startsWith("/api/uploads/")}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-cool-grey">No image</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-sm bg-electric-blue px-3 py-1.5 text-xs font-semibold uppercase text-white disabled:opacity-50"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? "Uploading..." : "Replace"}
            </button>
            {value && (
              <button
                type="button"
                className="rounded-sm border border-mountie-blue/30 px-3 py-1.5 text-xs font-semibold uppercase text-deep-navy"
                disabled={uploading}
                onClick={handleRemove}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
