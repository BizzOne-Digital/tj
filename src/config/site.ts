export const siteConfig = {
  name: "Mounties Youth Basketball",
  shortName: "Mounties Youth Basketball",
  description:
    "Philipsburg-Osceola Mountaineer Elementary Basketball Program serving Central Pennsylvania youth basketball with camps, leagues, training, and AAU travel teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mountiesyouthbasketball.com",
  motto: "ONE TEAM. ONE GOAL. ONE PURPOSE.",
  coreValue: "Attitude & Effort",
  headline: "PHILIPSBURG-OSCEOLA MOUNTAINEER ELEMENTARY BASKETBALL PROGRAM",
  quote: {
    text: "The Mountie tradition cannot be entrusted to the weak or timid.",
    author: "Coach Jack Bailey",
  },
  about:
    "Mounties Youth Basketball works hard on and off the court and in the classroom. Players are encouraged to learn, develop their game, support their teammates, and have fun. The program lives by its motto of \"Attitude & Effort\" and believes the team is a family that supports one another wholeheartedly.",
  stateQualifier:
    "The league is an official state qualifier league for the Pennsylvania Middle School Basketball Championship.",
  contact: {
    primaryName: "TJ Anderson",
    primaryEmail: "tjandersty@gmail.com",
    programEmail: "mountiesyouthbasketball@gmail.com",
    phone: "814-500-8613",
    phoneHref: "tel:+18145008613",
    mailingAddress: {
      street: "7410 Sportsman Rd",
      city: "Alexandria",
      state: "PA",
      zip: "16611",
      full: "7410 Sportsman Rd, Alexandria, PA 16611",
    },
    venue: {
      name: "Philipsburg-Osceola Middle School",
      street: "200 Short Street",
      city: "Philipsburg",
      state: "PA",
      zip: "16866",
      full: "200 Short Street, Philipsburg, PA 16866",
    },
  },
  social: {
    instagram: {
      handle: "mountie_basketball_",
      url: "https://www.instagram.com/mountie_basketball_/",
    },
    facebook: {
      handle: "Mounties Youth Basketball",
      url: "https://www.facebook.com/MountiesYouthBasketball",
    },
    x: {
      handle: "@PoBasketball",
      url: "https://x.com/PoBasketball",
    },
  },
  brand: {
    deepNavy: "#071735",
    mountieBlue: "#173E7A",
    electricBlue: "#2E6BFF",
    black: "#05070B",
    white: "#FFFFFF",
    coolGrey: "#AAB2C0",
    lightBg: "#F3F6FA",
  },
} as const;
