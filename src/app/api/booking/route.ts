import { NextRequest, NextResponse } from "next/server";
import { buildBookingMailto } from "@/lib/contact-mailto";
import { deliverBookingMessage, isDeliveryConfigured } from "@/lib/deliver-form";
import { bookingFormSchema, honeypotField, type BookingFormData } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let parsedData: BookingFormData | undefined;

  try {
    const body = await request.json();

    if (body[honeypotField]) {
      return NextResponse.json({ success: true });
    }

    const data = {
      ...body,
      consent: body.consent === true || body.consent === "true",
    };

    const parsed = bookingFormSchema.safeParse(data);
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
        mailto: buildBookingMailto(parsed.data),
        error: "Online delivery is not configured yet. Use your email app to send this request.",
      });
    }

    await deliverBookingMessage(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking form error:", error);
    const message =
      error instanceof Error && error.message.includes("SMTP")
        ? "Email service is not configured. Open your email app to send this request."
        : "Could not submit online. Open your email app to send this request.";
    return NextResponse.json(
      {
        error: message,
        useMailto: true,
        mailto: parsedData ? buildBookingMailto(parsedData) : undefined,
      },
      { status: 500 },
    );
  }
}
