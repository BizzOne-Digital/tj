/**
 * Seeds CMS collections (tabs, navigation, news, programs, staff, sponsors, FAQs, announcements).
 * Safe to re-run — only inserts missing records, never overwrites existing CMS data.
 *
 * Usage: npm run seed:cms
 */
import { ensureCmsSeeded, listContent, listTabGroups } from "../src/lib/cms";

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add it to .env.local (copy from Vercel).");
  }

  console.log("Seeding CMS...");
  await ensureCmsSeeded();

  const [tabs, news, programs, staff, sponsors, faqs, announcements] = await Promise.all([
    listTabGroups(),
    listContent("news"),
    listContent("program"),
    listContent("staff"),
    listContent("sponsor"),
    listContent("faq"),
    listContent("announcement"),
  ]);

  console.log("CMS seed complete:");
  console.log(`  Tab groups:    ${tabs.length}`);
  console.log(`  News:          ${news.length}`);
  console.log(`  Programs:      ${programs.length}`);
  console.log(`  Staff:         ${staff.length}`);
  console.log(`  Sponsors:      ${sponsors.length}`);
  console.log(`  FAQs:          ${faqs.length}`);
  console.log(`  Announcements: ${announcements.length}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("CMS seed failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  });
