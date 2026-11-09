import { Header } from "@/components/layout/Header";
import { getNavigation, listPublishedAnnouncements } from "@/lib/cms";
import Link from "next/link";

export async function SiteAnnouncementBar() {
  const announcements = await listPublishedAnnouncements();
  const active = announcements.filter((a) => a.active);
  if (!active.length) return null;

  return (
    <div className="bg-electric-blue px-4 py-2 text-center text-sm font-medium text-white">
      {active.map((a) => (
        <Link key={a.id} href={a.href} className="hover:underline">
          {a.message}
        </Link>
      ))}
    </div>
  );
}

export async function SiteHeader() {
  const navigation = await getNavigation();
  return <Header navigation={navigation} />;
}
