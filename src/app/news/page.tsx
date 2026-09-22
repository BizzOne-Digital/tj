import Link from "next/link";
import { PageHero, ContentSection } from "@/components/ui/Section";
import { isFall3On3NewsSlug } from "@/data/fall-3-on-3-news";
import { listPublishedNews } from "@/lib/cms";
import { CmsImage } from "@/components/ui/CmsImage";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "News",
  description: "Latest news and updates from Mounties Youth Basketball.",
  path: "/news",
});

export const revalidate = 60;

export default async function NewsPage() {
  const newsArticles = await listPublishedNews();

  return (
    <>
      <PageHero eyebrow="News" title="News & Updates" subtitle="Program announcements and league news." />
      <ContentSection>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {article.image && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CmsImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className={
                      isFall3On3NewsSlug(article.slug)
                        ? "object-contain bg-light-bg transition-transform group-hover:scale-[1.02]"
                        : "object-cover transition-transform group-hover:scale-105"
                    }
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">{article.category}</p>
              <h2 className="mt-2 font-display text-lg font-bold uppercase text-deep-navy group-hover:text-electric-blue">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-mountie-blue/70 line-clamp-3">{article.excerpt}</p>
              <time className="mt-4 block text-xs text-mountie-blue/50">{article.datePublished}</time>
              </div>
            </Link>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
