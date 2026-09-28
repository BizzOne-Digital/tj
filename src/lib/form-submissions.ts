import type { BookingFormData, ContactFormData } from "@/lib/validation";
import { getDb } from "@/lib/db";

function isMongoConfigured(): boolean {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;
  return !uri.includes("<db_") && !uri.includes("xxxxx");
}

export async function saveContactSubmission(data: ContactFormData) {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured");
  }

  const db = await getDb();
  await db.collection("contact_submissions").insertOne({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject,
    message: data.message,
    createdAt: new Date(),
    source: "contact-form",
  });
}

export async function saveBookingSubmission(data: BookingFormData) {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured");
  }

  const db = await getDb();
  await db.collection("booking_submissions").insertOne({
    ...data,
    createdAt: new Date(),
    source: "booking-form",
  });
}

export { isMongoConfigured };
