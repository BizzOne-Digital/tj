/** Sellable gear with limited quantity — synced to MongoDB when CMS is available. */
export type GearProduct = {
  id: string;
  name: string;
  description: string;
  /** Price in USD cents (e.g. 2100 = $21.00). Use 0 for “contact for price”. */
  priceCents: number;
  /** Optional display override (e.g. "From $25.00") */
  priceLabel?: string;
  image: string;
  /** Additional product photos (e.g. back view). */
  images?: string[];
  quantityInStock: number;
  published: boolean;
  order: number;
};

const img = (file: string) => `/images/gear-for-sale/${file}`;

/** Seed catalog — edit in Admin → Mountie Gear, or add items here and deploy. */
export const gearProductsSeed: GearProduct[] = [
  {
    id: "2025-po-spring-league-champs-tee",
    name: "2025 PO Spring League Champs",
    description:
      "Gray t-shirt with championship logo.\n\nAvailable:\n• 1 — Adult Medium\n• 1 — Adult Large\n• 1 — Adult XL",
    priceCents: 0,
    image: img("spring-league-champs.jpg"),
    quantityInStock: 3,
    published: true,
    order: 1,
  },
  {
    id: "navy-pants",
    name: "Navy Pants",
    description:
      "Navy athletic pants with Mounties branding.\n\nAvailable:\n• 1 — Adult Small #16\n• 1 — Adult Small #22\n• 1 — Adult 2XL #40",
    priceCents: 0,
    image: img("navy-pants.jpg"),
    quantityInStock: 3,
    published: true,
    order: 2,
  },
  {
    id: "navy-zip-up",
    name: "Navy Zip-up",
    description:
      "Navy full-zip jacket with Mounties Basketball graphics.\n\nAvailable:\n• Youth Large — #3, #4 (1 each)\n• Youth XL — #8, #10 (1 each)\n• Adult Small — #12, #13, #14, #15, #16 (1 each)\n• Adult Medium — #19, #20, #23, #24, #25 (1 each)\n• Adult Large — #23, #26, #27, #29 (1 each)\n• Adult XL — #35, #37, #38 (1 each)",
    priceCents: 0,
    image: img("navy-zip-up-front.jpg"),
    images: [img("navy-zip-up-back.jpg")],
    quantityInStock: 21,
    published: true,
    order: 3,
  },
  {
    id: "nike-backpack-black",
    name: "Nike Backpack, Black",
    description: "Black Nike backpack with large front pocket and side mesh holders.\n\nAvailable: 4",
    priceCents: 0,
    image: img("nike-backpack-front.jpg"),
    images: [img("nike-backpack-back.jpg")],
    quantityInStock: 4,
    published: true,
    order: 4,
  },
  {
    id: "coaches-shorts-25-26",
    name: "Dark Gray Shorts (25–26 Coaches Set)",
    description: "Dark gray shorts from the 2025–26 coaches set.\n\nAvailable:\n• 2 — Size 4XL",
    priceCents: 0,
    image: img("coaches-shorts-4xl.jpg"),
    quantityInStock: 2,
    published: true,
    order: 5,
  },
  {
    id: "coaches-tee-25-26",
    name: "Dark Gray T-Shirt (25–26 Coaches Set)",
    description:
      "Dark gray short-sleeve tee with Philipsburg-Osceola Mountie print.\n\nAvailable:\n• 2 — Size 4XL",
    priceCents: 0,
    image: img("coaches-tee-4xl.jpg"),
    quantityInStock: 2,
    published: true,
    order: 6,
  },
  {
    id: "coaches-sweatpants-25-26",
    name: "Dark Gray Sweatpants (25–26 Coaches Set)",
    description: "Dark gray Nike sweatpants from the 2025–26 coaches set.\n\nAvailable:\n• 1 — Size 4XL",
    priceCents: 0,
    image: img("coaches-sweatpants-4xl.jpg"),
    quantityInStock: 1,
    published: true,
    order: 7,
  },
  {
    id: "coaches-sweatsuit-25-26",
    name: "Dark Gray Sweatsuit (25–26 Coaches Set)",
    description:
      "Matching sweatshirt and sweatpants set (same Mountie print as the dark gray tees and long sleeves). Photos show the tee style; set is sweatshirt + pants.\n\nAvailable:\n• 1 — Size 4XL",
    priceCents: 0,
    image: img("coaches-tee-4xl.jpg"),
    quantityInStock: 1,
    published: true,
    order: 8,
  },
  {
    id: "coaches-long-sleeve-25-26",
    name: "Dark Gray Long Sleeve T-Shirt (25–26 Coaches Set)",
    description:
      "Dark gray long-sleeve tee with Philipsburg-Osceola Mountie print.\n\nAvailable:\n• 2 — Size 4XL",
    priceCents: 0,
    image: img("coaches-long-sleeve-4xl.jpg"),
    quantityInStock: 2,
    published: true,
    order: 9,
  },
  {
    id: "gray-navy-sweatshirt",
    name: "Gray Sweatshirt with Navy Sleeves",
    description:
      "Jordan hooded sweatshirt — gray body, navy sleeves, Mountaineer Basketball back graphic.\n\nAvailable:\n• 1 — Adult Large #1",
    priceCents: 0,
    image: img("gray-navy-hoodie-front.jpg"),
    images: [img("gray-navy-hoodie-back.jpg")],
    quantityInStock: 1,
    published: true,
    order: 10,
  },
];

export const gearLowStockThreshold = 3;
