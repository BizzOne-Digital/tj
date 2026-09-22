import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { programs } from "@/data/programs";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Join",
  description: "Join Mounties Youth Basketball — register for programs, leagues, camps, and training.",
  path: "/join",
});

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Join the Mountie Family"
        subtitle={siteConfig.motto}
      />
      <ContentSection>
        <SectionHeading
          title="Get Started"
          description="Choose a program below to learn more and register when registration is open. Contact us if you need help finding the right fit for your athlete."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {programs.map((program) => (
            <div key={program.id} className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
              <div>
                <h2 className="font-display font-bold uppercase text-deep-navy">{program.title}</h2>
                {program.grades && <p className="text-sm text-electric-blue">{program.grades}</p>}
              </div>
              <Button href={program.href} size="sm">View</Button>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-lg bg-deep-navy p-8 text-center">
          <p className="text-cool-grey">Questions about registration?</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Contact Us</Button>
            <Button href="/booking" variant="secondary">Book Training</Button>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
