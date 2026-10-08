import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { AwardsTabNav } from "@/components/layout/ProgramTabNav";
import { recordBookPdf } from "@/data/pdf-part3";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Record Book — All-Time Leaders",
  description: "Mounties Youth Basketball program record book and all-time leaders.",
  path: "/awards-records/record-book",
});

const scopeLabels = {
  "single-game": "Single Game",
  "single-season": "Single Season",
  career: "Career",
} as const;

export default function RecordBookPage() {
  const grouped = {
    "single-game": recordBookPdf.categories.filter((c) => c.scope === "single-game"),
    "single-season": recordBookPdf.categories.filter((c) => c.scope === "single-season"),
    career: recordBookPdf.categories.filter((c) => c.scope === "career"),
  };

  return (
    <>
      <PageHero
        eyebrow="Achievements"
        title={recordBookPdf.title}
        subtitle={recordBookPdf.subtitle}
      />
      <ContentSection>
        <AwardsTabNav currentPath="/awards-records/record-book" />
        <p className="mt-6 max-w-3xl text-mountie-blue/80">{recordBookPdf.description}</p>
      </ContentSection>
      {(Object.keys(grouped) as Array<keyof typeof grouped>).map((scope) => (
        <ContentSection key={scope} dark={scope === "career"}>
          <SectionHeading title={scopeLabels[scope]} light={scope === "career"} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[scope].map((cat) => (
              <div
                key={cat.id}
                className={`rounded-lg border p-6 ${
                  scope === "career"
                    ? "border-white/10 bg-white/5"
                    : "border-mountie-blue/10 bg-white shadow-sm"
                }`}
              >
                <h3
                  className={`font-display text-sm font-bold uppercase ${
                    scope === "career" ? "text-white" : "text-deep-navy"
                  }`}
                >
                  {cat.title}
                </h3>
                <p className={`mt-2 text-xs ${scope === "career" ? "text-cool-grey" : "text-mountie-blue/60"}`}>
                  Pending verified data from program
                </p>
              </div>
            ))}
          </div>
        </ContentSection>
      ))}
    </>
  );
}
