import { PageHero } from "@/components/ui/Section";
import { MeetTheMountiesArchive } from "@/components/sections/MeetTheMountiesArchive";
import { meetTheMountiesPdf } from "@/data/pdf-part3";
import { scanMeetTheMounties } from "@/lib/media";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Meet the Mounties",
  description: meetTheMountiesPdf.description,
  path: "/meet-the-mounties",
});

export default function MeetTheMountiesPage() {
  const seasons = scanMeetTheMounties();

  return (
    <>
      <PageHero
        eyebrow="Teams"
        title={meetTheMountiesPdf.title}
        subtitle={meetTheMountiesPdf.description}
      />
      <MeetTheMountiesArchive seasons={seasons} />
    </>
  );
}
