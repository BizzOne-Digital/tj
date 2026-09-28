import Link from "next/link";
import { PageHero, ContentSection } from "@/components/ui/Section";
import { GearProductGrid } from "@/components/shop/GearProductGrid";
import { listPublishedGearProducts } from "@/lib/gear-store";
import { createPageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export const metadata = createPageMetadata({
  title: "Mountie Gear For Sale",
  description:
    "Limited-quantity Mountie basketball gear and apparel. When an item sells out, it is marked sold out on this page.",
  path: "/mountie-gear-for-sale",
});

export default async function MountieGearForSalePage() {
  const products = await listPublishedGearProducts();

  return (
    <>
      <PageHero
        eyebrow="Gear"
        title="Mountie Gear For Sale"
        subtitle="Limited items from our program. Quantities update as items are sold."
      />
      <ContentSection>
        <p className="mb-8 max-w-3xl text-mountie-blue/80 leading-relaxed">
          Browse available gear below. When we sell the last of an item, it will show as{" "}
          <strong className="text-deep-navy">Sold out</strong> on this page. To buy, use{" "}
          <strong className="text-deep-navy">Email to purchase</strong> on any available item, or
          contact us at{" "}
          <a
            href={`mailto:${siteConfig.contact.programEmail}`}
            className="font-semibold text-electric-blue hover:underline"
          >
            {siteConfig.contact.programEmail}
          </a>
          .
        </p>

        <GearProductGrid products={products} />

        <p className="mt-12 text-center text-sm text-mountie-blue/60">
          Looking for official team apparel through our Game One store?{" "}
          <Link href="/shop" className="font-semibold text-electric-blue hover:underline">
            Visit the Mountie Gear Store
          </Link>
          .
        </p>
      </ContentSection>
    </>
  );
}
