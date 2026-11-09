import { siteConfig } from "@/config/site";

type ContactMailtoFields = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

type BookingMailtoFields = {
  parentName: string;
  email: string;
  phone: string;
  athleteFirstName: string;
  gradeOrAge: string;
  trainingType: string;
  preferredDays: string;
  preferredTime: string;
  developmentGoals: string;
  message?: string;
};

const trainingTypeLabels: Record<string, string> = {
  "one-on-one": "One-on-One",
  "small-group": "Small Group",
};

export function buildContactMailto(
  data: ContactMailtoFields,
  to = siteConfig.contact.primaryEmail,
): string {
  const subject = encodeURIComponent(`[Contact] ${data.subject}`);
  const body = encodeURIComponent(
    [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone?.trim() || "Not provided"}`,
      "",
      data.message,
    ].join("\n"),
  );

  return `mailto:${to}?subject=${subject}&body=${body}`;
}

export function buildBookingMailto(
  data: BookingMailtoFields,
  to = siteConfig.contact.primaryEmail,
): string {
  const trainingLabel = trainingTypeLabels[data.trainingType] ?? data.trainingType;
  const subject = encodeURIComponent(
    `[Training Request] ${data.athleteFirstName} — ${trainingLabel}`,
  );
  const body = encodeURIComponent(
    [
      "Training Request",
      "",
      `Parent/Guardian: ${data.parentName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Athlete First Name: ${data.athleteFirstName}`,
      `Grade/Age: ${data.gradeOrAge}`,
      `Training Type: ${trainingLabel}`,
      `Preferred Days: ${data.preferredDays}`,
      `Preferred Time: ${data.preferredTime}`,
      `Development Goals: ${data.developmentGoals}`,
      `Additional Message: ${data.message?.trim() || "None"}`,
      "",
      "Consent: Yes — I agree to be contacted about training availability.",
    ].join("\n"),
  );

  return `mailto:${to}?subject=${subject}&body=${body}`;
}
