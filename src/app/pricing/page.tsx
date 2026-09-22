import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { pricingSections } from "@/data/pricing";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Pricing",
  description: "Program fees and training pricing for Mounties Youth Basketball.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Program Fees" subtitle="Training, select league, and elementary program pricing." />
      <ContentSection>
        <div className="space-y-12">
          {pricingSections.map((section, i) => (
            <RevealOnScroll key={section.id} delay={i * 0.1}>
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <SectionHeading title={section.title} description={section.description} />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="rounded-lg bg-light-bg p-6">
                      <p className="font-display font-bold uppercase text-deep-navy">
                        {"category" in item ? item.category : item.title}
                      </p>
                      <p className="mt-2 font-display text-2xl font-bold text-electric-blue">
                        {item.price}
                      </p>
                      {"description" in item && item.description && (
                        <p className="mt-2 text-sm text-mountie-blue/70">{item.description}</p>
                      )}
                      {"note" in item && item.note && (
                        <p className="mt-2 text-xs text-mountie-blue/50">{item.note}</p>
                      )}
                    </div>
                  ))}
                </div>
                {section.cta && (
                  <div className="mt-6">
                    <Button href={section.cta.href} size="sm">{section.cta.label}</Button>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
