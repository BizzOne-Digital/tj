export type PoBasketballNewsletterIssue = {
  issue: number;
  title: string;
  filename: string;
};

/** PDFs live in `public/newsletters/`. */
export const poBasketballNewsletters: PoBasketballNewsletterIssue[] = [
  {
    issue: 1,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 1",
    filename: "PO_Dribble_Drive_Coaches_Newsletter.pdf",
  },
  {
    issue: 2,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 2",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-2.pdf",
  },
  {
    issue: 3,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 3",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-3.pdf",
  },
  {
    issue: 4,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 4",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-4.pdf",
  },
  {
    issue: 5,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 5",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-5.pdf",
  },
  {
    issue: 6,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 6",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-6.pdf",
  },
];

export function newsletterPdfHref(filename: string): string {
  return `/newsletters/${encodeURIComponent(filename)}`;
}
