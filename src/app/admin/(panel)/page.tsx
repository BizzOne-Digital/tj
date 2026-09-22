import Link from "next/link";

const sections = [
  { href: "/admin/tabs", title: "Section Tabs", description: "Add, edit, delete, and reorder tabs on program pages." },
  { href: "/admin/navigation", title: "Main Navigation", description: "Manage header menu links and dropdown items." },
  { href: "/admin/content/news", title: "News", description: "Publish and update news articles with images." },
  { href: "/admin/content/announcement", title: "Announcements", description: "Top banner messages on every page." },
  { href: "/admin/content/program", title: "Programs", description: "Manage program cards and images." },
  { href: "/admin/content/staff", title: "Staff", description: "Update staff profiles and photos." },
  { href: "/admin/content/sponsor", title: "Sponsors", description: "Manage sponsor logos and links." },
  { href: "/admin/content/faq", title: "FAQs", description: "Edit frequently asked questions." },
  {
    href: "/admin/gear",
    title: "Mountie Gear For Sale",
    description: "List gear, set quantities, and mark items sold (sold out at zero).",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase text-deep-navy">Dashboard</h1>
      <p className="mt-2 text-mountie-blue/70">
        Manage all site tabs, navigation, content, and uploaded images from one place.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-mountie-blue/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="font-display text-xl font-bold uppercase text-deep-navy">{section.title}</h2>
            <p className="mt-2 text-sm text-mountie-blue/70">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
