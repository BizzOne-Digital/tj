export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const faqs: FAQ[] = [
  {
    id: "contact",
    category: "General",
    question: "Who should I contact with questions?",
    answer:
      "Reach TJ Anderson at tjandersty@gmail.com or 814-500-8613. For general program inquiries, you may also email mountiesyouthbasketball@gmail.com.",
  },
  {
    id: "venue-vs-mailing",
    category: "General",
    question: "What is the difference between the mailing address and game venue?",
    answer:
      "Mail correspondence goes to 7410 Sportsman Rd, Alexandria, PA 16611. Games and practices are held at Philipsburg-Osceola Middle School, 200 Short Street, Philipsburg, PA 16866.",
  },
  {
    id: "state-qualifier",
    category: "Leagues",
    question: "Is this an official state qualifier league?",
    answer:
      "Yes. Mounties Youth Basketball is an official state qualifier league for the Pennsylvania Middle School Basketball Championship.",
  },
  {
    id: "training-cost",
    category: "Training",
    question: "How much does training cost?",
    answer:
      "One-on-one and small-group training is $65 per player for 60-minute sessions, held twice a week at the MS Gym. Submit a request on the booking page — Coach Anderson will confirm availability.",
  },
  {
    id: "little-dribblers",
    category: "Programs",
    question: "What is Little Dribblers?",
    answer:
      "Little Dribblers is a fundamentals program for grades K–2 with five Saturday development sessions. Participation is free where applicable. Current dates are posted on the Little Dribblers page.",
  },
  {
    id: "select-pricing",
    category: "Select Program",
    question: "What are Select League fees?",
    answer:
      "Select League pricing is $200 per team and $150 for additional teams. See the Select Program and Pricing pages for details.",
  },
  {
    id: "gear",
    category: "Gear",
    question: "Where can I buy Mountie gear?",
    answer:
      "Limited Mountie gear is listed on the Mountie Gear For Sale page (quantities update as items sell). Official team apparel is also available through our Game One team store on the Gear Store page.",
  },
  {
    id: "registration",
    category: "Registration",
    question: "How do I register for a program?",
    answer:
      "Registration links are posted on each program page when open. Expired registration periods are not promoted. Contact the program if you need help finding current registration.",
  },
];
