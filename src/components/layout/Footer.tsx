import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { externalLinks } from "@/config/links";
import { IconInstagram, IconFacebook, IconX, IconPhone, IconMail, IconMapPin } from "@/components/icons";

const programLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Camps & Clinics", href: "/programs/camps-clinics" },
  { label: "Little Dribblers", href: "/programs/little-dribblers" },
  { label: "Central PA Lions", href: "/programs/central-pa-lions" },
  { label: "Training Services", href: "/services" },
];

const leagueLinks = [
  { label: "Elementary League", href: "/leagues/elementary" },
  { label: "Schedule", href: "/leagues/elementary/schedule" },
  { label: "Select Program", href: "/select-program" },
  { label: "State Championship", href: "/state-championship" },
  { label: "Awards & Records", href: "/awards-records" },
];

const supportLinks = [
  { label: "Little Mounties Families Speak", href: "/little-mounties-families-speak" },
  { label: "Join", href: "/join" },
  { label: "Donate", href: "/donate" },
  { label: "Gear Store For Sale", href: "/mountie-gear-for-sale" },
  { label: "Gear Store (Game One)", href: "/shop" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-16">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/little-mounties-logo.png"
                alt="Mounties Youth Basketball"
                width={80}
                height={80}
                className="mb-6 h-16 w-16 object-contain md:h-20 md:w-20"
              />
            </Link>
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-cool-grey">
              {siteConfig.about}
            </p>
            <p className="font-display text-sm font-bold uppercase tracking-wider text-electric-blue">
              {siteConfig.motto}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cool-grey transition-colors hover:text-electric-blue"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href={siteConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cool-grey transition-colors hover:text-electric-blue"
                aria-label="Facebook"
              >
                <IconFacebook />
              </a>
              <a
                href={siteConfig.social.x.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cool-grey transition-colors hover:text-electric-blue"
                aria-label="X"
              >
                <IconX />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Programs</h3>
            <ul className="space-y-2">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cool-grey transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Leagues</h3>
            <ul className="space-y-2">
              {leagueLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cool-grey transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cool-grey transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Contact</h3>
            <div className="space-y-3 text-sm text-cool-grey">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <IconPhone className="shrink-0 text-electric-blue" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.primaryEmail}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <IconMail className="shrink-0 text-electric-blue" />
                <span className="break-all">{siteConfig.contact.primaryEmail}</span>
              </a>
              <a
                href={externalLinks.googleMapsMailing}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-white"
              >
                <IconMapPin className="mt-0.5 shrink-0 text-electric-blue" />
                <span>{siteConfig.contact.mailingAddress.full}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-cool-grey md:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white">Privacy</Link>
            <Link href="/contact" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
