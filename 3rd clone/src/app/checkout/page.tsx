"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Loader2,
  Lock,
  ShieldCheck,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { getCategoryByType, getPlan, type PlanTier, type VehicleType } from "@/lib/pricing";
import { countries } from "@/lib/site";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Placeholder sandbox client ID configuration variable as requested
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";

type Stage = "form" | "redirecting" | "capturing" | "done" | "error";

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();

  const vehicleType = (params.get("type") || "car") as VehicleType;
  const planTier = (params.get("tier") || "standard") as PlanTier;

  const category = useMemo(() => getCategoryByType(vehicleType), [vehicleType]);
  const plan = useMemo(
    () => (category ? getPlan(category, planTier) : undefined),
    [category, planTier]
  );

  const [form, setForm] = useState({
    name: "",
    email: params.get("email") ?? "",
    phone: "",
    country: params.get("country") ?? "United States (US)",
    address1: "",
    address2: "",
    city: "",
    state: "California",
    zip: "",
    notes: "",
    vin: (params.get("vin") ?? "").toUpperCase(),
  });

  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card">("paypal");
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [stage, setStage] = useState<Stage>("form");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState<{ orderNumber: string; email: string } | null>(null);

  const cancelled = params.get("cancelled") === "true";
  const returnToken = params.get("token");

  const capture = useCallback(async (token: string) => {
    setStage("capturing");
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: token }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        orderNumber?: string;
        email?: string;
        error?: string;
      };
      if (!res.ok || !data.success) throw new Error(data.error || "We could not confirm the payment.");
      setReceipt({ orderNumber: data.orderNumber ?? "—", email: data.email ?? "" });
      setStage("done");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "We could not confirm the payment.");
      setStage("error");
    }
  }, []);

  useEffect(() => {
    if (returnToken) void capture(returnToken);
  }, [returnToken, capture]);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handlePay(mode: "paypal" | "paylater") {
    if (!plan || !category) return;

    const next: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.vin.trim()) next.vin = "Please enter the VIN.";
    else if (!VIN_RE.test(form.vin.trim().toUpperCase()))
      next.vin = "Enter a valid 17-character VIN (no I, O or Q).";
    if (!form.country) next.country = "Please select your country.";
    if (!form.address1.trim()) next.address1 = "Street address is required.";
    if (!form.city.trim()) next.city = "Town / City is required.";
    if (!form.zip.trim()) next.zip = "ZIP Code is required.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setStage("redirecting");
    setMessage("");
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country,
          vin: form.vin.trim().toUpperCase(),
          vehicleType,
          planTier,
          mode,
          clientId: PAYPAL_CLIENT_ID,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        approvalUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.approvalUrl)
        throw new Error(
          data.error || "Payment is temporarily unavailable. Please try again shortly."
        );
      window.location.href = data.approvalUrl;
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStage("error");
    }
  }

  if (!category || !plan) {
    return (
      <section className="bg-[#f8f9fa] py-24">
        <div className="mx-auto max-w-md px-5 text-center">
          <AlertCircle size={44} className="mx-auto text-[#dc2626]" />
          <h1 className="mt-4 text-[24px] font-bold text-[#121619]">
            That package doesn&apos;t exist
          </h1>
          <p className="mt-2 text-[14.5px] text-[#495057]">
            The vehicle type or plan in the link isn&apos;t valid. Pick a package to continue.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block rounded-md bg-[#0f5132] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white hover:bg-[#157347]"
          >
            View packages
          </Link>
        </div>
      </section>
    );
  }

  if (stage === "capturing") {
    return (
      <section className="bg-[#f8f9fa] py-28">
        <div className="mx-auto max-w-md px-5 text-center">
          <Loader2 size={38} className="mx-auto animate-spin text-[#198754]" />
          <p className="mt-5 text-[15.5px] font-semibold text-[#121619]">
            Confirming your payment…
          </p>
          <p className="mt-1.5 text-[14px] text-[#64748b]">
            Please don&apos;t close this window.
          </p>
        </div>
      </section>
    );
  }

  if (stage === "done" && receipt) {
    return (
      <section className="bg-[#f8f9fa] py-16">
        <div className="mx-auto max-w-lg px-5">
          <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 text-center shadow-modern-soft">
            <CheckCircle2 size={48} className="mx-auto text-[#198754]" />
            <h1 className="mt-4 text-[26px] font-bold tracking-[-0.02em] text-[#121619]">
              Payment complete
            </h1>
            <p className="mt-2 text-[14.5px] leading-relaxed text-[#495057]">
              Your report is being compiled and will be emailed as a PDF within{" "}
              {plan.deliveryTime}.
            </p>

            <div className="mt-7 rounded-lg bg-[#f8f9fa] border border-[#e2e8f0] p-5 text-left">
              <p className="eyebrow text-[#198754]">Order number</p>
              <p className="mt-1 font-mono text-[18px] font-bold text-[#121619]">
                {receipt.orderNumber}
              </p>
              <dl className="mt-4 divide-y divide-[#e2e8f0] text-[14px]">
                {[
                  ["Vehicle", category.singular],
                  ["Package", plan.name],
                  ["Amount paid", `$${plan.price.toFixed(2)} USD`],
                  ["Delivery", `Within ${plan.deliveryTime}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-[#64748b]">{k}</dt>
                    <dd className="font-bold text-[#121619]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-5 text-[13.5px] text-[#64748b]">
              Keep this order number — you can use it on the{" "}
              <Link href="/orders" className="font-semibold text-[#198754] hover:underline">
                order lookup page
              </Link>{" "}
              at any time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const busy = stage === "redirecting";

  return (
    <>
      <section className="bg-[#121619] py-12 border-b border-[#2c3237]">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow text-[#198754]">Express Checkout</p>
          <h1 className="mt-2 text-[30px] font-bold tracking-[-0.02em] text-white sm:text-[38px] text-shadow-none">
            Checkout
          </h1>
          <div className="mt-3 flex items-center gap-2 text-[13.5px] text-[#adb5bd]">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>&raquo;</span>
            <Link href="/cart" className="hover:text-white">Checkout</Link>
            <span>&raquo;</span>
            <span className="text-white font-semibold">Express Checkout</span>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-14">
        <div className="mx-auto max-w-6xl px-5">
          {cancelled && (
            <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#ffeeba] bg-[#fffbf0] p-4 text-[#856404]">
              <AlertCircle size={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-[14.5px]">Payment cancelled</p>
                <p className="text-[13.5px]">You cancelled the PayPal checkout session. No charges were made.</p>
              </div>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            {/* Main Form & Payment Options */}
            <div className="space-y-8">
              <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
                <h2 className="text-[20px] font-bold text-[#121619]">Billing details</h2>

                <div className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="eyebrow mb-2 block text-[#495057]">
                        First name *
                      </label>
                      <input
                        id="firstName"
                        value={form.name.split(" ")[0] || ""}
                        onChange={(e) => {
                          const rest = form.name.split(" ").slice(1).join(" ");
                          set("name", `${e.target.value} ${rest}`.trim());
                        }}
                        placeholder="John"
                        className={`field border-[#e2e8f0] ${errors.name ? "field-error" : ""}`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="eyebrow mb-2 block text-[#495057]">
                        Last name *
                      </label>
                      <input
                        id="lastName"
                        value={form.name.split(" ").slice(1).join(" ")}
                        onChange={(e) => {
                          const first = form.name.split(" ")[0] || "";
                          set("name", `${first} ${e.target.value}`.trim());
                        }}
                        placeholder="Doe"
                        className="field border-[#e2e8f0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="vin" className="eyebrow mb-2 block text-[#495057]">
                      VIN Number *
                    </label>
                    <input
                      id="vin"
                      value={form.vin}
                      onChange={(e) => set("vin", e.target.value.toUpperCase())}
                      maxLength={17}
                      placeholder="Enter your VIN Number"
                      className={`field font-mono tracking-wide border-[#e2e8f0] ${errors.vin ? "field-error" : ""}`}
                    />
                    {errors.vin && (
                      <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.vin}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="eyebrow mb-2 block text-[#495057]">
                      Country / Region *
                    </label>
                    <select
                      id="country"
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      className="field border-[#e2e8f0]"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="address1" className="eyebrow mb-2 block text-[#495057]">
                      Street address *
                    </label>
                    <input
                      id="address1"
                      value={form.address1}
                      onChange={(e) => set("address1", e.target.value)}
                      placeholder="House number and street name"
                      className={`field border-[#e2e8f0] ${errors.address1 ? "field-error" : ""}`}
                    />
                    {errors.address1 && (
                      <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.address1}</p>
                    )}
                  </div>

                  <div>
                    <input
                      value={form.address2}
                      onChange={(e) => set("address2", e.target.value)}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="field border-[#e2e8f0]"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="eyebrow mb-2 block text-[#495057]">
                        Town / City *
                      </label>
                      <input
                        id="city"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        placeholder="City name"
                        className={`field border-[#e2e8f0] ${errors.city ? "field-error" : ""}`}
                      />
                      {errors.city && (
                        <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="eyebrow mb-2 block text-[#495057]">
                        State *
                      </label>
                      <input
                        id="state"
                        value={form.state}
                        onChange={(e) => set("state", e.target.value)}
                        placeholder="State"
                        className="field border-[#e2e8f0]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="zip" className="eyebrow mb-2 block text-[#495057]">
                        ZIP Code *
                      </label>
                      <input
                        id="zip"
                        value={form.zip}
                        onChange={(e) => set("zip", e.target.value)}
                        placeholder="Postal code"
                        className={`field border-[#e2e8f0] ${errors.zip ? "field-error" : ""}`}
                      />
                      {errors.zip && (
                        <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.zip}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="eyebrow mb-2 block text-[#495057]">
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+1 555 000 0000"
                        className="field border-[#e2e8f0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="eyebrow mb-2 block text-[#495057]">
                      Email address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="john@example.com"
                      className={`field border-[#e2e8f0] ${errors.email ? "field-error" : ""}`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#e2e8f0] pt-6">
                  <h3 className="text-[17px] font-bold text-[#121619]">Additional information</h3>
                  <div className="mt-4">
                    <label htmlFor="notes" className="eyebrow mb-2 block text-[#495057]">
                      Order notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="field border-[#e2e8f0] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section matching requirements */}
              <div className="rounded-xl border border-[#121619] bg-[#121619] p-8 text-white shadow-modern-soft">
                <h3 className="text-[18px] font-bold text-white mb-6">Or continue below</h3>

                <div className="space-y-4">
                  {/* PayPal Radio Option */}
                  <div
                    onClick={() => setPaymentMethod("paypal")}
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      paymentMethod === "paypal"
                        ? "border-[#198754] bg-[#1c2126]"
                        : "border-[#2c3237] bg-[#171b20]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                          className="accent-[#198754] h-4 w-4"
                        />
                        <span className="font-bold text-[15px]">PayPal</span>
                      </div>
                      <span className="font-bold italic text-[#253b80] bg-white px-2 py-0.5 rounded text-xs tracking-tighter">
                        PayPal
                      </span>
                    </div>

                    {paymentMethod === "paypal" && (
                      <div className="mt-4 rounded-md bg-white p-5 text-[#121619] shadow-sm">
                        <div className="flex flex-col items-center justify-center py-2 text-center">
                          <div className="w-12 h-10 border-2 border-dashed border-[#adb5bd] rounded flex items-center justify-center mb-2">
                            <span className="text-lg">↗</span>
                          </div>
                          <p className="text-[13.5px] text-[#495057]">
                            Click a payment option below to process your order.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Credit or Debit Card Radio Option */}
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      paymentMethod === "card"
                        ? "border-[#198754] bg-[#1c2126]"
                        : "border-[#2c3237] bg-[#171b20]"
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="accent-[#198754] h-4 w-4"
                        />
                        <span className="font-bold text-[15px]">Credit or Debit Card</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded text-[11px] font-semibold text-white">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>American Express</span>
                        <span>Discover</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy policy text */}
                <p className="mt-6 text-[13px] leading-relaxed text-[#adb5bd]">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
                  <Link href="/privacy" className="text-[#198754] underline hover:text-[#20c997]">
                    privacy policy
                  </Link>
                  .
                </p>

                {stage === "error" && message && (
                  <p className="mt-4 flex items-start gap-2 rounded-md bg-[#ffeeba] px-4 py-3 text-[13px] text-[#856404]">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    {message}
                  </p>
                )}

                {/* Official Action Buttons Stacked Vertically */}
                <div className="mt-6 space-y-3">
                  {/* PayPal gold button */}
                  <button
                    type="button"
                    onClick={() => handlePay("paypal")}
                    disabled={busy}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#ffc439] hover:bg-[#f0b72f] py-4 px-6 text-[15px] font-bold text-[#121619] transition shadow-sm disabled:opacity-70"
                  >
                    {busy ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span className="font-extrabold italic text-[#003087]">Pay</span>
                        <span className="font-extrabold italic text-[#009cde]">Pal</span>
                      </>
                    )}
                  </button>

                  {/* Pay Later gold button */}
                  <button
                    type="button"
                    onClick={() => handlePay("paylater")}
                    disabled={busy}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#ffc439] hover:bg-[#f0b72f] py-3.5 px-6 text-[14px] font-bold text-[#121619] transition shadow-sm disabled:opacity-70"
                  >
                    {busy ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <span className="font-extrabold italic text-[#009cde]">Pay</span>
                        <span className="font-bold text-[#121619]">Later</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary sidebar */}
            <aside className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft lg:sticky lg:top-24">
              <h2 className="text-[18px] font-bold text-[#121619] pb-4 border-b border-[#e2e8f0]">
                Your order
              </h2>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[#e2e8f0]">
                      <th className="pb-3 font-bold text-[#121619]">Product</th>
                      <th className="pb-3 font-bold text-right text-[#121619]">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    <tr>
                      <td className="py-4 text-[#495057]">
                        {category.singular} {plan.name} Package &times; 1
                      </td>
                      <td className="py-4 text-right font-semibold text-[#121619]">
                        ${plan.price.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[#e2e8f0]">
                      <td className="pt-4 font-bold text-[#121619]">Subtotal</td>
                      <td className="pt-4 text-right font-bold text-[#121619]">
                        ${plan.price.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-t border-[#e2e8f0]">
                      <td className="pt-4 text-[16px] font-bold text-[#121619]">Total</td>
                      <td className="pt-4 text-right text-[18px] font-bold text-[#198754]">
                        ${plan.price.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-8 rounded-lg bg-[#f8f9fa] border border-[#e2e8f0] p-5">
                <p className="eyebrow text-[#198754]">Included in package</p>
                <ul className="mt-3 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-[#198754]" />
                      <span className="text-[13.5px] leading-snug text-[#495057]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 flex items-start gap-2 text-[13px] leading-relaxed text-[#64748b]">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#198754]" />
                Covered by our 30-day money-back guarantee.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center bg-[#f8f9fa]">
          <Loader2 size={34} className="animate-spin text-[#198754]" />
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
