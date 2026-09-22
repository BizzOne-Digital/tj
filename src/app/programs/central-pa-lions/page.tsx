import { PageHero, ContentSection } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CentralPaLionsGallery } from "@/components/galleries/PublicFolderGallery";
import { centralPaLionsPdf } from "@/data/pdf-part1";
import { externalLinks } from "@/config/links";
import { IconExternal } from "@/components/icons";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Central PA Lions AAU",
  description: "TJ Anderson's Central PA Lions Academy — AAU travel basketball grades K-12 since 2011.",
  path: "/programs/central-pa-lions",
});

export default function CentralPaLionsPage() {
  const { tryouts } = centralPaLionsPdf;

  return (
    <>
      <PageHero eyebrow="AAU Travel" title="Central PA Lions" subtitle="AAU Travel Team Program" />
      <ContentSection>
        <div className="mb-10 flex flex-wrap gap-4">
          <Button href={externalLinks.centralPaLions} external>
            Visit Central PA Lions <IconExternal className="w-4 h-4" />
          </Button>
          <Button href="https://centralpalions.square.site/" variant="ghost" external>
            Payment / Store
          </Button>
        </div>

        <div className="space-y-8">
          <section className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold uppercase text-deep-navy">About the Academy</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-mountie-blue/80">{centralPaLionsPdf.about}</p>
          </section>

          <section className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold uppercase text-deep-navy">Mission, Vision & Team Culture</h2>
            <p className="mt-4 leading-relaxed text-mountie-blue/80">{centralPaLionsPdf.mission}</p>
          </section>

          <section className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold uppercase text-deep-navy">AAU Travel Team Program</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-mountie-blue/80">{centralPaLionsPdf.travelProgram}</p>
          </section>

          <section className="rounded-lg bg-deep-navy p-8 text-white">
            <h2 className="font-display text-xl font-bold uppercase">Tryouts</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-bold text-electric-blue">Fall {tryouts.fall2026.date}</p>
                <ul className="mt-2 space-y-1 text-sm text-cool-grey">
                  {tryouts.fall2026.sessions.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-bold text-electric-blue">Spring {tryouts.spring2027.date}</p>
                <ul className="mt-2 space-y-1 text-sm text-cool-grey">
                  {tryouts.spring2027.sessions.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-cool-grey">{tryouts.location}</p>
            <p className="mt-2 text-sm text-cool-grey">{tryouts.note}</p>
          </section>

          <p className="text-sm text-mountie-blue/70">{centralPaLionsPdf.payment}</p>
        </div>

        <div className="mt-12">
          <CentralPaLionsGallery />
        </div>
      </ContentSection>
    </>
  );
}
