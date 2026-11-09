export type PricingItem = {
  id: string;
  category: string;
  title: string;
  price: string;
  description?: string;
  grades?: string;
  period?: string;
  expired?: boolean;
  note?: string;
};

export const trainingPricing = {
  title: "One-on-One / Small-Group Training",
  duration: "60 minutes",
  price: "$65 per player",
  frequency: "Twice a week",
  location: "MS Gym",
};

export const selectLeaguePricing = {
  perTeam: "$200 per team",
  additionalTeam: "$150 for additional teams",
};

export const elementaryPricing: PricingItem[] = [
  {
    id: "elementary-general",
    category: "Elementary League",
    title: "Registration Fees",
    price: "Varies by grade and registration period",
    description:
      "Elementary league fees are set by grade level and registration window. Early-registration pricing expires at the deadline each season.",
    note: "Contact the program or check the Elementary League page for current season fees. Expired early-registration pricing is not promoted as active.",
  },
];

export const pricingSections = [
  {
    id: "training",
    title: "Training & Development",
    description: "Private and small-group skill sessions with Coach Anderson.",
    items: [trainingPricing],
    cta: { label: "Request Training", href: "/booking" },
  },
  {
    id: "select",
    title: "P-O Select League",
    description: "Competitive select team league fees.",
    items: [
      { title: "Per Team", price: selectLeaguePricing.perTeam },
      { title: "Additional Team", price: selectLeaguePricing.additionalTeam },
    ],
    cta: { label: "Select Program", href: "/select-program" },
  },
  {
    id: "elementary",
    title: "Elementary Program Fees",
    description: "Fees separated by grade and registration period.",
    items: elementaryPricing,
    cta: { label: "Elementary League", href: "/leagues/elementary" },
  },
];
