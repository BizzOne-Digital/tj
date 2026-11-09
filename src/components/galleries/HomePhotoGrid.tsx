import { MediaComingSoon } from "@/components/ui/Section";
import { encodePublicAssetPath } from "@/lib/utils";

type HomePhotoGridProps = {
  images: string[];
  columns?: 2 | 3;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

export function HomePhotoGrid({
  images,
  columns = 2,
  emptyTitle = "Photos Coming Soon",
  emptyDescription = "Program photos will appear here once uploaded.",
  className,
}: HomePhotoGridProps) {
  if (images.length === 0) {
    return (
      <MediaComingSoon
        title={emptyTitle}
        description={emptyDescription}
        className={className}
      />
    );
  }

  const gridCols =
    columns === 3 ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {images.map((src, index) => (
        <div
          key={`${index}-${src}`}
          className="overflow-hidden rounded-lg bg-mountie-blue/10 shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodePublicAssetPath(src)}
            alt=""
            className="gallery-photo block h-auto w-full object-contain object-top"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
