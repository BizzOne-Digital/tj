import { publicMedia } from "@/config/public-media";
import { getPublicImages } from "@/lib/media";
import type { Program } from "@/data/programs";
import type { StaffMember } from "@/data/staff";
import type { Sponsor } from "@/data/sponsors";
import { programs } from "@/data/programs";
import { staffMembers } from "@/data/staff";
import { sponsors } from "@/data/sponsors";
import { PLACEHOLDER_IMAGE } from "@/lib/uploads-shared";

const programMediaFolders: Record<string, string> = {
  elementary: publicMedia.elementaryAction,
  camps: publicMedia.scholarshipDay.campMvp,
  "little-dribblers": publicMedia.littleDribblers,
  select: `${publicMedia.selectTeams}/2025-26 Team/Team Pictures`,
  lions: publicMedia.centralPaLions,
  training: publicMedia.elementaryAction,
};

function firstImageInFolder(folderPath: string): string | undefined {
  return getPublicImages(folderPath)[0];
}

/** Program card images from Google Drive folders in public/ (pre-admin behavior). */
export function withPublicProgramImages(items: Program[]): Program[] {
  const staticById = new Map(programs.map((p) => [p.id, p]));

  return items.map((item) => {
    const fromFolder = programMediaFolders[item.id]
      ? firstImageInFolder(programMediaFolders[item.id])
      : undefined;
    const staticItem = staticById.get(item.id);
    return {
      ...item,
      image: fromFolder ?? staticItem?.image ?? item.image,
    };
  });
}

export const programsWithPublicImages = withPublicProgramImages(programs);

function isUsableStaticAsset(url: string | undefined): boolean {
  if (!url) return false;
  if (url === PLACEHOLDER_IMAGE) return false;
  return !url.startsWith("/uploads/");
}

/** Staff photos from public/staff (pre-admin behavior). */
export function withPublicStaffPhotos(items: StaffMember[]): StaffMember[] {
  const staticById = new Map(staffMembers.map((m) => [m.id, m]));

  return items.map((item) => {
    const staticMember = staticById.get(item.id);
    const photo =
      (staticMember && isUsableStaticAsset(staticMember.photo) ? staticMember.photo : undefined) ??
      (isUsableStaticAsset(item.photo) ? item.photo : undefined) ??
      staticMember?.photo ??
      item.photo;
    return { ...item, photo };
  });
}

export const staffWithPublicPhotos = withPublicStaffPhotos(staffMembers);

/** Sponsor logos from public/sponsors (pre-admin behavior). */
export function withPublicSponsorLogos(items: Sponsor[]): Sponsor[] {
  const staticById = new Map(sponsors.map((s) => [s.id, s]));

  return items.map((item) => {
    const staticSponsor = staticById.get(item.id);
    const logo =
      (staticSponsor && isUsableStaticAsset(staticSponsor.logo) ? staticSponsor.logo : undefined) ??
      (isUsableStaticAsset(item.logo) ? item.logo : undefined) ??
      staticSponsor?.logo ??
      item.logo;
    return { ...item, logo };
  });
}

export const sponsorsWithPublicLogos = withPublicSponsorLogos(sponsors);
