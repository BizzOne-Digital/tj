import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { trainingService } from "@/data/programs";
import { selectProgramRecord } from "@/data/teams";
import { sponsorsNote } from "@/data/sponsors";
import { Button } from "@/components/ui/Button";
import { SectionHeading, ContentSection } from "@/components/ui/Section";
import {
  HomeProgramGallery,
  HomeTeamGallery,
  HomeTrainingGallery,
} from "@/components/galleries/PublicFolderGallery";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ScheduleBoard } from "@/components/schedules/ScheduleBoard";
import { SponsorMarquee } from "@/components/galleries/SponsorMarquee";
import { IconArrowRight, IconTrophy, IconExternal } from "@/components/icons";
import { externalLinks } from "@/config/links";
import { publicMedia } from "@/config/public-media";
import { encodePublicAssetPath } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";
import { fall3On3League } from "@/data/fall-3-on-3-league";
import { listPublishedNews, listPublishedPrograms, listPublishedSponsors } from "@/lib/cms";
import { CmsImage } from "@/components/ui/CmsImage";
import { NewsArticleCardImage } from "@/components/news/NewsArticleCardImage";

const centralPaLionsTeamPhoto = `/${publicMedia.centralPaLions}/central-pa-lions-team-2025-26.jpg`;

export const metadata: Metadata = createMetadata({
  title: "Mounties Youth Basketball",
  description: siteConfig.description,
  path: "/",
});

export const revalidate = 60;

