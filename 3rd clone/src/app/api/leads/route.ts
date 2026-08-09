import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      vin?: string;
      email?: string;
      country?: string;
    };

    const vin = String(body.vin ?? "").trim().toUpperCase();
    const email = String(body.email ?? "").trim();
    const country = String(body.country ?? "").trim();

    if (!VIN_RE.test(vin) || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid VIN or email." }, { status: 400 });
    }

    await db.insert(leads).values({ vin, email, country: country || null });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads] failed", err);
    // Lead capture must never block checkout.
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
