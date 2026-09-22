import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Donate",
  description: "Support Mounties Youth Basketball programs, equipment, and community events.",
  path: "/donate",
});

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Donate"
        subtitle="Help us continue building the Mountie tradition in Central PA."
      />
      <ContentSection>
        <SectionHeading
          title="Support Our Program"
          description="Your support helps fund equipment, facilities, scholarships, and community events like the P-O Cash Bash. Every contribution strengthens our ability to serve young athletes."
        />
        <p className="mt-6 text-mountie-blue/80">
          To make a donation or discuss sponsorship opportunities, please contact {siteConfig.contact.primaryName}:
        </p>
        <div className="mt-6 space-y-2 text-mountie-blue/80">
          <p>
            Email:{" "}
            <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-electric-blue hover:underline">
              {siteConfig.contact.primaryEmail}
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href={siteConfig.contact.phoneHref} className="text-electric-blue hover:underline">
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Contact Us</Button>
          <Button href="/sponsors#sponsorship" variant="ghost">Become a Sponsor</Button>
        </div>
      </ContentSection>
    </>
  );
}
