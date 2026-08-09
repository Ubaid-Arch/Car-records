import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { PayPalError, getAccessToken, paypalApiBase } from "@/lib/paypal";

type CaptureResponse = {
  id?: string;
  status?: string;
  message?: string;
  details?: { issue?: string; description?: string }[];
  purchase_units?: {
    reference_id?: string;
    custom_id?: string;
    payments?: { captures?: { id?: string; status?: string }[] };
  }[];
};

export async function POST(request: Request) {
  let body: { orderId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const orderId = String(body.orderId ?? "").trim();
  if (!orderId) {
    return NextResponse.json({ error: "Missing PayPal order id." }, { status: 400 });
  }

  try {
    const token = await getAccessToken();

    const res = await fetch(`${paypalApiBase()}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = (await res.json().catch(() => ({}))) as CaptureResponse;

    // Already captured (e.g. the user refreshed the return URL) — treat as success.
    const alreadyCaptured = data.details?.some((d) => d.issue === "ORDER_ALREADY_CAPTURED");

    if (!res.ok && !alreadyCaptured) {
      console.error("[capture-order] paypal error", data);
      return NextResponse.json(
        { error: data.message || "PayPal could not capture this payment." },
        { status: 502 }
      );
    }

    const unit = data.purchase_units?.[0];
    const reference = unit?.reference_id || unit?.custom_id;
    const captureId = unit?.payments?.captures?.[0]?.id ?? null;

    let record:
      | { orderNumber: string; customerEmail: string }
      | undefined;

    if (reference) {
      const updated = await db
        .update(orders)
        .set({
          status: "completed",
          paypalOrderId: orderId,
          paypalCaptureId: captureId,
          reportGenerated: true,
          updatedAt: new Date(),
        })
        .where(eq(orders.orderNumber, reference))
        .returning({
          orderNumber: orders.orderNumber,
          customerEmail: orders.customerEmail,
        });
      record = updated[0];
    }

    if (!record && alreadyCaptured) {
      const existing = await db
        .select({ orderNumber: orders.orderNumber, customerEmail: orders.customerEmail })
        .from(orders)
        .where(eq(orders.paypalOrderId, orderId))
        .limit(1);
      record = existing[0];
    }

    return NextResponse.json({
      success: true,
      orderNumber: record?.orderNumber ?? reference ?? orderId,
      email: record?.customerEmail ?? "",
      captureId,
    });
  } catch (err) {
    if (err instanceof PayPalError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[capture-order] unexpected", err);
    return NextResponse.json(
      { error: "We could not confirm your payment. Please contact support." },
      { status: 500 }
    );
  }
}
