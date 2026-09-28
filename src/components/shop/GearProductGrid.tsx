import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import { siteConfig } from "@/config/site";
import { gearLowStockThreshold, type GearProduct } from "@/data/gear-for-sale";
import { formatGearPrice } from "@/lib/gear-store";
import { cn } from "@/lib/utils";

function purchaseMailto(product: GearProduct): string {
  const price = formatGearPrice(product);
  const subject = encodeURIComponent(`Mountie Gear inquiry: ${product.name}`);
  const body = encodeURIComponent(
    `Hi,\n\nI would like to purchase:\n${product.name} (${price})\n\nName:\nPhone:\nBest time to reach me:\n\nThank you!`,
  );
  return `mailto:${siteConfig.contact.programEmail}?subject=${subject}&body=${body}`;
}

function GearProductCard({ product }: { product: GearProduct }) {
  const soldOut = product.quantityInStock <= 0;
  const lowStock =
    !soldOut && product.quantityInStock <= gearLowStockThreshold;
  const gallery = [product.image, ...(product.images ?? [])].filter(Boolean);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-mountie-blue/10 transition-shadow hover:shadow-md",
        soldOut && "opacity-90",
      )}
    >
      <div
        className={cn(
          "relative grid overflow-hidden bg-light-bg",
          gallery.length > 1 ? "grid-cols-2 aspect-[2/1]" : "aspect-square",
        )}
      >
        {gallery.length > 0 ? (
          gallery.map((src, index) => (
            <div key={src} className="relative min-h-[140px]">
              <CmsImage
                src={src}
                alt={index === 0 ? product.name : `${product.name} — view ${index + 1}`}
                fill
                className={cn(
                  "object-contain p-3 transition-transform duration-300",
                  !soldOut && "group-hover:scale-[1.02]",
                  soldOut && "grayscale",
                )}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
              />
            </div>
          ))
        ) : (
          <div className="flex aspect-square items-center justify-center p-6 text-center text-sm text-mountie-blue/50">
            Photo coming soon
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-deep-navy/55">
            <span className="rounded-sm bg-white px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-deep-navy">
              Sold out
            </span>
          </div>
        )}
        {lowStock && (
          <span className="absolute left-3 top-3 z-10 rounded-sm bg-electric-blue px-2 py-1 text-xs font-bold uppercase text-white">
            Only {product.quantityInStock} left
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-lg font-bold uppercase leading-snug text-deep-navy">
          {product.name}
        </h2>
        {product.description && (
          <p className="mt-2 flex-1 whitespace-pre-line text-sm leading-relaxed text-mountie-blue/70">
            {product.description}
          </p>
        )}
        <p className="mt-4 font-display text-xl font-bold text-mountie-blue">
          {formatGearPrice(product)}
        </p>
        {!soldOut && (
          <a
            href={purchaseMailto(product)}
            className="mt-4 inline-flex items-center justify-center rounded-sm bg-electric-blue px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-mountie-blue"
          >
            Email to purchase
          </a>
        )}
        {soldOut && (
          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wide text-mountie-blue/50">
            Unavailable
          </p>
        )}
      </div>
    </article>
  );
}

export function GearProductGrid({ products }: { products: GearProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-mountie-blue/20 bg-white p-10 text-center">
        <p className="font-display text-lg font-bold uppercase text-deep-navy">Coming soon</p>
        <p className="mt-2 text-sm text-mountie-blue/70">
          New items will be listed here as they become available. Questions?{" "}
          <Link href="/contact" className="font-semibold text-electric-blue hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <GearProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
