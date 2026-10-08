export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  url?: string;
  tier?: "platinum" | "gold" | "silver" | "community";
};

export const sponsors: Sponsor[] = [
  {
    id: "lee-industries",
    name: "Lee Industries",
    logo: "/sponsors/lee-industries.png",
    tier: "gold",
  },
  {
    id: "nittany-energy",
    name: "Nittany Energy",
    logo: "/sponsors/nittany-energy.png",
    tier: "gold",
  },
  {
    id: "pa-warhawks",
    name: "PA Warhawks",
    logo: "/sponsors/pa-warhawks.png",
    tier: "gold",
  },
];

export const sponsorsNote =
  "Thank you to our community sponsors who support Mounties Youth Basketball and our student-athletes.";