export default async function HomePage() {
  const [programs, allNews, sponsorList] = await Promise.all([
    listPublishedPrograms(),
    listPublishedNews(),
    listPublishedSponsors(),
  ]);
  const featuredNews = allNews.filter((a) => a.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-deep-navy">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/brand/little-mounties-logo.png"
            className="h-full w-full object-cover opacity-40"
            aria-label="Basketball highlight video"
          >
            <source src="/videos/hero-basketball.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-deep-navy/80 to-deep-navy/40" />
          <div className="court-lines absolute inset-0 opacity-10" />
        </div>

        <div className="container relative z-10 py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Image
                src="/brand/little-mounties-logo.png"
                alt="Little Mounties"
                width={140}
                height={140}
                className="mb-8 h-28 w-28 object-contain md:h-36 md:w-36"
                priority
              />
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-electric-blue">
                Philipsburg-Osceola
              </p>
              <h1 className="hero-title text-white">
                <span className="block">Mountaineer Elementary</span>
                <span className="block">Basketball Program</span>
              </h1>
              <p className="mt-6 font-display text-xl font-bold uppercase tracking-wider text-electric-blue md:text-2xl">
                {siteConfig.motto}
              </p>
              <blockquote className="mt-6 border-l-4 border-electric-blue pl-4 text-cool-grey italic">
                &ldquo;{siteConfig.quote.text}&rdquo;
                <footer className="mt-1 text-sm not-italic text-white/60">
                  — {siteConfig.quote.author}
                </footer>
              </blockquote>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/programs">Explore Programs</Button>
                <Button href="/leagues/elementary/schedule" variant="outline">
                  View Schedule
                </Button>
                <Button href="/booking" variant="secondary">
                  Book Training
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="angle-divider-bottom" aria-hidden="true" />
      </section>

      {/* 3-on-3 Fall League */}
      <ContentSection>
        <RevealOnScroll>
          <div className="overflow-hidden rounded-lg border-2 border-electric-blue/30 bg-white shadow-lg">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="bg-deep-navy p-8 md:p-10">
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-electric-blue">
                  Leagues
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase text-white md:text-4xl">
                  1st Annual 3-on-3 Fall Basketball League
                </h2>
                <p className="mt-4 text-cool-grey leading-relaxed">
                  {fall3On3League.flyerDetails.weeks} — {fall3On3League.flyerDetails.when}.{" "}
                  {fall3On3League.flyerDetails.grades}.
                </p>
                <p className="mt-3 text-sm text-cool-grey">
                  {fall3On3League.dates} · {fall3On3League.location.name}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/leagues/3-on-3-fall">Teams & Schedule</Button>
                  <Button href={fall3On3League.band.url} variant="outline" external>
                    Join Band Page
                  </Button>
                </div>
              </div>
              <Link href="/leagues/3-on-3-fall" className="block p-4 md:p-6">
                <Image
                  src={fall3On3League.flyerImage}
                  alt="3-on-3 P-O Fall Basketball League flyer"
                  width={600}
                  height={800}
                  className="mx-auto h-auto w-full max-w-md rounded-md object-contain shadow-md transition-transform hover:scale-[1.02]"
                />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </ContentSection>

      {/* Program Snapshot */}
      <ContentSection>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Programs"
            title="Current Program Snapshot"
            description="From introductory play to competitive travel teams — find the right fit for your athlete."
          />
        </RevealOnScroll>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <RevealOnScroll key={program.id} delay={i * 0.1}>
              <Link href={program.href} className="program-card group block h-full !p-0">
                {program.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <CmsImage
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-contain object-[top_center] transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">
                  {program.grades || "All Ages"}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold uppercase text-deep-navy group-hover:text-electric-blue">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mountie-blue/70">{program.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-blue">
                  Learn More <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </ContentSection>

      {/* Attitude & Effort */}
      <ContentSection dark className="relative overflow-hidden">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={siteConfig.coreValue}
              title="More Than Basketball"
              description={siteConfig.about}
              light
            />
            <p className="mt-6 text-lg text-cool-grey">
              At the end of the day, we&apos;re <span className="font-bold text-white">FAMILY</span> as we believe in supporting one another wholeheartedly.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <HomeProgramGallery />
          </RevealOnScroll>
        </div>
      </ContentSection>

      {/* Schedule */}
      <ContentSection>
        <RevealOnScroll>
          <SectionHeading eyebrow="Schedule" title="Upcoming Games" />
        </RevealOnScroll>
        <div className="mt-10">
          <RevealOnScroll>
            <ScheduleBoard />
          </RevealOnScroll>
          <p className="mt-4 text-center text-sm text-mountie-blue/60">
            <Link href="/leagues/elementary/schedule" className="font-semibold text-electric-blue hover:underline">
              View full schedule
            </Link>
          </p>
        </div>
      </ContentSection>

      {/* Training Feature */}
      <ContentSection dark>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Training & Development"
              title={trainingService.title}
              description={trainingService.description}
              light
            />
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {[
                { label: "Duration", value: trainingService.duration },
                { label: "Price", value: trainingService.price },
                { label: "Frequency", value: trainingService.frequency },
                { label: "Location", value: trainingService.location },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-bold uppercase tracking-wider text-cool-grey">{item.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Button href={trainingService.cta.href}>{trainingService.cta.label}</Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="halftone rounded-lg bg-mountie-blue/30 p-8">
              <HomeTrainingGallery />
            </div>
          </RevealOnScroll>
        </div>
      </ContentSection>

      {/* State Qualifier */}
      <ContentSection>
        <RevealOnScroll>
          <div className="rounded-lg border-2 border-electric-blue/30 bg-white p-8 md:p-12">
            <div className="flex items-start gap-4">
              <IconTrophy className="mt-1 h-10 w-10 shrink-0 text-electric-blue" />
              <div>
                <h2 className="font-display text-3xl font-bold uppercase text-deep-navy">
                  Official State Qualifier League
                </h2>
                <p className="mt-4 text-lg text-mountie-blue/80">{siteConfig.stateQualifier}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button href="/leagues/elementary" size="sm">Elementary League</Button>
                  <Button href="/state-championship" size="sm" variant="ghost">State Championship</Button>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </ContentSection>

      {/* Central PA Lions */}
      <ContentSection dark>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="AAU Travel"
              title="Central PA Lions"
              description="AAU travel basketball academy serving boys and girls grades K–12. Academy history beginning in 2011."
              light
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/programs/central-pa-lions">Learn More</Button>
              <Button href={externalLinks.centralPaLions} variant="outline" external>
                Visit Website <IconExternal className="w-4 h-4" />
              </Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="overflow-hidden rounded-lg border border-white/20 bg-white/5 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodePublicAssetPath(centralPaLionsTeamPhoto)}
                alt="Central PA Lions AAU team 2025–26"
                className="gallery-photo block h-auto w-full rounded-md object-contain object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          </RevealOnScroll>
        </div>
      </ContentSection>

      {/* Team Gallery */}
      <ContentSection>
        <RevealOnScroll>
          <SectionHeading eyebrow="Gallery" title="Team Gallery" description="Editorial team photography from across the program." />
        </RevealOnScroll>
        <div className="mt-10">
          <HomeTeamGallery />
        </div>
      </ContentSection>

      {/* Achievements */}
      <ContentSection dark>
        <RevealOnScroll>
          <SectionHeading eyebrow="Achievements" title="Program Highlights" light />
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <RevealOnScroll>
            <div className="rounded-lg border border-electric-blue/30 bg-mountie-blue/20 p-8 text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-electric-blue">
                {selectProgramRecord.program} — {selectProgramRecord.season}
              </p>
              <p className="mt-4 font-display text-7xl font-bold text-white">{selectProgramRecord.record}</p>
              <p className="mt-2 text-sm text-cool-grey">{selectProgramRecord.note}</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="rounded-lg border border-white/10 bg-white/5 p-8">
              <h3 className="font-display text-xl font-bold uppercase text-white">State Qualifier Status</h3>
              <p className="mt-4 text-cool-grey">{siteConfig.stateQualifier}</p>
              <Link href="/awards-records" className="mt-4 inline-flex items-center gap-1 font-semibold text-electric-blue hover:underline">
                View Awards & Records <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </ContentSection>

      {/* News */}
      <ContentSection dark id="news" className="scroll-mt-24">
        <RevealOnScroll>
          <SectionHeading eyebrow="News" title="Latest Updates" light />
        </RevealOnScroll>
        <div className="relative z-0 mt-10 grid gap-6 md:grid-cols-3">
          {featuredNews.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-electric-blue/50"
            >
              {article.image && (
                <NewsArticleCardImage
                  slug={article.slug}
                  src={article.image}
                  alt={article.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">{article.category}</p>
              <h3 className="mt-2 font-display text-lg font-bold uppercase text-white group-hover:text-electric-blue">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-cool-grey line-clamp-3">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="relative z-10 mt-8 flex justify-center">
          <Link
            href="/news"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border-2 border-white/30 bg-deep-navy px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-electric-blue hover:text-electric-blue touch-manipulation"
          >
            All News
          </Link>
        </div>
      </ContentSection>

      {/* Sponsors */}
      <section className="bg-mountie-blue py-16">
        <div className="container">
          <h2 className="mb-2 text-center font-display text-2xl font-bold uppercase text-white">Our Sponsors</h2>
          <p className="mb-8 text-center text-sm text-cool-grey">{sponsorsNote}</p>
          <SponsorMarquee sponsors={sponsorList} />
          <div className="mt-8 text-center">
            <Link href="/sponsors" className="text-sm font-semibold text-electric-blue hover:underline">
              View All Sponsors
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <ContentSection>
        <RevealOnScroll>
          <div className="rounded-lg bg-deep-navy p-8 text-center md:p-16">
            <h2 className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
              Join the Mountie Family
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cool-grey">
              Register for a program, book training, or reach out to Coach Anderson to learn how your athlete can be part of the Mountie tradition.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/join">Join a Program</Button>
              <Button href="/booking" variant="secondary">Book Training</Button>
              <Button href="/contact" variant="outline">Contact Us</Button>
            </div>
          </div>
        </RevealOnScroll>
      </ContentSection>
    </>
  );
}
