import { siteConfig } from "@/config/site";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
  email?: string;
  phone?: string;
  quote?: string;
  featured?: boolean;
};

export const staffMembers: StaffMember[] = [
  {
    id: "tj-anderson",
    name: "TJ Anderson",
    role: "Founder & Select Team Head Coach",
    photo: "/staff/tj-anderson.png",
    email: siteConfig.contact.primaryEmail,
    phone: siteConfig.contact.phone,
    featured: true,
  },
  {
    id: "booster-club",
    name: "2025–26 Booster Club",
    role: "P-O Youth Basketball",
    photo: "/staff/booster-club-2025-26.png",
    featured: true,
  },
  {
    id: "coach-max",
    name: "Coach Max",
    role: "Pre-K Grade Coach",
    photo: "/staff/coach-max.png",
  },
  {
    id: "coach-richards",
    name: "Coach Richards",
    role: "3rd–6th Grade Coach",
    photo: "/staff/coach-richards.png",
  },
  {
    id: "coach-kelly",
    name: "Coach Kelly",
    role: "3rd–6th Grade Coach",
    photo: "/staff/coach-kelly.png",
  },
  {
    id: "coach-stodart",
    name: "Coach Stodart",
    role: "3rd–6th Grade Coach",
    photo: "/staff/coach-stodart.png",
  },
  {
    id: "coaches-moul-patterson",
    name: "Coach Moul & Coach Patterson",
    role: "3rd–6th Grade Coaches",
    photo: "/staff/coaches-moul-patterson.png",
  },
  {
    id: "coach-pletcher",
    name: "Coach Pletcher",
    role: "1st–2nd Grade Coach",
    photo: "/staff/coach-pletcher.png",
  },
  {
    id: "coach-mills",
    name: "Coach Mills",
    role: "3rd–6th Grade Coach",
    photo: "/staff/coach-mills.png",
  },
  {
    id: "coach-cuneo",
    name: "Coach Cuneo",
    role: "3rd–6th Grade Coach",
    photo: "/staff/coach-cuneo.png",
  },
];

export const staffQuote = {
  author: "Coach Jack Bailey",
  text: "The Mountie tradition cannot be entrusted to the weak or timid.",
};
