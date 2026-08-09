"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { vehicleCategories, type VehicleType } from "@/lib/pricing";
import { site } from "@/lib/site";
import { Car, Bike, Truck, Ship, Compass, Caravan, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";

const tabs: { type: VehicleType; label: string; Icon: typeof Car }[] = [
  { type: "car", label: "Car", Icon: Car },
  { type: "bike", label: "Bike", Icon: Bike },
  { type: "truck", label: "Truck", Icon: Truck },
  { type: "boat", label: "Boat", Icon: Ship },
  { type: "atv", label: "ATV", Icon: Compass },
  { type: "rv", label: "RV", Icon: Caravan },
];

function PricingInner() {
  const params = useSearchParams();
  const initial = (params.get("type") as VehicleType) || "car";
  const valid = tabs.some((t) => t.type === initial) ? initial : "car";
  const [active, setActive] = useState<VehicleType>(valid);

  const category = vehicleCategories.find((c) => c.type === active) ?? vehicleCategories[0];

  return (
    <>
      {/* Hero Header with background image and readable overlay */}
      <section className="relative bg-[#121619] py-20 sm:py-24 border-b border-[#2c3237] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/page-hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121619]/90 via-[#121619]/80 to-[#121619]" />

        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <p className="eyebrow text-[#198754]">Pricing</p>
          <h1 className="mt-4 text-[34px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[48px] text-shadow-none">
            {site.brand} <span className="text-[#198754]">{category.title}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#adb5bd]">
            Pick the depth of audit you need. One-time payment, no subscription, backed by a 30-day
            money-back guarantee.
          </p>
        </div>
      </section>

      {/* Centered navigation tabs bar */}
      <section className="border-b border-[#e2e8f0] bg-white shadow-sm sticky top-16 z-30">
        <div className="mx-auto max-w-4xl px-5 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tabs.map(({ type, label, Icon }) => {
              const on = active === type;
              return (
                <button
                  key={type}
                  onClick={() => setActive(type)}
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[14px] font-bold transition shadow-sm ${
                    on
                      ? "bg-[#0f5132] text-white shadow-md ring-2 ring-[#0f5132]/20"
                      : "border border-[#e2e8f0] bg-white text-[#495057] hover:text-[#121619] hover:bg-slate-50"
                  }`}
                >
                  <Icon size={17} strokeWidth={2.2} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="bg-[#f8f9fa] py-16">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid gap-6 md:grid-cols-3">
            {category.plans.map((plan) => {
              const isPopular = plan.tier === "standard";
              return (
                <div
                  key={plan.tier}
                  className={`relative flex h-full flex-col rounded-xl border p-8 shadow-modern-soft bg-white transition duration-200 ${
                    isPopular
                      ? "border-[#198754] ring-1 ring-[#198754]/25 shadow-[0_12px_24px_rgba(25,135,84,0.06)]"
                      : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-8 rounded-full bg-[#198754] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                      Most popular
                    </span>
                  )}

                  <h3 className="text-[22px] font-bold text-[#121619]">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-[38px] font-bold tracking-[-0.02em] text-[#121619]">
                    ${plan.price.toFixed(2)}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#495057]">
                    {plan.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3.5 border-t border-[#e2e8f0] pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#198754]" />
                        <span className="text-[14px] leading-relaxed text-[#475569]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/checkout?type=${category.type}&tier=${plan.tier}`}
                    className={`mt-8 block rounded-md px-6 py-4 text-center text-[13px] font-bold uppercase tracking-[0.1em] transition shadow-sm ${
                      isPopular
                        ? "bg-[#198754] text-white hover:bg-[#157347]"
                        : "bg-[#0f5132] text-white hover:bg-[#157347]"
                    }`}
                  >
                    BUY NOW
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft flex items-center gap-4">
            <ShieldCheck size={28} className="shrink-0 text-[#198754]" />
            <div>
              <h3 className="text-[18px] font-bold text-[#121619]">100% Money-Back Guarantee</h3>
              <p className="mt-1 text-[14px] text-[#495057]">
                Not satisfied with your report for any reason? Contact us within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-[#f8f9fa]" />}>
      <PricingInner />
    </Suspense>
  );
}
