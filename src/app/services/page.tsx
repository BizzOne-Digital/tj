import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { trainingService } from "@/data/programs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Training & Development",
  description: "One-on-one and small-group basketball training with Coach Anderson — $65 per player, 60 minutes, twice weekly at the MS Gym.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Training & Development"
        title="Elevate Your Game"
        subtitle="Personalized basketball training for athletes at every level."
      />
      <ContentSection>
        <RevealOnScroll>
          <SectionHeading
            title={trainingService.title}
            description={trainingService.description}
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Duration", value: trainingService.duration },
              { label: "Price", value: trainingService.price },
              { label: "Frequency", value: trainingService.frequency },
              { label: "Location", value: trainingService.location },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-white p-6 text-center shadow-sm">
                <dt className="text-xs font-bold uppercase tracking-wider text-mountie-blue/60">{item.label}</dt>
                <dd className="mt-2 font-display text-2xl font-bold text-deep-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Button href="/booking">{trainingService.cta.label}</Button>
          </div>
        </RevealOnScroll>
      </ContentSection>
      <ContentSection dark>
        <RevealOnScroll>
          <SectionHeading
            title="What to Expect"
            description="Sessions focus on fundamentals, game IQ, shooting mechanics, ball handling, defensive positioning, and confidence building. Coach Anderson works with each athlete to set development goals and track progress."
            light
          />
        </RevealOnScroll>
      </ContentSection>
    </>
  );
}
