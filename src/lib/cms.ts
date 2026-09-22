import { getDb } from "@/lib/db";
import type { TabNavItem } from "@/components/ui/TabNav";
import type { NavItem } from "@/config/navigation";
import { defaultTabGroups } from "@/config/tab-navigation";
import { mainNavigation } from "@/config/navigation";
import { fall3On3NewsSlugs } from "@/data/fall-3-on-3-news";
import { newsArticles, type NewsArticle } from "@/data/news";
import { announcements } from "@/data/announcements";
import { programs, type Program } from "@/data/programs";
import { staffMembers, type StaffMember } from "@/data/staff";
import { sponsors, type Sponsor } from "@/data/sponsors";
import { faqs, type FAQ } from "@/data/faqs";
import {
  programsWithPublicImages,
  sponsorsWithPublicLogos,
  staffWithPublicPhotos,
  withPublicProgramImages,
  withPublicSponsorLogos,
  withPublicStaffPhotos,
} from "@/lib/cms-public-fallbacks";

export type CmsTabItem = TabNavItem & { id: string; order: number };

export type CmsTabGroup = {
  slug: string;
  name: string;
  tabs: CmsTabItem[];
  updatedAt: Date;
};

export type CmsContentType =
  | "news"
  | "announcement"
  | "program"
  | "staff"
  | "sponsor"
  | "faq";

export type CmsContentDoc = {
  _id?: string;
  type: CmsContentType;
  slug?: string;
  order: number;
  published: boolean;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

const TAB_GROUPS = "cms_tab_groups";
const NAVIGATION = "cms_navigation";
const CONTENT = "cms_content";
const META = "cms_meta";

async function withDb<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.MONGODB_URI) return fallback;
  try {
    return await fn();
  } catch (error) {
    console.error("CMS database unavailable, using static fallback:", error);
    return fallback;
  }
}

const DEFAULT_TAB_GROUPS = defaultTabGroups;

/** News copied from src/data/news.ts — refreshed in Mongo on each CMS read (deploy-safe). */
const EDITORIAL_SYNC_NEWS_SLUGS = fall3On3NewsSlugs;

