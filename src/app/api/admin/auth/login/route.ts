export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin/auth";

// Simple per-instance brute-force throttle (5 failures / 10 min per IP).
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 5;

function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  try {
    const key = clientKey(request);
    const now = Date.now();
    const record = attempts.get(key);
    if (record && now - record.first > WINDOW_MS) attempts.delete(key);
    const current = attempts.get(key);
    if (current && current.count >= MAX_FAILURES) {
      return NextResponse.json(
        { error: "Too many attempts. Try again in a few minutes." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { email?: string; password?: string };
    if (
      typeof body.email !== "string" ||
      typeof body.password !== "string" ||
      !verifyAdminCredentials(body.email, body.password)
    ) {
      attempts.set(key, { count: (current?.count ?? 0) + 1, first: current?.first ?? now });
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    attempts.delete(key);
    const token = createAdminSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
