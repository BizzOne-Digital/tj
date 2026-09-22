import Image from "next/image";
import { resolveImageUrl, isUploadApiUrl } from "@/lib/uploads-shared";
import { encodePublicAssetPath } from "@/lib/utils";

function isPublicFolderAsset(url: string): boolean {
  return (
    url.startsWith("/") &&
    !isUploadApiUrl(url) &&
    !url.startsWith("/brand/") &&
    !url.startsWith("/images/") &&
    !url.startsWith("/staff/") &&
    !url.startsWith("/sponsors/")
  );
}

type CmsImageProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export function CmsImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: CmsImageProps) {
  const url = resolveImageUrl(src);
  if (!src || url === "/images/placeholder.svg") return null;

  if (isPublicFolderAsset(url)) {
    const imgClass = fill
      ? `absolute inset-0 h-full w-full object-contain object-[top_center] ${className ?? ""}`
      : `block h-auto w-full max-h-[480px] object-contain object-[top_center] ${className ?? ""}`;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={encodePublicAssetPath(url)}
        alt={alt}
        className={imgClass}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  const unoptimized = isUploadApiUrl(url);

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
    />
  );
}
