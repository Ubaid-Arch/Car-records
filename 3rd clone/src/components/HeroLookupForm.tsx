"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { countries } from "@/lib/site";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HeroLookupForm() {
  const router = useRouter();
  const [vin, setVin] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<{ vin?: string; email?: string; country?: string }>({});
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    const cleanVin = vin.trim().toUpperCase();

    if (!cleanVin) next.vin = "Please enter a VIN number.";
    else if (!VIN_RE.test(cleanVin))
      next.vin = "Enter a valid 17-character VIN (no I, O or Q).";
    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (!country) next.country = "Please select your country.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin: cleanVin, email: email.trim(), country }),
      }).catch(() => null);
    } finally {
      const qs = new URLSearchParams({
        type: "car",
        tier: "standard",
        vin: cleanVin,
        email: email.trim(),
        country,
      });
      router.push(`/checkout?${qs.toString()}`);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto w-full max-w-md rounded-xl border border-[#e2e8f0] bg-white p-6 sm:p-8 text-left shadow-modern-soft"
    >
      <div>
        <label htmlFor="hero-vin" className="mb-2 block text-[13px] font-semibold text-[#495057]">
          VIN Number
        </label>
        <input
          id="hero-vin"
          value={vin}
          onChange={(e) => {
            setVin(e.target.value.toUpperCase());
            if (errors.vin) setErrors({ ...errors, vin: undefined });
          }}
          maxLength={17}
          spellCheck={false}
          autoComplete="off"
          placeholder="Enter your VIN Number"
          className={`field font-mono tracking-wide text-[#121619] border-[#e2e8f0] ${errors.vin ? "field-error" : ""}`}
          aria-invalid={!!errors.vin}
        />
        {errors.vin && <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.vin}</p>}
      </div>

      <div className="mt-5">
        <label htmlFor="hero-email" className="mb-2 block text-[13px] font-semibold text-[#495057]">
          Email Address
        </label>
        <input
          id="hero-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          placeholder="Enter Your Email Address"
          className={`field text-[#121619] border-[#e2e8f0] ${errors.email ? "field-error" : ""}`}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.email}</p>}
      </div>

      <div className="mt-5">
        <label
          htmlFor="hero-country"
          className="mb-2 block text-[13px] font-semibold text-[#495057]"
        >
          Which Country?
        </label>
        <select
          id="hero-country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            if (errors.country) setErrors({ ...errors, country: undefined });
          }}
          className={`field border-[#e2e8f0] ${errors.country ? "field-error" : ""} ${
            country ? "text-[#121619]" : "text-[#94a3b8]"
          }`}
          aria-invalid={!!errors.country}
        >
          <option value="">Select Your Country</option>
          {countries.map((c) => (
            <option key={c} value={c} className="text-[#121619]">
              {c}
            </option>
          ))}
        </select>
        {errors.country && <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.country}</p>}
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#0f5132] hover:bg-[#157347] px-6 py-4 text-[14px] font-bold uppercase tracking-[0.05em] text-white transition disabled:opacity-70 shadow-sm"
      >
        {busy ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Checking…
          </>
        ) : (
          "Get Report"
        )}
      </button>
    </form>
  );
}
