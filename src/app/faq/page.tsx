import { PageHero, ContentSection } from "@/components/ui/Section";
import { listPublishedFaqs } from "@/lib/cms";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Mounties Youth Basketball programs, leagues, and training.",
  path: "/faq",
});

export const revalidate = 60;

export default async function FAQPage() {
  const faqs = await listPublishedFaqs();
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <PageHero eyebrow="Help" title="Frequently Asked Questions" subtitle="Answers to common questions about our programs." />
      <ContentSection>
        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold uppercase text-deep-navy">{category}</h2>
            <div className="divide-y divide-mountie-blue/10 rounded-lg border border-mountie-blue/10 bg-white">
              {faqs.filter((f) => f.category === category).map((faq) => (
                <details key={faq.id} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-deep-navy hover:text-electric-blue [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-electric-blue transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-mountie-blue/80 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </ContentSection>
    </>
  );
}
