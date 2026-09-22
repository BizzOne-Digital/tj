"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tabs", label: "Section Tabs" },
  { href: "/admin/navigation", label: "Main Navigation" },
  { href: "/admin/content/news", label: "News" },
  { href: "/admin/content/announcement", label: "Announcements" },
  { href: "/admin/content/program", label: "Programs" },
  { href: "/admin/content/staff", label: "Staff" },
  { href: "/admin/content/sponsor", label: "Sponsors" },
  { href: "/admin/content/faq", label: "FAQs" },
  { href: "/admin/gear", label: "Mountie Gear" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-light-bg text-deep-navy">
      <header className="border-b border-mountie-blue/10 bg-deep-navy text-white">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-wide">Mounties Admin</p>
            <p className="text-xs text-white/70">Manage tabs, content, and images</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-sm border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase hover:border-electric-blue"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="container grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "bg-electric-blue text-white"
                  : "text-mountie-blue hover:bg-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
