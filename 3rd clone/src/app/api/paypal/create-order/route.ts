import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { getCategoryByType, getPlan } from "@/lib/pricing";
import type { PlanTier, VehicleType } from "@/lib/pricing";
import { site } from "@/lib/site";
import { PayPalError, getAccessToken, paypalApiBase, resolveBaseUrl } from "@/lib/paypal";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function orderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ARP-${stamp}-${rand}`;
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const country = String(payload.country ?? "").trim();
  const vin = String(payload.vin ?? "").trim().toUpperCase();
  const vehicleType = String(payload.vehicleType ?? "") as VehicleType;
  const planTier = String(payload.planTier ?? "") as PlanTier;

  if (!name) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (!VIN_RE.test(vin))
    return NextResponse.json(
      { error: "Enter a valid 17-character VIN (letters I, O and Q are not used)." },
      { status: 400 }
    );

  const category = getCategoryByType(vehicleType);
  if (!category)
    return NextResponse.json({ error: "Unknown vehicle type." }, { status: 400 });

  const plan = getPlan(category, planTier);
  if (!plan) return NextResponse.json({ error: "Unknown package." }, { status: 400 });

  const reference = orderNumber();

  try {
    await db.insert(orders).values({
      orderNumber: reference,
      customerName: name,
      customerEmail: email,
      customerPhone: phone || null,
      country: country || null,
      vin,
      vehicleType,
      planTier,
      amount: plan.price.toFixed(2),
      status: "pending",
    });
  } catch (err) {
    console.error("[create-order] db insert failed", err);
    return NextResponse.json(
      { error: "We could not start your order. Please try again." },
      { status: 500 }
    );
  }

  try {
    const token = await getAccessToken();
    const base = resolveBaseUrl(request);
    const back = `type=${vehicleType}&tier=${planTier}`;

    const res = await fetch(`${paypalApiBase()}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "PayPal-Request-Id": reference,
      },
      cache: "no-store",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: reference,
            custom_id: reference,
            description: `${category.singular} ${plan.name} VIN report`,
            amount: { currency_code: "USD", value: plan.price.toFixed(2) },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: site.brand,
              user_action: "PAY_NOW",
              shipping_preference: "NO_SHIPPING",
              // PayPal appends ?token=<orderId>&PayerID=<payer> to this URL.
              return_url: `${base}/checkout?${back}`,
              cancel_url: `${base}/checkout?${back}&cancelled=true`,
            },
          },
        },
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      links?: { rel: string; href: string }[];
      message?: string;
    };

    if (!res.ok || !data.id) {
      console.error("[create-order] paypal error", data);
      return NextResponse.json(
        { error: data.message || "PayPal could not create this order." },
        { status: 502 }
      );
    }

    const approvalUrl = data.links?.find((l) => l.rel === "payer-action" || l.rel === "approve")
      ?.href;

    if (!approvalUrl) {
      return NextResponse.json(
        { error: "PayPal did not return an approval link." },
        { status: 502 }
      );
    }

    return NextResponse.json({ approvalUrl, orderNumber: reference, paypalOrderId: data.id });
  } catch (err) {
    if (err instanceof PayPalError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[create-order] unexpected", err);
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
