import { MediaComingSoon } from "@/components/ui/Section";
import { encodePublicAssetPath } from "@/lib/utils";

/** Defaults — full photos without cropping faces (contain, top-aligned) */
export const teamPhotoGalleryDefaults = {
  imageFit: "contain" as const,
  variant: "fluid" as const,
  columns: 2 as const,
};

type DriveFolderGalleryProps = {
  folderPath: string;
  title?: string;
  titleLight?: boolean;
  columns?: 1 | 2 | 3 | 4;
  images?: string[];
  imageFit?: "cover" | "contain";
  aspectClass?: string;
  variant?: "fluid" | "card";
};

export function DriveFolderGallery({
  folderPath,
  title,
  titleLight = false,
  columns = teamPhotoGalleryDefaults.columns,
  images = [],
  imageFit = teamPhotoGalleryDefaults.imageFit,
  aspectClass = "aspect-[4/3]",
  variant = teamPhotoGalleryDefaults.variant,
}: DriveFolderGalleryProps) {
  if (images.length === 0) {
    return (
      <MediaComingSoon
        title={title || "Media Coming Soon"}
        description={`Photos not found at: public/${folderPath}`}
      />
    );
  }

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const fitClass = imageFit === "cover" ? "object-cover" : "object-contain";
  const positionClass =
    imageFit === "cover" ? "object-center" : "object-[top_center]";

  return (
    <div>
      {title && (
        <h3
          className={`mb-4 font-display text-lg font-bold uppercase ${
            titleLight ? "text-white" : "text-deep-navy"
          }`}
        >
          {title}
        </h3>
      )}
      <div className={`grid gap-4 ${gridCols[columns]}`}>
        {images.map((src, index) => (
          <div
            key={`${index}-${src}`}
            className="rounded-lg bg-mountie-blue/5 p-1 sm:p-2"
          >
            {variant === "card" ? (
              <div className={`relative w-full ${aspectClass}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodePublicAssetPath(src)}
                  alt=""
                  className={`absolute inset-0 h-full w-full ${fitClass} ${positionClass}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={encodePublicAssetPath(src)}
                alt=""
                className={`gallery-photo mx-auto block h-auto w-full max-w-full rounded-md ${fitClass} ${positionClass}`}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
