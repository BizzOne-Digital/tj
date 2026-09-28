import Link from "next/link";
import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { staffQuote } from "@/data/staff";
import { listPublishedStaff } from "@/lib/cms";
import { siteConfig } from "@/config/site";
import { StaffCard } from "@/components/sections/StaffCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { createPageMetadata } from "@/lib/page-metadata";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons";

export const metadata = createPageMetadata({
  title: "Our Team",
  description: "Meet the coaches and staff behind Mounties Youth Basketball.",
  path: "/team",
});

export const revalidate = 60;

export default async function TeamPage() {
  const staffMembers = await listPublishedStaff();
  const [featured, coaches] = [
    staffMembers.filter((m) => m.featured),
    staffMembers.filter((m) => !m.featured),
  ];

  return (
    <>
      <PageHero eyebrow="Teams" title="Staff & Teams" subtitle="The people behind the Mountie tradition." />
      <ContentSection id="staff">
        <SectionHeading
          title="Program Staff"
          description="Coaches, leadership, and the 2025–26 Booster Club supporting P-O Youth Basketball."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((member) => (
            <RevealOnScroll key={member.id} className="md:col-span-2">
              <StaffCard member={member} />
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((member, i) => (
            <RevealOnScroll key={member.id} delay={i * 0.05}>
              <StaffCard member={member} />
            </RevealOnScroll>
          ))}
        </div>
      </ContentSection>
      <ContentSection>
        <SectionHeading
          title="Meet the Mounties"
          description="Season archives with coaches, rosters, senior spotlight, and team photos from 2020–21 through 2025–26."
        />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/meet-the-mounties">View Season Photo Archives</Button>
          <Link
            href="/meet-the-mounties"
            className="inline-flex items-center gap-1 text-sm font-semibold text-electric-blue hover:underline"
          >
            Browse all years <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ContentSection>
      <ContentSection dark>
        <SectionHeading title={siteConfig.coreValue} description={siteConfig.about} light />
        <blockquote className="mx-auto mt-10 max-w-2xl border-l-4 border-electric-blue pl-6 text-lg italic text-cool-grey">
          &ldquo;{staffQuote.text}&rdquo;
          <footer className="mt-3 text-sm font-semibold not-italic text-white">
            — {staffQuote.author}
          </footer>
        </blockquote>
      </ContentSection>
    </>
  );
}
