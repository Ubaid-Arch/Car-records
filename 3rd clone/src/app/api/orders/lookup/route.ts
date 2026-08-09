import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { orderNumber?: string; email?: string };
    const orderNumber = String(body.orderNumber ?? "").trim().toUpperCase();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!orderNumber) {
      return NextResponse.json({ error: "Order number is required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const rows = await db
      .select({
        orderNumber: orders.orderNumber,
        customerName: orders.customerName,
        vin: orders.vin,
        vehicleType: orders.vehicleType,
        planTier: orders.planTier,
        amount: orders.amount,
        status: orders.status,
        reportGenerated: orders.reportGenerated,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(and(eq(orders.orderNumber, orderNumber), eq(orders.customerEmail, email)))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No order matches that order number and email combination." },
        { status: 404 }
      );
    }

    return NextResponse.json({ order: rows[0] });
  } catch (err) {
    console.error("[orders/lookup] failed", err);
    return NextResponse.json(
      { error: "We could not look up that order. Please try again." },
      { status: 500 }
    );
  }
}
