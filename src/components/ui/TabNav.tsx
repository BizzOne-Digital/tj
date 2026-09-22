import Link from "next/link";
import { cn } from "@/lib/utils";

export type TabNavItem = {
  label: string;
  href: string;
};

function isTabActive(currentPath: string, href: string): boolean {
  if (currentPath === href) return true;

  const [hrefPath, hrefQuery] = href.split("?");
  const [curPath, curQuery] = currentPath.split("?");

  if (hrefQuery && curPath === hrefPath) {
    return curQuery === hrefQuery;
  }

  if (!hrefQuery && curPath === hrefPath) {
    return true;
  }

  return false;
}

export function TabNav({
  items,
  currentPath,
}: {
  items: TabNavItem[];
  currentPath: string;
}) {
  return (
    <nav
      className="mb-8 flex gap-1 overflow-x-auto border-b border-mountie-blue/10 pb-px"
      aria-label="Section tabs"
    >
      {items.map((item) => {
        const isActive = isTabActive(currentPath, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 px-4 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors",
              isActive
                ? "border-b-2 border-electric-blue text-electric-blue"
                : "text-mountie-blue/60 hover:text-deep-navy"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
