import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero, ContentSection } from "@/components/ui/Section";
import { ArticleContent } from "@/components/news/ArticleContent";
import { CmsImage } from "@/components/ui/CmsImage";
import { DriveFolderGallery } from "@/components/galleries/DriveFolderGallery";
import { SectionHeading } from "@/components/ui/Section";
import { isFall3On3NewsSlug } from "@/data/fall-3-on-3-news";
import { getPublishedNewsArticle, listPublishedNewsSlugs } from "@/lib/cms";
import { getDirectPublicImages } from "@/lib/media";
import { articleJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await listPublishedNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNewsArticle(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${slug}`,
    type: "article",
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedNewsArticle(slug);
  if (!article) notFound();

  const galleryFolder =
    typeof article.galleryFolder === "string" && article.galleryFolder.length > 0
      ? article.galleryFolder
      : null;
  const galleryImages = galleryFolder ? getDirectPublicImages(galleryFolder) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: article.title,
              description: article.excerpt,
              slug: article.slug,
              datePublished: article.datePublished,
            }),
          ),
        }}
      />
      <PageHero eyebrow={article.category} title={article.title} />
      <ContentSection>
        <time className="text-sm text-mountie-blue/60">{article.datePublished}</time>
        {article.image && (
          <div
            className={`relative mt-6 overflow-hidden rounded-lg ${
              isFall3On3NewsSlug(slug) ? "aspect-auto bg-light-bg" : "aspect-[16/9]"
            }`}
          >
            <CmsImage
              src={article.image}
              alt={article.title}
              fill={!isFall3On3NewsSlug(slug)}
              width={isFall3On3NewsSlug(slug) ? 1200 : undefined}
              height={isFall3On3NewsSlug(slug) ? 1600 : undefined}
              className={
                isFall3On3NewsSlug(slug) ? "h-auto w-full object-contain" : "object-cover"
              }
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}
        <ArticleContent content={article.content} />
        {galleryFolder && galleryImages.length > 0 && (
          <div className="mt-10">
            <SectionHeading title="Week #1 Pictures" />
            <DriveFolderGallery
              folderPath={galleryFolder}
              images={galleryImages}
              columns={2}
              variant="card"
              imageFit="contain"
              aspectClass="aspect-[3/4] sm:aspect-[4/5]"
            />
          </div>
        )}
        <Link href="/news" className="mt-8 inline-block font-semibold text-electric-blue hover:underline">
          &larr; Back to News
        </Link>
      </ContentSection>
    </>
  );
}
