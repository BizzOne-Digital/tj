import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactLink } from "@/components/contact/ContactLink";
import { siteConfig } from "@/config/site";
import { externalLinks } from "@/config/links";
import { IconPhone, IconMail, IconMapPin, IconInstagram, IconFacebook, IconX } from "@/components/icons";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Mounties Youth Basketball — TJ Anderson, program email, phone, and venue information.",
  path: "/contact",
});

export default function ContactPage() {
  const contacts = [
    {
      title: "Program Director",
      name: siteConfig.contact.primaryName,
      email: siteConfig.contact.primaryEmail,
      phone: siteConfig.contact.phone,
    },
    {
      title: "Program Email",
      email: siteConfig.contact.programEmail,
    },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Get in Touch" subtitle="We're here to help with any questions about our programs." />
      <ContentSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="Contact Information" />
            <div className="mt-8 space-y-6">
              {contacts.map((contact) => (
                <div key={contact.title} className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="font-display font-bold uppercase text-deep-navy">{contact.title}</h3>
                  {contact.name && <p className="mt-1 font-semibold">{contact.name}</p>}
                  {contact.email && (
                    <ContactLink
                      href={`mailto:${contact.email}`}
                      label={contact.email}
                      copyValue={contact.email}
                      className="flex items-center gap-2 text-sm text-electric-blue hover:underline"
                      icon={<IconMail className="w-4 h-4" />}
                    />
                  )}
                  {contact.phone && (
                    <ContactLink
                      href={siteConfig.contact.phoneHref}
                      label={contact.phone}
                      copyValue={siteConfig.contact.phone}
                      className="mt-1 flex items-center gap-2 text-sm text-electric-blue hover:underline"
                      icon={<IconPhone className="w-4 h-4" />}
                    />
                  )}
                </div>
              ))}

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-display font-bold uppercase text-deep-navy">Mailing Address</h3>
                <a href={externalLinks.googleMapsMailing} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-start gap-2 text-sm text-mountie-blue/80 hover:text-electric-blue">
                  <IconMapPin className="mt-0.5 shrink-0" />
                  {siteConfig.contact.mailingAddress.full}
                </a>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-display font-bold uppercase text-deep-navy">Game Venue</h3>
                <p className="mt-1 text-sm font-semibold">{siteConfig.contact.venue.name}</p>
                <a href={externalLinks.googleMapsVenue} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-start gap-2 text-sm text-mountie-blue/80 hover:text-electric-blue">
                  <IconMapPin className="mt-0.5 shrink-0" />
                  {siteConfig.contact.venue.full}
                </a>
              </div>

              <div className="flex gap-4">
                <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="text-mountie-blue hover:text-electric-blue" aria-label="Instagram"><IconInstagram /></a>
                <a href={siteConfig.social.facebook.url} target="_blank" rel="noopener noreferrer" className="text-mountie-blue hover:text-electric-blue" aria-label="Facebook"><IconFacebook /></a>
                <a href={siteConfig.social.x.url} target="_blank" rel="noopener noreferrer" className="text-mountie-blue hover:text-electric-blue" aria-label="X"><IconX /></a>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-display text-xl font-bold uppercase text-deep-navy">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
