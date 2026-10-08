import Image from "next/image";
import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { externalLinks } from "@/config/links";
import { IconExternal } from "@/components/icons";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Gear Store",
  description: "Official Mounties Youth Basketball gear and apparel.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHero eyebrow="Gear" title="Mountie Gear Store" subtitle="Official Philipsburg-Osceola Mountie Basketball apparel." />
      <ContentSection>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-lg bg-deep-navy p-12">
            <Image
              src="/brand/little-mounties-logo.png"
              alt="Little Mounties"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div>
            <SectionHeading
              title="Official Team Store"
              description="Shop official Mounties Youth Basketball gear through our Game One team store. Jerseys, apparel, and accessories for players and families."
            />
            <div className="mt-8">
              <Button href={externalLinks.gearStore} external size="lg">
                Shop Now <IconExternal className="w-4 h-4" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-mountie-blue/60">
              You will be redirected to our external team store to complete your purchase.
            </p>
            <p className="mt-6 text-sm text-mountie-blue/80">
              For limited program items with live inventory (sold out when gone), see our{" "}
              <a href="/mountie-gear-for-sale" className="font-semibold text-electric-blue hover:underline">
                Mountie Gear For Sale
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
