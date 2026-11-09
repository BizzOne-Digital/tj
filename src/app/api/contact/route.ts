import { NextRequest, NextResponse } from "next/server";
import { buildContactMailto } from "@/lib/contact-mailto";
import { deliverContactMessage, isDeliveryConfigured } from "@/lib/deliver-form";
import { contactFormSchema, honeypotField, type ContactFormData } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let parsedData: ContactFormData | undefined;

  try {
    const body = await request.json();

    if (body[honeypotField]) {
      return NextResponse.json({ success: true });
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid form data" },
        { status: 400 },
      );
    }

    parsedData = parsed.data;

    if (!isDeliveryConfigured()) {
      return NextResponse.json({
        success: false,
        useMailto: true,
        mailto: buildContactMailto(parsed.data),
        error: "Online delivery is not configured yet. Use your email app to send this message.",
      });
    }

    await deliverContactMessage(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    const message =
      error instanceof Error && error.message.includes("SMTP")
        ? "Email service is not configured. Open your email app to send this message."
        : "Could not send online. Open your email app to send this message.";
    return NextResponse.json(
      {
        error: message,
        useMailto: true,
        mailto: parsedData ? buildContactMailto(parsedData) : undefined,
      },
      { status: 500 },
    );
  }
}
