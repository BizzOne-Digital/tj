import Image from "next/image";
import Link from "next/link";
import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { Fall3On3TabNav } from "@/components/layout/ProgramTabNav";
import { PublicVideo } from "@/components/galleries/PublicVideo";
import { Button } from "@/components/ui/Button";
import { IconExternal } from "@/components/icons";
import { fall3On3League } from "@/data/fall-3-on-3-league";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "3-on-3 Fall Basketball League",
  description:
    "P-O 3-on-3 Fall Basketball League — teams, schedule, rules, live stream, and Band updates at Philipsburg-Osceola Middle School.",
  path: "/leagues/3-on-3-fall",
});

const teamColorClass: Record<string, string> = {
  red: "border-red-500/40 bg-red-50",
  blue: "border-electric-blue/40 bg-electric-blue/5",
  white: "border-mountie-blue/20 bg-white",
  pink: "border-pink-400/40 bg-pink-50",
};

export default function Fall3On3LeaguePage() {
  const league = fall3On3League;

  return (
    <>
      <PageHero
        eyebrow="Leagues"
        title="3-on-3 P-O Fall Basketball League"
        subtitle={league.heroSubtitle}
      />
      <ContentSection>
        <Fall3On3TabNav currentPath="/leagues/3-on-3-fall" />

        <div className="mb-10 overflow-hidden rounded-lg border border-mountie-blue/10 bg-white p-4 shadow-sm">
          <Image
            src={league.flyerImage}
            alt="1st Annual 3-on-3 P-O Fall Basketball League promotional flyer"
            width={900}
            height={1200}
            className="mx-auto h-auto w-full max-w-2xl rounded-md object-contain"
            priority
          />
        </div>

        {league.videoSrc && (
          <PublicVideo
            src={league.videoSrc}
            title="League Video"
            className="mb-10"
          />
        )}

        <div className="mb-10 rounded-lg border-2 border-electric-blue/30 bg-light-bg p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold uppercase text-deep-navy">
            Parents — Important Info
          </h2>
          <div className="mt-4 space-y-4 text-mountie-blue/85 leading-relaxed whitespace-pre-line">
            {league.parentMessage}
          </div>
        </div>

        <SectionHeading title="Teams" description="Fall 2025 league rosters by team color." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {league.teams.map((team) => (
            <div
              key={team.id}
              className={`rounded-lg border-2 p-5 ${teamColorClass[team.id] ?? "border-mountie-blue/10 bg-white"}`}
            >
              <p className="font-display text-lg font-bold uppercase text-deep-navy">
                {team.name} ({team.color})
              </p>
              <p className="mt-3 text-sm font-medium text-mountie-blue/80">
                {team.players.join(" • ")}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-mountie-blue/10 bg-white p-6">
            <h3 className="font-display text-xl font-bold uppercase text-deep-navy">League Dates</h3>
            <p className="mt-2 text-lg font-semibold text-electric-blue">{league.dates}</p>
          </div>
          <div className="rounded-lg border border-mountie-blue/10 bg-white p-6">
            <h3 className="font-display text-xl font-bold uppercase text-deep-navy">Location</h3>
            <p className="mt-2 font-semibold text-deep-navy">{league.location.name}</p>
            <p className="mt-1 text-mountie-blue/80">{league.location.address}</p>
            <a
              href={league.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric-blue hover:underline"
            >
              Open in Maps <IconExternal className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10">
          <SectionHeading title="Schedule Highlights" />
          <ul className="mt-6 space-y-3">
            {league.scheduleHighlights.map((item) => (
              <li
                key={item.label}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-md bg-white px-4 py-3 shadow-sm"
              >
                <span className="font-semibold text-deep-navy">{item.label}</span>
                <span className="text-mountie-blue/80">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <SectionHeading title="Week 1 Game Schedule" />
          <div className="mt-6 overflow-x-auto rounded-lg border border-mountie-blue/10 bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-mountie-blue/10 bg-light-bg text-mountie-blue/70">
                  <th className="px-4 py-3 font-semibold">Game</th>
                  <th className="px-4 py-3 font-semibold">Matchup</th>
                  <th className="px-4 py-3 font-semibold">Court</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {league.games.map((game) => (
                  <tr key={game.id} className="border-b border-mountie-blue/5 last:border-0">
                    <td className="px-4 py-3 font-medium text-deep-navy">{game.label}</td>
                    <td className="px-4 py-3 text-mountie-blue/85">{game.matchup}</td>
                    <td className="px-4 py-3 text-mountie-blue/85">{game.court}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-mountie-blue/85">{game.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-mountie-blue/80">
            <Link href="/leagues/3-on-3-fall/news" className="font-semibold text-electric-blue hover:underline">
              Read league news — Week 1 &amp; Week 2 results and photos →
            </Link>
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading title="League Rules Snapshot" />
          <ul className="mt-6 grid gap-2 md:grid-cols-2">
            {league.rules.map((rule) => (
              <li
                key={rule}
                className="flex gap-2 rounded-md bg-white px-4 py-3 text-sm text-mountie-blue/85 shadow-sm"
              >
                <span className="text-electric-blue" aria-hidden="true">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border-2 border-electric-blue/30 bg-deep-navy p-6 text-white md:p-8">
            <h3 className="font-display text-xl font-bold uppercase text-electric-blue">
              {league.band.title}
            </h3>
            <p className="mt-3 text-cool-grey leading-relaxed">{league.band.description}</p>
            <Button
              href={league.band.url}
              external
              className="mt-6"
              variant="secondary"
            >
              Join Band Group <IconExternal className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-lg border-2 border-mountie-blue/20 bg-white p-6 md:p-8">
            <h3 className="font-display text-xl font-bold uppercase text-deep-navy">
              {league.liveStream.title}
            </h3>
            <p className="mt-3 text-mountie-blue/80 leading-relaxed">{league.liveStream.description}</p>
            <Button href={league.liveStream.url} external className="mt-6" variant="ghost">
              Watch on NFHS Network <IconExternal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-mountie-blue/60">
          <Link href="/leagues/elementary" className="font-semibold text-electric-blue hover:underline">
            ← Back to Elementary League
          </Link>
        </p>
      </ContentSection>
    </>
  );
}
