import { PageHero } from "@/components/ui/PageHero";
import { MeetTheMountiesArchive } from "@/components/sections/MeetTheMountiesArchive";
import { meetTheMountiesPdf as defaultMeet } from "@/data/pdf-part3";
import { getSiteData } from "@/lib/site-data";
import { scanMeetTheMounties } from "@/lib/media";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Meet the Mounties",
  description: defaultMeet.description,
  path: "/meet-the-mounties",
});

export default async function MeetTheMountiesPage() {
  const { meetTheMountiesPdf } = await getSiteData("pdf-part3");
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
