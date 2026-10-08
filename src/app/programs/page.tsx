import Link from "next/link";
import { PageHero, ContentSection } from "@/components/ui/Section";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { listPublishedPrograms } from "@/lib/cms";
import { CmsImage } from "@/components/ui/CmsImage";
import { IconArrowRight } from "@/components/icons";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Programs",
  description: "Explore all Mounties Youth Basketball programs — elementary league, camps, Little Dribblers, Select, AAU, and training.",
  path: "/programs",
});

export const revalidate = 60;

export default async function ProgramsPage() {
  const programs = await listPublishedPrograms();

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Find Your Program"
        subtitle="Camps, leagues, training, and travel teams for every age and skill level."
      />
      <ContentSection>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <RevealOnScroll key={program.id} delay={i * 0.05}>
              <Link href={program.href} className="program-card group block h-full !p-0">
                {program.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <CmsImage
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-contain object-[top_center] transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                {program.grades && (
                  <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">{program.grades}</p>
                )}
                <h2 className="mt-2 font-display text-xl font-bold uppercase text-deep-navy group-hover:text-electric-blue">
                  {program.title}
                </h2>
                <p className="mt-3 text-sm text-mountie-blue/70">{program.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-blue">
                  Learn More <IconArrowRight className="w-4 h-4" />
                </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
