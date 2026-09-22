import { getPublicImages, getGalleryImagesFromFolders, homeGalleryFolders } from "@/lib/media";
import { publicMedia } from "@/config/public-media";
import { mediaFolders } from "@/config/media-folders";
import { selectTeamPhotos } from "@/data/pdf-part2";
import { DriveFolderGallery, teamPhotoGalleryDefaults } from "./DriveFolderGallery";
import { HomePhotoGrid } from "./HomePhotoGrid";

type PublicFolderGalleryProps = {
  folderPath: string;
  title?: string;
  columns?: 1 | 2 | 3 | 4;
  images?: string[];
  imageFit?: "cover" | "contain";
  aspectClass?: string;
  variant?: "fluid" | "card";
  titleLight?: boolean;
};

export async function PublicFolderGallery({
  folderPath,
  title,
  titleLight,
  columns = teamPhotoGalleryDefaults.columns,
  images,
  imageFit = teamPhotoGalleryDefaults.imageFit,
  aspectClass,
  variant = teamPhotoGalleryDefaults.variant,
}: PublicFolderGalleryProps) {
  const resolvedImages = images ?? getPublicImages(folderPath);
  return (
    <DriveFolderGallery
      folderPath={folderPath}
      title={title}
      titleLight={titleLight}
      columns={columns}
      images={resolvedImages}
      imageFit={imageFit}
      aspectClass={aspectClass}
      variant={variant}
    />
  );
}

export async function AboutGallery() {
  return <PublicFolderGallery folderPath={publicMedia.about} title="About" />;
}

export async function LittleDribblersGallery() {
  return <PublicFolderGallery folderPath={publicMedia.littleDribblers} />;
}

export async function CentralPaLionsGallery() {
  return (
    <PublicFolderGallery
      folderPath={publicMedia.centralPaLions}
      title="Central PA Lions"
      variant={teamPhotoGalleryDefaults.variant}
      columns={teamPhotoGalleryDefaults.columns}
      imageFit={teamPhotoGalleryDefaults.imageFit}
    />
  );
}

export async function ElementaryActionGallery() {
  return (
    <PublicFolderGallery
      folderPath={publicMedia.elementaryAction}
      title="Action Shots"
    />
  );
}

export async function TeamGallery({
  folderPath,
  title,
}: {
  folderPath: string;
  title?: string;
}) {
  return <PublicFolderGallery folderPath={folderPath} title={title} />;
}

export async function HomeProgramGallery() {
  const images = getGalleryImagesFromFolders([...homeGalleryFolders.program], 4);
  return (
    <HomePhotoGrid
      images={images}
      emptyDescription="About and program photos from Google Drive will appear here."
      className="border-white/20 bg-white/5"
    />
  );
}

export async function HomeTrainingGallery() {
  const images = getGalleryImagesFromFolders([...homeGalleryFolders.training], 4);
  return (
    <HomePhotoGrid
      images={images}
      emptyTitle="Training Sessions"
      emptyDescription="Training photography from Google Drive will appear here."
      className="border-white/20 bg-deep-navy/50"
    />
  );
}

export async function HomeTeamGallery() {
  const images = getGalleryImagesFromFolders([...homeGalleryFolders.team], 6);
  return <HomePhotoGrid images={images} columns={2} />;
}

export async function ScholarshipWinnersGallery() {
  return (
    <PublicFolderGallery
      folderPath={mediaFolders.awardWinners.scholarship}
      title="Scholarship Winners"
      variant={teamPhotoGalleryDefaults.variant}
      columns={teamPhotoGalleryDefaults.columns}
      imageFit={teamPhotoGalleryDefaults.imageFit}
    />
  );
}

export async function CampsClinicGallery() {
  return (
    <PublicFolderGallery
      folderPath={mediaFolders.campsClinics.path}
      title="Camps & Clinics Photos"
      variant={teamPhotoGalleryDefaults.variant}
      columns={teamPhotoGalleryDefaults.columns}
      imageFit={teamPhotoGalleryDefaults.imageFit}
    />
  );
}

type SelectTeamSeason = (typeof selectTeamPhotos.seasons)[number];

const selectTeamGalleryProps = {
  variant: teamPhotoGalleryDefaults.variant,
  columns: teamPhotoGalleryDefaults.columns,
  imageFit: teamPhotoGalleryDefaults.imageFit,
} as const;

export async function SelectTeamGalleries({ seasons }: { seasons?: SelectTeamSeason[] } = {}) {
  const resolvedSeasons = seasons ?? selectTeamPhotos.seasons;

  return (
    <div className="space-y-16">
      {resolvedSeasons.map((season) => (
        <div key={season.id}>
          <h2 className="mb-8 font-display text-2xl font-bold uppercase text-deep-navy">{season.label}</h2>
          <div className="space-y-10">
            <PublicFolderGallery
              folderPath={season.folders.team}
              title="Team Pictures"
              {...selectTeamGalleryProps}
            />
            <PublicFolderGallery
              folderPath={season.folders.players}
              title="Player Pictures"
              {...selectTeamGalleryProps}
            />
            <PublicFolderGallery
              folderPath={season.folders.schedule}
              title="Roster"
              {...selectTeamGalleryProps}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
