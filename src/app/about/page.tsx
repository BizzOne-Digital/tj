import { PageHero, ContentSection } from "@/components/ui/Section";
import { AboutGallery } from "@/components/galleries/PublicFolderGallery";
import { aboutPdf } from "@/data/pdf-part1";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "About Mounties Youth Basketball — Attitude & Effort and Central PA youth basketball.",
  path: "/about",
});

export default function AboutPage() {
  const paragraphs = aboutPdf.split("\n\n");

  return (
    <>
      <PageHero eyebrow="About" title="Mounties Youth Basketball" subtitle={siteConfig.headline} />
      <ContentSection>
        <div className="prose prose-lg max-w-none text-mountie-blue/80">
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-4 leading-relaxed">{p}</p>
          ))}
        </div>
        <p className="mt-6 font-display text-xl font-bold uppercase tracking-wider text-electric-blue">
          {siteConfig.motto}
        </p>
        <blockquote className="mt-6 border-l-4 border-electric-blue pl-4 italic">
          &ldquo;{siteConfig.quote.text}&rdquo;
          <footer className="mt-1 text-sm not-italic font-semibold">— {siteConfig.quote.author}</footer>
        </blockquote>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/leagues/elementary">Elementary League</Button>
          <Button href="/select-program" variant="ghost">P-O Select League</Button>
          <Button href="/contact" variant="outline">Contact</Button>
        </div>
        <div className="mt-12">
          <AboutGallery />
        </div>
      </ContentSection>
    </>
  );
}
