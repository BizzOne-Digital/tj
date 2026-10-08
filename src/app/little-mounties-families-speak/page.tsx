import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { FamilyTestimonialCards } from "@/components/sections/FamilyTestimonialCards";
import { littleMountiesTestimonials } from "@/data/little-mounties-testimonials";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Little Mounties Families Speak",
  description:
    "Hear from Mounties Youth Basketball families about camps, leagues, coaching, and growing together in Central PA.",
  path: "/little-mounties-families-speak",
});

export default function LittleMountiesFamiliesSpeakPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Little Mounties Families Speak"
        subtitle="Stories from parents and players in our Philipsburg-Osceola youth basketball family."
      />

      <section className="relative overflow-hidden bg-deep-navy py-16 md:py-24">
        <div className="court-lines absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="grain absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="container relative z-10">
          <FamilyTestimonialCards items={littleMountiesTestimonials} />
        </div>
      </section>

      <section className="bg-light-bg py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-electric-blue">
              Program growth
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase text-deep-navy md:text-3xl">
              Six years of building Little Mounties
            </h2>
            <p className="mt-4 text-mountie-blue/80 leading-relaxed">
              From our early days with a small core of athletes to more than 90 players across camps,
              leagues, and training—thank you to every family who has trusted us with their kids.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg shadow-lg ring-1 ring-mountie-blue/10">
            <Image
              src="/images/about/program-growth-poster.jpg"
              alt="P-O program growth chart showing increase from 22 players to over 90 players in six years, a 309 percent increase"
              width={1200}
              height={1600}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={false}
            />
          </div>
          <p className="mt-10 text-center text-sm text-mountie-blue/70">
            Ready to join the family?{" "}
            <Link href="/join" className="font-semibold text-electric-blue hover:underline">
              See how to get involved
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-electric-blue hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
