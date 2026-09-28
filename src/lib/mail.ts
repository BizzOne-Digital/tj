import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

const PLACEHOLDER_PATTERNS = [
  "your-gmail-app-password",
  "your-email@gmail.com",
  "placeholder",
  "changeme",
];

export function isSmtpConfigured(): boolean {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_APP_PASSWORD?.trim();
  if (!user || !pass) return false;

  const lowerPass = pass.toLowerCase();
  const lowerUser = user.toLowerCase();
  return !PLACEHOLDER_PATTERNS.some(
    (pattern) => lowerPass.includes(pattern) || lowerUser.includes(pattern),
  );
}

function getTransporter() {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP credentials are not configured");
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_APP_PASSWORD!.trim();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

type SendMailOptions = {
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMail({ subject, html, replyTo }: SendMailOptions) {
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.primaryEmail;
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${process.env.SMTP_USER}>`,
    to,
    replyTo,
    subject,
    html,
  });
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildEmailTable(rows: Record<string, string>): string {
  const entries = Object.entries(rows)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#071735;vertical-align:top;">${escapeHtml(key)}</td><td style="padding:8px 12px;color:#05070B;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${entries}</table>`;
}
