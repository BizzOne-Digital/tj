import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { BookingForm } from "@/components/forms/BookingForm";
import { trainingService } from "@/data/programs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Book Training",
  description: "Request one-on-one or small-group basketball training with Coach Anderson.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Request Training"
        subtitle="Submit a training request — Coach Anderson will contact you to confirm availability."
      />
      <ContentSection>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionHeading title="Session Details" />
            <dl className="mt-6 space-y-4">
              {[
                { label: "Type", value: trainingService.title },
                { label: "Duration", value: trainingService.duration },
                { label: "Price", value: trainingService.price },
                { label: "Frequency", value: trainingService.frequency },
                { label: "Location", value: trainingService.location },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-bold uppercase text-mountie-blue/60">{item.label}</dt>
                  <dd className="font-semibold text-deep-navy">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <BookingForm />
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
