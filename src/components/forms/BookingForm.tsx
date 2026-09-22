"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { buildBookingMailto } from "@/lib/contact-mailto";
import { honeypotField } from "@/lib/validation";

type FormStatus = "idle" | "loading" | "success" | "error";

type BookingApiResponse = {
  success?: boolean;
  error?: string;
  useMailto?: boolean;
  mailto?: string;
};

function openMailto(url: string) {
  window.location.href = url;
}

function getFormFields(form: HTMLFormElement) {
  const formData = new FormData(form);
  return {
    parentName: String(formData.get("parentName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    athleteFirstName: String(formData.get("athleteFirstName") ?? ""),
    gradeOrAge: String(formData.get("gradeOrAge") ?? ""),
    trainingType: String(formData.get("trainingType") ?? ""),
    preferredDays: String(formData.get("preferredDays") ?? ""),
    preferredTime: String(formData.get("preferredTime") ?? ""),
    developmentGoals: String(formData.get("developmentGoals") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

export function BookingForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setMailtoFallback("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.consent = formData.get("consent") === "on" ? "true" : "false";
    data.trainingType = formData.get("trainingType") as string;

    const fields = getFormFields(form);
    const fallbackMailto = buildBookingMailto(fields);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as BookingApiResponse;

      if (json.useMailto && json.mailto) {
        setMailtoFallback(json.mailto);
        setStatus("error");
        setError(json.error || "Could not submit online. Use your email app instead.");
        return;
      }

      if (!res.ok) throw new Error(json.error || "Failed to submit request");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMailtoFallback(fallbackMailto);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-mountie-blue/10 p-8 text-center">
        <h3 className="font-display text-xl font-bold uppercase text-deep-navy">Request Received</h3>
        <p className="mt-2 text-mountie-blue/80">
          Your request has been received. Coach Anderson will contact you to confirm availability.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-electric-blue hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name={honeypotField} tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="mb-1.5 block text-sm font-semibold text-deep-navy">Parent/Guardian Name *</label>
          <input id="parentName" name="parentName" required className="form-input" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-deep-navy">Email *</label>
          <input id="email" name="email" type="email" required className="form-input" />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-deep-navy">Phone *</label>
          <input id="phone" name="phone" type="tel" required className="form-input" />
        </div>
        <div>
          <label htmlFor="athleteFirstName" className="mb-1.5 block text-sm font-semibold text-deep-navy">Athlete First Name *</label>
          <input id="athleteFirstName" name="athleteFirstName" required className="form-input" />
        </div>
      </div>

      <div>
        <label htmlFor="gradeOrAge" className="mb-1.5 block text-sm font-semibold text-deep-navy">Grade or Age Group *</label>
        <input id="gradeOrAge" name="gradeOrAge" required className="form-input" />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-deep-navy">Training Type *</legend>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="trainingType" value="one-on-one" required className="accent-electric-blue" />
            One-on-One
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="trainingType" value="small-group" required className="accent-electric-blue" />
            Small Group
          </label>
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="preferredDays" className="mb-1.5 block text-sm font-semibold text-deep-navy">Preferred Days *</label>
          <input id="preferredDays" name="preferredDays" required placeholder="e.g. Monday, Wednesday" className="form-input" />
        </div>
        <div>
          <label htmlFor="preferredTime" className="mb-1.5 block text-sm font-semibold text-deep-navy">Preferred Time Range *</label>
          <input id="preferredTime" name="preferredTime" required placeholder="e.g. 5:00 PM - 7:00 PM" className="form-input" />
        </div>
      </div>

      <div>
        <label htmlFor="developmentGoals" className="mb-1.5 block text-sm font-semibold text-deep-navy">Development Goals *</label>
        <textarea id="developmentGoals" name="developmentGoals" required rows={3} className="form-input resize-y" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-deep-navy">Additional Message</label>
        <textarea id="message" name="message" rows={3} className="form-input resize-y" />
      </div>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="consent" required className="mt-1 accent-electric-blue" />
        <span className="text-sm text-mountie-blue/80">
          I consent to being contacted about training availability. I understand this is a request, not a confirmed appointment. *
        </span>
      </label>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          <p>{error}</p>
          {mailtoFallback && (
            <button
              type="button"
              onClick={() => openMailto(mailtoFallback)}
              className="mt-3 font-semibold text-electric-blue underline"
            >
              Open email app to send training request
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
          {status === "loading" ? "Submitting..." : "Request Training"}
        </button>
        <a
          href={`mailto:${siteConfig.contact.primaryEmail}?subject=${encodeURIComponent("[Training Request]")}`}
          className="text-center text-sm font-semibold text-electric-blue hover:underline sm:text-left"
        >
          Or email {siteConfig.contact.primaryEmail}
        </a>
      </div>
    </form>
  );
}
