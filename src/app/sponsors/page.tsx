import Link from "next/link";
import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { sponsorsNote } from "@/data/sponsors";
import { listPublishedSponsors } from "@/lib/cms";
import { resolveImageUrl } from "@/lib/uploads-shared";
import { sponsorshipProgram } from "@/data/sponsorship";
import { SponsorMarquee } from "@/components/galleries/SponsorMarquee";
import { IconMail, IconPhone } from "@/components/icons";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Sponsors",
  description:
    "Community sponsors and team sponsorship opportunities for Mounties Youth Basketball.",
  path: "/sponsors",
});

export const revalidate = 60;

export default async function SponsorsPage() {
  const sponsorList = await listPublishedSponsors();
  const program = sponsorshipProgram;

  return (
    <>
      <PageHero eyebrow="Support" title="Our Sponsors" subtitle={sponsorsNote} />
      <section className="bg-mountie-blue py-12">
        <SponsorMarquee sponsors={sponsorList} />
      </section>

      <ContentSection>
        <SectionHeading title="Current Sponsors" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sponsorList.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex flex-col items-center overflow-visible rounded-lg border border-mountie-blue/10 bg-white p-8 pb-10 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageUrl(sponsor.logo)}
                alt={sponsor.name}
                className="block h-auto w-full max-w-[240px] object-contain"
                style={{ height: "auto", maxHeight: "none" }}
              />
              <p className="mt-6 text-center font-display text-sm font-bold uppercase tracking-wider text-deep-navy">
                {sponsor.name}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection id="sponsorship" dark>
        <SectionHeading
          eyebrow="Become a Sponsor"
          title={program.title}
          description={`${program.organization} — sponsorship opportunities for the 2026 season.`}
          light
        />

        <div className="mt-10 max-w-3xl space-y-4 text-cool-grey leading-relaxed">
          <p className="font-semibold text-white">{program.greeting}</p>
          {program.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>{program.contactNote}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={program.contact.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-electric-blue hover:underline"
            >
              <IconPhone className="h-4 w-4" />
              {program.contact.phone}
            </a>
            <a
              href={`mailto:${program.contact.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-electric-blue hover:underline"
            >
              <IconMail className="h-4 w-4" />
              {program.contact.email}
            </a>
          </div>
          {program.closing.map((line) => (
            <p key={line} className={line.startsWith("Coach") ? "font-semibold text-white" : undefined}>
              {line}
            </p>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {program.tiers.map((tier) => (
            <div
              key={tier.id}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <p className="font-display text-lg font-bold uppercase text-white">{tier.title}</p>
              <p className="mt-2 text-2xl font-bold text-electric-blue">{tier.amount}</p>
              {"description" in tier && tier.description && (
                <p className="mt-3 text-sm text-cool-grey">{tier.description}</p>
              )}
              {"benefits" in tier && tier.benefits && (
                <ul className="mt-4 space-y-2 text-sm text-cool-grey">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
              {"options" in tier && tier.options && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {tier.options.map((option) => (
                    <span
                      key={option}
                      className="rounded bg-electric-blue/20 px-4 py-2 text-sm font-bold text-white"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-electric-blue/30 bg-mountie-blue/30 p-8">
          <h3 className="font-display text-xl font-bold uppercase text-white">Sponsorship Form</h3>
          <p className="mt-4 text-sm text-cool-grey">
            Complete the following information and mail your form with payment to:
          </p>
          <p className="mt-3 font-semibold text-white">
            {program.mailing.addressee}
            <br />
            {program.mailing.address}
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {program.formFields.map((field) => (
              <div key={field}>
                <dt className="text-xs font-bold uppercase tracking-wider text-cool-grey">{field}</dt>
                <dd className="mt-2 h-10 rounded border border-white/20 bg-white/5" aria-hidden="true" />
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="text-xs font-bold uppercase tracking-wider text-cool-grey">
                Total Sponsorship Fee / Donation
              </dt>
              <dd className="mt-2 h-10 rounded border border-white/20 bg-white/5" aria-hidden="true" />
            </div>
          </dl>

          <div className="mt-8 space-y-3 text-sm text-cool-grey">
            <p>
              <span className="font-semibold text-white">{program.logoSubmission.label}:</span>{" "}
              {program.logoSubmission.instruction}{" "}
              <a
                href={`mailto:${program.logoSubmission.email}`}
                className="font-semibold text-electric-blue hover:underline"
              >
                {program.logoSubmission.email}
              </a>
            </p>
            <p className="font-semibold text-white">{program.deadline}</p>
            <p>
              P-O LLB Federal Tax ID: <span className="font-mono text-white">{program.taxId}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={`mailto:${program.contact.email}?subject=Team%20Sponsorship%20Inquiry`}>
              Email Coach Anderson
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-cool-grey">
          Prefer to print?{" "}
          <Link href="/contact" className="font-semibold text-electric-blue hover:underline">
            Contact us
          </Link>{" "}
          for a sponsorship form copy.
        </p>
      </ContentSection>
    </>
  );
}
