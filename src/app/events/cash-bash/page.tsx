import { PageHero, ContentSection, MediaComingSoon } from "@/components/ui/Section";
import { cashBashContent } from "@/data/events";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "P-O Cash Bash",
  description: "Annual fundraising event supporting Mounties Youth Basketball.",
  path: "/events/cash-bash",
});

export default function CashBashPage() {
  return (
    <>
      <PageHero eyebrow="Events" title={cashBashContent.title} subtitle={cashBashContent.description} />
      <ContentSection>
        <p className="text-lg text-mountie-blue/80">{cashBashContent.requirements}</p>
        <div className="mt-10">
          <MediaComingSoon title="Event Gallery" description={cashBashContent.galleryNote} />
        </div>
      </ContentSection>
    </>
  );
}
