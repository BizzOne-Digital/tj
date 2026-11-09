import { PageHero } from "@/components/ui/PageHero";
import { ContentSection, MediaComingSoon } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/page-metadata";
import { getSiteData } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "P-O Cash Bash",
  description: "Annual fundraising event supporting Mounties Youth Basketball.",
  path: "/events/cash-bash",
});

export default async function CashBashPage() {
  const { cashBashContent } = await getSiteData("events");
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
