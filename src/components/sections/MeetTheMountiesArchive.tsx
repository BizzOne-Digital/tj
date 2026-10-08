"use client";

import { useState } from "react";
import { ContentSection, MediaComingSoon } from "@/components/ui/Section";
import { DriveFolderGallery, teamPhotoGalleryDefaults } from "@/components/galleries/DriveFolderGallery";
import { publicMedia } from "@/config/public-media";
import type { MeetSeasonData } from "@/lib/media";

export function MeetTheMountiesArchive({ seasons }: { seasons: MeetSeasonData[] }) {
  const [activeSeasonId, setActiveSeasonId] = useState(seasons[seasons.length - 1]?.id ?? "");
  const season = seasons.find((s) => s.id === activeSeasonId) ?? seasons[0];

  if (!season) {
    return (
      <ContentSection>
        <MediaComingSoon
          title="Season Photos Not Found"
          description={`Team photos from past seasons are not on the server yet. Copy the Google Drive folder "MEET THE MOUNTIES" into public/${publicMedia.meetTheMounties}, then redeploy the site.`}
        />
      </ContentSection>
    );
  }

  return (
    <ContentSection>
      <div className="mb-8 flex flex-wrap gap-2">
        {seasons.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSeasonId(s.id)}
            className={`rounded-sm px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeSeasonId === s.id
                ? "bg-electric-blue text-white"
                : "bg-white text-deep-navy hover:bg-mountie-blue/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {season.sections.map((section) => (
          <DriveFolderGallery
            key={section.folderPath}
            folderPath={section.folderPath}
            title={section.title}
            columns={teamPhotoGalleryDefaults.columns}
            variant={teamPhotoGalleryDefaults.variant}
            imageFit={teamPhotoGalleryDefaults.imageFit}
            images={section.images}
          />
        ))}
      </div>
    </ContentSection>
  );
}
