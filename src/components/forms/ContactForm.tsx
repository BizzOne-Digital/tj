"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { buildContactMailto } from "@/lib/contact-mailto";
import { honeypotField } from "@/lib/validation";

type FormStatus = "idle" | "loading" | "success" | "error";

type ContactApiResponse = {
  success?: boolean;
  error?: string;
  useMailto?: boolean;
  mailto?: string;
};

function openMailto(url: string) {
  window.location.href = url;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setMailtoFallback("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const fields = {
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phone ?? ""),
      subject: String(data.subject ?? ""),
      message: String(data.message ?? ""),
    };
    const fallbackMailto = buildContactMailto(fields);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as ContactApiResponse;

      if (json.useMailto && json.mailto) {
        setMailtoFallback(json.mailto);
        setStatus("error");
        setError(json.error || "Could not send online. Use your email app instead.");
        return;
      }

      if (!res.ok) throw new Error(json.error || "Failed to send message");
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
        <h3 className="font-display text-xl font-bold uppercase text-deep-navy">Message Sent</h3>
        <p className="mt-2 text-mountie-blue/80">
          Thank you for reaching out. We will get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-electric-blue hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name={honeypotField}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-deep-navy">Name *</label>
          <input id="name" name="name" required className="form-input" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-deep-navy">Email *</label>
          <input id="email" name="email" type="email" required className="form-input" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-deep-navy">Phone</label>
        <input id="phone" name="phone" type="tel" className="form-input" />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-deep-navy">Subject *</label>
        <input id="subject" name="subject" required className="form-input" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-deep-navy">Message *</label>
        <textarea id="message" name="message" required rows={5} className="form-input resize-y" />
      </div>
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          <p>{error}</p>
          {mailtoFallback && (
            <button
              type="button"
              onClick={() => openMailto(mailtoFallback)}
              className="mt-3 font-semibold text-electric-blue underline"
            >
              Open email app to send message
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        <a
          href={`mailto:${siteConfig.contact.primaryEmail}`}
          className="text-center text-sm font-semibold text-electric-blue hover:underline sm:text-left"
        >
          Or email {siteConfig.contact.primaryEmail}
        </a>
      </div>
    </form>
  );
}