function sortNewsByDate(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

function mergeStaticNews(cmsArticles: NewsArticle[]): NewsArticle[] {
  const bySlug = new Map(cmsArticles.map((article) => [article.slug, article]));
  for (const article of newsArticles) {
    if (!bySlug.has(article.slug)) {
      bySlug.set(article.slug, article);
    }
  }
  return sortNewsByDate(Array.from(bySlug.values()));
}

async function syncEditorialNewsArticles(db: Awaited<ReturnType<typeof getDb>>, now: Date): Promise<void> {
  for (const article of newsArticles) {
    if (!EDITORIAL_SYNC_NEWS_SLUGS.has(article.slug)) continue;
    const index = newsArticles.findIndex((a) => a.slug === article.slug);
    await db.collection(CONTENT).updateOne(
      { type: "news", slug: article.slug },
      {
        $set: {
          data: article as unknown as Record<string, unknown>,
          updatedAt: now,
          published: true,
          order: index >= 0 ? index : 0,
        },
        $setOnInsert: {
          type: "news",
          slug: article.slug,
          createdAt: now,
        },
      },
      { upsert: true },
    );
  }
}

function toTabItems(tabs: TabNavItem[]): CmsTabItem[] {
  return tabs.map((tab, index) => ({
    ...tab,
    id: `${tab.href}-${index}`,
    order: index,
  }));
}

export async function ensureCmsSeeded(): Promise<void> {
  const db = await getDb();
  const meta = await db.collection(META).findOne({ key: "seeded" });
  const now = new Date();

  if (meta?.value) {
    await syncEditorialNewsArticles(db, now);
    return;
  }

  for (const group of DEFAULT_TAB_GROUPS) {
    await db.collection(TAB_GROUPS).updateOne(
      { slug: group.slug },
      {
        $setOnInsert: {
          slug: group.slug,
          name: group.name,
          tabs: toTabItems(group.tabs),
          updatedAt: now,
        },
      },
      { upsert: true },
    );
  }

  await db.collection(NAVIGATION).updateOne(
    { key: "main" },
    {
      $setOnInsert: {
        key: "main",
        items: mainNavigation,
        updatedAt: now,
      },
    },
    { upsert: true },
  );

  const contentSeeds: Array<{ type: CmsContentType; data: Record<string, unknown>; slug?: string; order: number }> = [
    ...newsArticles.map((article, index) => ({
      type: "news" as const,
      slug: article.slug,
      order: index,
      data: article as unknown as Record<string, unknown>,
    })),
    ...announcements.map((item, index) => ({
      type: "announcement" as const,
      slug: item.id,
      order: index,
      data: item as unknown as Record<string, unknown>,
    })),
    ...programs.map((item, index) => ({
      type: "program" as const,
      slug: item.id,
      order: index,
      data: item as unknown as Record<string, unknown>,
    })),
    ...staffMembers.map((item, index) => ({
      type: "staff" as const,
      slug: item.id,
      order: index,
      data: item as unknown as Record<string, unknown>,
    })),
    ...sponsors.map((item, index) => ({
      type: "sponsor" as const,
      slug: item.id,
      order: index,
      data: item as unknown as Record<string, unknown>,
    })),
    ...faqs.map((item, index) => ({
      type: "faq" as const,
      slug: item.id,
      order: index,
      data: item as unknown as Record<string, unknown>,
    })),
  ];

  for (const seed of contentSeeds) {
    await db.collection(CONTENT).updateOne(
      { type: seed.type, slug: seed.slug },
      {
        $setOnInsert: {
          type: seed.type,
          slug: seed.slug,
          order: seed.order,
          published: true,
          data: seed.data,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true },
    );
  }

  await syncEditorialNewsArticles(db, now);

  await db.collection(META).updateOne(
    { key: "seeded" },
    { $set: { key: "seeded", value: true, updatedAt: now } },
    { upsert: true },
  );
}

export async function listTabGroups(): Promise<CmsTabGroup[]> {
  await ensureCmsSeeded();
  const db = await getDb();
  const groups = await db.collection<CmsTabGroup>(TAB_GROUPS).find().sort({ name: 1 }).toArray();
  return groups;
}

export async function getTabGroup(slug: string): Promise<CmsTabGroup | null> {
  const fallback = DEFAULT_TAB_GROUPS.find((g) => g.slug === slug);
  const fallbackGroup = fallback
    ? {
        slug: fallback.slug,
        name: fallback.name,
        tabs: toTabItems(fallback.tabs),
        updatedAt: new Date(),
      }
    : null;

  return withDb(async () => {
    await ensureCmsSeeded();
    const db = await getDb();
    const group = await db.collection<CmsTabGroup>(TAB_GROUPS).findOne({ slug });
    return group ?? fallbackGroup;
  }, fallbackGroup);
}

export async function getTabItems(slug: string): Promise<TabNavItem[]> {
  const fallback = DEFAULT_TAB_GROUPS.find((g) => g.slug === slug);
  const fallbackItems = fallback ? fallback.tabs : [];
  const group = await getTabGroup(slug);
  if (!group) return fallbackItems;
  return group.tabs
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(({ label, href }) => ({ label, href }));
}

export async function saveTabGroup(
  slug: string,
  input: { name: string; tabs: CmsTabItem[] },
): Promise<CmsTabGroup> {
  const db = await getDb();
  const now = new Date();
  const doc: CmsTabGroup = {
    slug,
    name: input.name,
    tabs: input.tabs.map((tab, index) => ({ ...tab, order: index })),
    updatedAt: now,
  };
  await db.collection(TAB_GROUPS).updateOne({ slug }, { $set: doc }, { upsert: true });
  return doc;
}

export async function createTabGroup(input: {
  slug: string;
  name: string;
  tabs?: CmsTabItem[];
}): Promise<CmsTabGroup> {
  return saveTabGroup(input.slug, {
    name: input.name,
    tabs: input.tabs ?? [],
  });
}

export async function deleteTabGroup(slug: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection(TAB_GROUPS).deleteOne({ slug });
  return result.deletedCount > 0;
}

function resolveMainNavigation(stored: NavItem[] | undefined): NavItem[] {
  if (!stored?.length) return mainNavigation;
  if (!stored.some((item) => item.label === "News")) return mainNavigation;
  return stored;
}

async function syncMainNavigationFromConfig(db: Awaited<ReturnType<typeof getDb>>): Promise<void> {
  const doc = await db.collection<{ key: string; items: NavItem[] }>(NAVIGATION).findOne({ key: "main" });
  if (!doc?.items?.some((item) => item.label === "News")) {
    await db.collection(NAVIGATION).updateOne(
      { key: "main" },
      { $set: { key: "main", items: mainNavigation, updatedAt: new Date() } },
      { upsert: true },
    );
  }
}

export async function getNavigation(): Promise<NavItem[]> {
  return withDb(async () => {
    await ensureCmsSeeded();
    const db = await getDb();
    await syncMainNavigationFromConfig(db);
    const doc = await db.collection<{ key: string; items: NavItem[] }>(NAVIGATION).findOne({ key: "main" });
    return resolveMainNavigation(doc?.items);
  }, mainNavigation);
}

export async function saveNavigation(items: NavItem[]): Promise<NavItem[]> {
  const db = await getDb();
  await db.collection(NAVIGATION).updateOne(
    { key: "main" },
    { $set: { items, updatedAt: new Date() } },
    { upsert: true },
  );
  return items;
}

export async function listContent(type: CmsContentType): Promise<CmsContentDoc[]> {
  await ensureCmsSeeded();
  const db = await getDb();
  const items = await db
    .collection(CONTENT)
    .find({ type })
    .sort({ order: 1, updatedAt: -1 })
    .toArray();
  return items.map((item) => {
    const doc = item as unknown as CmsContentDoc;
    return { ...doc, _id: item._id.toString() };
  });
}

export async function getContentBySlug(
  type: CmsContentType,
  slug: string,
): Promise<CmsContentDoc | null> {
  await ensureCmsSeeded();
  const db = await getDb();
  return db.collection<CmsContentDoc>(CONTENT).findOne({ type, slug, published: true });
}

export async function listPublishedNews(): Promise<NewsArticle[]> {
  return withDb(async () => {
    await ensureCmsSeeded();
    const db = await getDb();
    await syncEditorialNewsArticles(db, new Date());
    const items = await listContent("news");
    const cmsArticles = items.filter((item) => item.published).map((item) => item.data as NewsArticle);
    return mergeStaticNews(cmsArticles);
  }, sortNewsByDate(newsArticles));
}

export async function getContentById(id: string): Promise<CmsContentDoc | null> {
  await ensureCmsSeeded();
  const db = await getDb();
  const { ObjectId } = await import("mongodb");
  const doc = await db.collection(CONTENT).findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return { ...(doc as unknown as CmsContentDoc), _id: doc._id.toString() };
}

export async function getPublishedNewsArticle(slug: string): Promise<NewsArticle | null> {
  const staticArticle = newsArticles.find((a) => a.slug === slug) ?? null;
  return withDb(async () => {
    await ensureCmsSeeded();
    const db = await getDb();
    await syncEditorialNewsArticles(db, new Date());
    if (EDITORIAL_SYNC_NEWS_SLUGS.has(slug) && staticArticle) {
      return staticArticle;
    }
    const doc = await getContentBySlug("news", slug);
    if (doc) return doc.data as NewsArticle;
    const cmsNewsCount = await db.collection(CONTENT).countDocuments({ type: "news" });
    if (cmsNewsCount === 0) {
      return staticArticle;
    }
    return staticArticle;
  }, staticArticle);
}

export async function createContent(input: {
  type: CmsContentType;
  slug?: string;
  data: Record<string, unknown>;
  order?: number;
  published?: boolean;
}): Promise<CmsContentDoc> {
  const db = await getDb();
  const now = new Date();
  const count = await db.collection(CONTENT).countDocuments({ type: input.type });
  const doc = {
    type: input.type,
    slug: input.slug,
    order: input.order ?? count,
    published: input.published ?? true,
    data: input.data,
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection(CONTENT).insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function updateContent(
  id: string,
  input: Partial<Pick<CmsContentDoc, "slug" | "data" | "order" | "published">>,
): Promise<CmsContentDoc | null> {
  const db = await getDb();
  const { ObjectId } = await import("mongodb");
  const result = await db.collection(CONTENT).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  if (!result) return null;
  return { ...(result as unknown as CmsContentDoc), _id: result._id.toString() };
}

export async function deleteContent(id: string): Promise<boolean> {
  const db = await getDb();
  const { ObjectId } = await import("mongodb");
  const result = await db.collection(CONTENT).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function listPublishedAnnouncements(): Promise<
  Array<{ id: string; message: string; href: string; active: boolean }>
> {
  return withDb(async () => {
    const items = await listContent("announcement");
    return items
      .filter((i) => i.published)
      .map((i) => i.data as { id: string; message: string; href: string; active: boolean });
  }, announcements);
}

export async function listPublishedPrograms(): Promise<Program[]> {
  return withDb(async () => {
    const items = await listContent("program");
    const published = items.filter((i) => i.published).map((i) => i.data as Program);
    return withPublicProgramImages(published);
  }, programsWithPublicImages);
}

export async function listPublishedStaff(): Promise<StaffMember[]> {
  return withDb(async () => {
    const items = await listContent("staff");
    const published = items.filter((i) => i.published).map((i) => i.data as StaffMember);
    return withPublicStaffPhotos(published);
  }, staffWithPublicPhotos);
}

export async function listPublishedSponsors(): Promise<Sponsor[]> {
  return withDb(async () => {
    const items = await listContent("sponsor");
    const published = items.filter((i) => i.published).map((i) => i.data as Sponsor);
    return withPublicSponsorLogos(published);
  }, sponsorsWithPublicLogos);
}

export async function listPublishedNewsSlugs(): Promise<string[]> {
  const articles = await listPublishedNews();
  return articles.map((article) => article.slug);
}

export async function listPublishedFaqs(): Promise<FAQ[]> {
  return withDb(async () => {
    const items = await listContent("faq");
    return items.filter((i) => i.published).map((i) => i.data as FAQ);
  }, faqs);
}
