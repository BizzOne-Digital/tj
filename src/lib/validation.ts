import { z } from "zod";

export const honeypotField = "website";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(30).optional().or(z.literal("")),
  subject: z.string().min(2, "Subject is required").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  [honeypotField]: z.string().max(0).optional(),
});

export const bookingFormSchema = z.object({
  parentName: z.string().min(2, "Parent/guardian name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required").max(30),
  athleteFirstName: z.string().min(1, "Athlete first name is required").max(50),
  gradeOrAge: z.string().min(1, "Grade or age group is required").max(30),
  trainingType: z.enum(["one-on-one", "small-group"]),
  preferredDays: z.string().min(1, "Preferred days are required").max(200),
  preferredTime: z.string().min(1, "Preferred time range is required").max(100),
  developmentGoals: z.string().min(5, "Development goals are required").max(2000),
  message: z.string().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  [honeypotField]: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BookingFormData = z.infer<typeof bookingFormSchema>;
