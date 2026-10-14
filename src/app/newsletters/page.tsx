import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import {
  newsletterPdfHref,
  poBasketballNewsletters,
} from "@/data/po-basketball-newsletters";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "P-O Basketball Newsletters",
  description:
    "Read past issues of the P-O Dribble Drive Coaches Newsletter from Mounties Youth Basketball.",
  path: "/newsletters",
});

export default function PoBasketballNewslettersPage() {
  return (
    <>
      <PageHero
        eyebrow="More"
        title="P-O Basketball Newsletters"
        subtitle="P-O Dribble Drive Coaches Newsletter — past issues for coaches, families, and supporters."
      />
      <ContentSection>
        <RevealOnScroll>
          <SectionHeading
            title="Newsletter Archive"
            description="Select an issue to open the PDF in a new tab. You can view it in your browser or download it for offline reading."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {poBasketballNewsletters.map((item) => (
              <li key={item.filename}>
                <a
                  href={newsletterPdfHref(item.filename)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">
                      Issue {item.issue}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-bold uppercase text-deep-navy group-hover:text-electric-blue">
                      {item.title}
                    </h2>
                  </div>
                  <span className="mt-4 inline-block text-sm font-semibold text-electric-blue">
                    Open PDF →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </ContentSection>
    </>
  );
}
