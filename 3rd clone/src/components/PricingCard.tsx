"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { Plan, VehicleType } from "@/lib/pricing";

export default function PricingCard({
  plan,
  vehicleType,
  featured,
}: {
  plan: Plan;
  vehicleType: VehicleType;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border p-8 shadow-modern-soft transition duration-200 ${
        featured
          ? "border-[#198754] bg-white ring-1 ring-[#198754]/20 shadow-[0_12px_24px_rgba(25,135,84,0.06)]"
          : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
      }`}
    >
      {featured && (
        <span className="absolute -top-3.5 left-8 rounded-full bg-[#198754] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
          Most popular
        </span>
      )}

      <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#64748b]">
        {plan.name}
      </p>

      <p className="mt-4 flex items-start gap-0.5">
        <span className="pt-2 text-[18px] font-bold text-[#121619]">$</span>
        <span className="text-[44px] font-bold leading-none tracking-[-0.02em] text-[#121619]">
          {plan.price.toFixed(2)}
        </span>
      </p>
      <p className="mt-2.5 text-[13px] text-[#64748b]">
        One-time payment · delivery within {plan.deliveryTime}
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
        href={`/checkout?type=${vehicleType}&tier=${plan.tier}`}
        className={`mt-8 block rounded-md px-6 py-4 text-center text-[13px] font-bold uppercase tracking-[0.1em] transition shadow-sm ${
          featured
            ? "bg-[#198754] text-white hover:bg-[#157347]"
            : "bg-[#0f5132] text-white hover:bg-[#157347]"
        }`}
      >
        Get this report
      </Link>
    </div>
  );
}
