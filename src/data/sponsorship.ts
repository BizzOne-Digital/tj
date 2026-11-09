import { siteConfig } from "@/config/site";

export const sponsorshipProgram = {
  title: "Team Sponsorship",
  organization: "Philipsburg-Osceola Little League Basketball (LLB)",
  greeting:
    "Dear Philipsburg-Osceola Little League Basketball (LLB) Team Sponsor,",
  intro: [
    "LLB provides an opportunity for children ages 5 through 12 to learn the fundamentals of basketball and to build pride, sportsmanship, and a healthy self-esteem. We promote teamwork, communication, and community involvement.",
    "LLB has several events already scheduled for the year and plan on making our Varsity Game Night festivities bigger than ever before. We will be focusing on the P-O Tradition and history of Little League basketball in our community.",
    "We have already begun preparations for the 2026 basketball season and would like to invite your business the opportunity for a team sponsorship. Please help us continue this tradition through your generous sponsorship. By sponsoring our league, your business will gain visibility with over 200 families and friends of the LLB.",
    "Our annual fundraiser is scheduled for January 2026 at the Columbia Firehall. As part of your sponsorship, you will be recognized during the event. We will also place a complimentary advertisement for your company in our Varsity Basketball Game Program for this season.",
  ],
  contactNote:
    "Should you have any questions, please feel free to contact me at the phone or email below.",
  closing: [
    "We appreciate your continued support and hope that you will continue to support the youth of the area.",
    "Sincerely,",
    "Coach TJ Anderson",
  ],
  contact: {
    phone: siteConfig.contact.phone,
    phoneHref: siteConfig.contact.phoneHref,
    email: siteConfig.contact.primaryEmail,
  },
  tiers: [
    {
      id: "team-sponsor",
      title: "Team Sponsor",
      amount: "$500.00",
      benefits: [
        "Company name and logo on team uniform",
        "Recognition during varsity basketball games",
        "Plaque of appreciation with team photo",
      ],
    },
    {
      id: "uniform-logo",
      title: "Uniform Logo Display — Elementary Level",
      amount: "$150.00",
      benefits: ["Your logo will be placed on the uniforms of 3rd–6th grade teams"],
    },
    {
      id: "donation",
      title: "Sponsor Donations",
      amount: "Choose one",
      description:
        "This is a fee that will help the program with equipment, referees, league fees, and more.",
      options: ["$25", "$50", "$100"],
    },
  ],
  mailing: {
    label: "Mail this form and check to",
    addressee: "Philipsburg-Osceola Mounties Youth Basketball",
    address: siteConfig.contact.mailingAddress.full,
  },
  logoSubmission: {
    label: "For Uniform Display Sponsorships",
    instruction:
      "Please email your company logo and colors (JPEG) to the program contact below.",
    email: siteConfig.contact.primaryEmail,
  },
  deadline:
    "Sponsor information and fee/donation will be due no later than September 29, 2025 for uniform production time.",
  taxId: "90-1673993",
  formFields: [
    "Business",
    "Contact",
    "Phone",
    "Email",
    "Address",
  ],
};
