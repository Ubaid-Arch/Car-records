"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, PackageSearch, ShieldCheck } from "lucide-react";

type OrderResult = {
  orderNumber: string;
  customerName: string;
  vin: string;
  vehicleType: string;
  planTier: string;
  amount: string;
  status: string;
  reportGenerated: boolean | null;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  completed: "bg-[#e7f6ec] text-[#1f8a4c]",
  pending: "bg-[#fff4e5] text-[#8a5300]",
  refunded: "bg-[#eef1f5] text-[#5b6878]",
  cancelled: "bg-[#fdecec] text-[#b42318]",
};

export default function OrdersPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "found" | "error">("idle");
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        order?: OrderResult;
        error?: string;
      };
      if (!res.ok || !data.order) throw new Error(data.error || "Order not found.");
      setOrder(data.order);
      setState("found");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order not found.");
      setState("error");
    }
  }

  return (
    <>
      <section className="bg-[#121619] py-16 border-b border-[#2c3237]">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h1 className="text-[32px] font-bold tracking-[-0.02em] text-white sm:text-[40px] text-shadow-none">
            Access your reports
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15.5px] leading-relaxed text-[#adb5bd]">
            Enter the order number from your receipt together with the email you used at checkout.
            No password required.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-14">
        <div className="mx-auto max-w-xl px-5">
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft"
          >
            <div className="flex items-center gap-3">
              <PackageSearch size={22} className="text-[#0f5132]" />
              <h2 className="text-[19px] font-bold tracking-[-0.01em] text-[#121619]">
                Order lookup
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="orderNumber" className="eyebrow mb-2 block text-[#495057]">
                  Order number
                </label>
                <input
                  id="orderNumber"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                  placeholder="ARP-XXXXXX-XXXXX"
                  className="field font-mono border-[#e2e8f0]"
                />
              </div>
              <div>
                <label htmlFor="lookupEmail" className="eyebrow mb-2 block text-[#495057]">
                  Email used at checkout
                </label>
                <input
                  id="lookupEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="field border-[#e2e8f0]"
                />
              </div>
            </div>

            {state === "error" && (
              <p className="mt-5 flex items-start gap-2 rounded-md bg-[#fff5f5] px-4 py-3 text-[13.5px] text-[#e53e3e]">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#0f5132] px-6 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#157347] disabled:opacity-70 shadow-sm"
            >
              {state === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Searching…
                </>
              ) : (
                "Find my order"
              )}
            </button>
          </form>

          {state === "found" && order && (
            <div className="mt-6 rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-[#198754]">Order</p>
                  <p className="mt-1 font-mono text-[17px] font-bold text-[#121619]">
                    {order.orderNumber}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${
                    statusStyles[order.status] ?? "bg-[#eef1f5] text-[#5b6878]"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <dl className="mt-6 divide-y divide-[#e2e8f0] text-[14px]">
                {[
                  ["Name", order.customerName],
                  ["VIN", order.vin],
                  ["Vehicle", order.vehicleType.toUpperCase()],
                  ["Package", order.planTier],
                  ["Amount", `$${Number(order.amount).toFixed(2)} USD`],
                  ["Placed", new Date(order.createdAt).toLocaleString()],
                  ["Report", order.reportGenerated ? "Ready — sent by email" : "In preparation"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-[#495057]">{k}</dt>
                    <dd className="text-right font-bold capitalize text-[#121619]">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 flex items-start gap-2 text-[13px] leading-relaxed text-[#64748b]">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#198754]" />
                Something wrong with this order?{" "}
                <Link href="/contact" className="font-semibold text-[#198754] hover:underline">
                  Contact support
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
