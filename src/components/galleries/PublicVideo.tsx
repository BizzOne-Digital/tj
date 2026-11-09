"use client";

import { useState } from "react";
import { encodePublicAssetPath } from "@/lib/utils";

type PublicVideoProps = {
  src: string;
  title?: string;
  className?: string;
  poster?: string;
};

function videoMimeType(src: string): string {
  const ext = src.split(".").pop()?.toLowerCase();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "m4v") return "video/mp4";
  return "video/quicktime";
}

export function PublicVideo({ src, title, className, poster }: PublicVideoProps) {
  const url = encodePublicAssetPath(src);
  const [failed, setFailed] = useState(false);

  return (
    <div className={className}>
      {title && (
        <h3 className="mb-4 font-display text-lg font-bold uppercase text-deep-navy">{title}</h3>
      )}
      <div className="overflow-hidden rounded-lg bg-mountie-blue/5 p-2">
        {failed ? (
          <div className="rounded-md border border-mountie-blue/15 bg-white px-4 py-8 text-center text-sm text-mountie-blue/70">
            This video is not available right now. Please check back soon or contact the program office if
            you need access.
          </div>
        ) : (
          <video
            controls
            className="block h-auto w-full rounded-md"
            preload="metadata"
            playsInline
            poster={poster ? encodePublicAssetPath(poster) : undefined}
            onError={() => setFailed(true)}
          >
            <source src={url} type={videoMimeType(src)} />
            Your browser does not support this video.
          </video>
        )}
      </div>
    </div>
  );
}
