"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { mainNavigation, ctaNavigation, type NavItem } from "@/config/navigation";
import { IconMenu, IconClose, IconChevronDown } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function navPathMatches(pathname: string, href: string): boolean {
  const [childPath, childHash] = href.split("#");
  const pathOnly = childPath.split("?")[0];
  if (childHash && pathOnly === "/" && pathname === "/") {
    return true;
  }
  return pathname === pathOnly || (pathOnly.length > 1 && pathname.startsWith(pathOnly));
}

function childrenContainPath(children: NavItem[], pathname: string): boolean {
  for (const child of children) {
    if (child.href && navPathMatches(pathname, child.href)) {
      return true;
    }
    if (child.children && childrenContainPath(child.children, pathname)) {
      return true;
    }
  }
  return false;
}

function findActiveNavSection(pathname: string, navigation: NavItem[]): string {
  for (const item of navigation) {
    if (item.href && pathname === item.href) {
      return item.label;
    }
    if (item.children && childrenContainPath(item.children, pathname)) {
      return item.label;
    }
  }
  return navigation[0].label;
}

function NavDropdownChildren({
  items,
  pathname,
  onNavigate,
  topLinkClassName,
  nestedLinkClassName,
  groupTitleClassName,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
  topLinkClassName: string;
  nestedLinkClassName: string;
  groupTitleClassName: string;
}) {
  return items.map((child) => {
    if (child.children?.length) {
      return (
        <div key={child.label} className="border-t border-white/10 py-1 first:border-t-0">
          <p className={groupTitleClassName}>{child.label}</p>
          {child.children.map((sub) => {
            const isActive = sub.href ? isChildLinkActive(pathname, sub.href) : false;
            return (
              <Link
                key={sub.href}
                href={sub.href!}
                className={cn(nestedLinkClassName, isActive && "text-electric-blue")}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
              >
                {sub.label}
              </Link>
            );
          })}
        </div>
      );
    }

    const isActive = child.href ? isChildLinkActive(pathname, child.href) : false;
    return (
      <Link
        key={child.href ?? child.label}
        href={child.href!}
        className={cn(topLinkClassName, isActive && "text-electric-blue")}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
      >
        {child.label}
      </Link>
    );
  });
}

function isChildLinkActive(pathname: string, href: string): boolean {
  const [hrefPath, hrefQuery] = href.split("?");
  const [curPath, curQuery] = pathname.split("?");

  if (hrefQuery && curPath === hrefPath) {
    return curQuery === hrefQuery;
  }

  if (!hrefQuery && curPath === hrefPath) {
    return true;
  }

  return false;
}

export function Header({ navigation = mainNavigation }: { navigation?: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState(() =>
    findActiveNavSection(pathname, navigation),
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const activeMobileItem = useMemo(
    () => navigation.find((item) => item.label === activeMobileTab),
    [activeMobileTab, navigation],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      setActiveMobileTab(findActiveNavSection(pathname, navigation));
    }
  }, [mobileOpen, pathname, navigation]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleMobileTabClick = (item: NavItem) => {
    if (item.href && !item.children) {
      router.push(item.href);
      closeMobileMenu();
      return;
    }
    setActiveMobileTab(item.label);
  };

  const mobileMenu =
    mounted && mobileOpen
      ? createPortal(
          <div className="fixed inset-0 z-[90] xl:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <button
              type="button"
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            />
            <aside
              className="absolute inset-y-0 left-0 z-10 flex w-[min(100%,20rem)] max-w-[85vw] flex-col bg-deep-navy shadow-2xl"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              {/* Horizontal scrollable section tabs */}
              <nav
                className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 px-3 pb-px pt-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Mobile section tabs"
              >
                {navigation.map((item) => {
                  const isActive = activeMobileTab === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className={cn(
                        "shrink-0 px-3 py-3 font-display text-xs font-bold uppercase tracking-wide transition-colors sm:text-sm",
                        isActive
                          ? "border-b-2 border-electric-blue text-electric-blue"
                          : "text-white/60 hover:text-white",
                      )}
                      onClick={() => handleMobileTabClick(item)}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Links for the active section */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                {activeMobileItem?.href && !activeMobileItem.children ? (
                  <Link
                    href={activeMobileItem.href}
                    className="block rounded-md px-3 py-2.5 font-display text-base font-bold uppercase tracking-wide text-electric-blue"
                    onClick={closeMobileMenu}
                  >
                    {activeMobileItem.label}
                  </Link>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {activeMobileItem?.children && (
                      <li>
                        <NavDropdownChildren
                          items={activeMobileItem.children}
                          pathname={pathname}
                          onNavigate={closeMobileMenu}
                          groupTitleClassName="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wide text-electric-blue/90"
                          topLinkClassName="block rounded-md px-3 py-2.5 text-sm leading-snug text-white/85 transition-colors hover:bg-white/5 hover:text-electric-blue"
                          nestedLinkClassName="block rounded-md py-2 pl-6 pr-3 text-sm leading-snug text-white/85 transition-colors hover:bg-white/5 hover:text-electric-blue"
                        />
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="shrink-0 border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Button href={ctaNavigation.href} className="w-full" onClick={closeMobileMenu}>
                  {ctaNavigation.label}
                </Button>
              </div>
            </aside>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[100] transition-all duration-300",
          scrolled ? "bg-deep-navy/95 shadow-lg backdrop-blur-md" : "bg-deep-navy",
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="relative flex shrink-0 items-center gap-3">
            <Image
              src="/brand/little-mounties-logo.png"
              alt="Mounties Youth Basketball"
              width={56}
              height={56}
              className="h-12 w-12 object-contain md:h-14 md:w-14"
              priority
            />
            <span className="hidden font-display text-xs font-bold uppercase leading-tight tracking-wide text-white sm:block lg:text-sm">
              Mounties
              <br />
              Youth Basketball
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-electric-blue"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <IconChevronDown className="h-3 w-3" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full min-w-[240px] rounded-md border border-white/10 bg-deep-navy py-2 shadow-xl">
                      <NavDropdownChildren
                        items={item.children}
                        pathname={pathname}
                        groupTitleClassName="px-4 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wide text-electric-blue/90"
                        topLinkClassName="block px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-electric-blue/10 hover:text-electric-blue"
                        nestedLinkClassName="block py-2 pl-8 pr-4 text-sm text-white/80 transition-colors hover:bg-electric-blue/10 hover:text-electric-blue"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-electric-blue"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button href={ctaNavigation.href} size="sm" className="ml-2">
              {ctaNavigation.label}
            </Button>
          </nav>

          <button
            type="button"
            className="relative z-[110] p-2 text-white xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
