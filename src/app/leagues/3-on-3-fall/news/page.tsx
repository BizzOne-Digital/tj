import Link from "next/link";
import { PageHero, ContentSection } from "@/components/ui/Section";
import { Fall3On3TabNav } from "@/components/layout/ProgramTabNav";
import { CmsImage } from "@/components/ui/CmsImage";
import { fall3On3NewsWeeks, isFall3On3NewsSlug } from "@/data/fall-3-on-3-news";
import { getArticleBySlug } from "@/data/news";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "3-on-3 League News",
  description: "Weekly results, recaps, and photos from the P-O 3-on-3 Fall Basketball League.",
  path: "/leagues/3-on-3-fall/news",
});

export default function Fall3On3LeagueNewsPage() {
  const weeks = fall3On3NewsWeeks.map((week) => ({
    ...week,
    article: getArticleBySlug(week.slug),
  }));

  return (
    <>
      <PageHero
        eyebrow="3-on-3 Fall League"
        title="League News"
        subtitle="Weekly game results, standings, recaps, and photos — updated after each Saturday at the MS."
      />
      <ContentSection>
        <Fall3On3TabNav currentPath="/leagues/3-on-3-fall/news" />

        <div className="grid gap-8 md:grid-cols-2">
          {weeks.map(({ slug, label, date, article }) => {
            if (!article) return null;
            return (
              <Link
                key={slug}
                href={`/news/${slug}`}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
              >
                {article.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-light-bg">
                    <CmsImage
                      src={article.image}
                      alt={article.title}
                      fill
                      className={
                        isFall3On3NewsSlug(slug)
                          ? "object-contain bg-light-bg transition-transform group-hover:scale-[1.02]"
                          : "object-cover transition-transform group-hover:scale-105"
                      }
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">
                    {label} • {date}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-bold uppercase text-deep-navy group-hover:text-electric-blue">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-mountie-blue/70 line-clamp-3">{article.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-electric-blue">
                    Read full article →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-mountie-blue/70">
          All league news also appears on the{" "}
          <Link href="/news" className="font-semibold text-electric-blue hover:underline">
            main News page
          </Link>
          .
        </p>
      </ContentSection>
    </>
  );
}
