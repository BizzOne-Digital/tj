import { buildEmailTable, isSmtpConfigured, sendMail } from "@/lib/mail";
import { isMongoConfigured, saveBookingSubmission, saveContactSubmission } from "@/lib/form-submissions";
import type { BookingFormData, ContactFormData } from "@/lib/validation";

type DeliveryResult = { method: "email" | "database" };

function noDeliveryConfigured(): boolean {
  return !isSmtpConfigured() && !isMongoConfigured();
}

export function isDeliveryConfigured(): boolean {
  return !noDeliveryConfigured();
}

export async function deliverContactMessage(data: ContactFormData): Promise<DeliveryResult> {
  if (noDeliveryConfigured()) {
    throw new Error("SMTP credentials are not configured");
  }

  if (isSmtpConfigured()) {
    try {
      await sendMail({
        subject: `[Contact] ${data.subject}`,
        replyTo: data.email,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#071735;border-bottom:3px solid #2E6BFF;padding-bottom:8px;">New Contact Form Submission</h2>
            ${buildEmailTable({
              Name: data.name,
              Email: data.email,
              Phone: data.phone || "Not provided",
              Subject: data.subject,
              Message: data.message,
            })}
          </div>
        `,
      });
      return { method: "email" };
    } catch (error) {
      console.error("Contact SMTP error:", error);
      if (!isMongoConfigured()) throw error;
    }
  }

  await saveContactSubmission(data);
  return { method: "database" };
}

export async function deliverBookingMessage(data: BookingFormData): Promise<DeliveryResult> {
  if (noDeliveryConfigured()) {
    throw new Error("SMTP credentials are not configured");
  }

  if (isSmtpConfigured()) {
    try {
      await sendMail({
        subject: `[Training Request] ${data.athleteFirstName} — ${data.trainingType}`,
        replyTo: data.email,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#071735;border-bottom:3px solid #2E6BFF;padding-bottom:8px;">New Training Request</h2>
            ${buildEmailTable({
              "Parent/Guardian": data.parentName,
              Email: data.email,
              Phone: data.phone,
              "Athlete First Name": data.athleteFirstName,
              "Grade/Age": data.gradeOrAge,
              "Training Type": data.trainingType,
              "Preferred Days": data.preferredDays,
              "Preferred Time": data.preferredTime,
              "Development Goals": data.developmentGoals,
              Message: data.message || "None",
              Consent: "Yes",
            })}
          </div>
        `,
      });
      return { method: "email" };
    } catch (error) {
      console.error("Booking SMTP error:", error);
      if (!isMongoConfigured()) throw error;
    }
  }

  await saveBookingSubmission(data);
  return { method: "database" };
}
