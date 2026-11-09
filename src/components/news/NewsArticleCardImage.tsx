import { CmsImage } from "@/components/ui/CmsImage";
import { isFall3On3NewsSlug } from "@/data/fall-3-on-3-news";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  src: string;
  alt: string;
  sizes?: string;
};

/**
 * List/card thumbnails — league result graphics are portrait; use a taller frame and light bg
 * so they are not cropped or lost in letterboxing on dark sections.
 */
export function NewsArticleCardImage({
  slug,
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: Props) {
  const isLeagueGraphic = isFall3On3NewsSlug(slug);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        isLeagueGraphic
          ? "aspect-[3/4] max-h-[min(70vw,300px)] bg-light-bg sm:max-h-[340px] md:max-h-none md:aspect-[4/5]"
          : "aspect-[16/10]",
        !isLeagueGraphic && "bg-mountie-blue/5",
      )}
    >
      <CmsImage
        src={src}
        alt={alt}
        fill
        className={cn(
          isLeagueGraphic
            ? "object-contain p-2 transition-transform group-hover:scale-[1.02]"
            : "object-cover transition-transform group-hover:scale-105",
        )}
        sizes={sizes}
      />
    </div>
  );
}
