import Link from "next/link";
import Image from "next/image";
import HeroLookupForm from "@/components/HeroLookupForm";
import StatsCounter from "@/components/StatsCounter";
import { site } from "@/lib/site";
import {
  Car,
  Bike,
  Truck,
  Ship,
  Compass,
  Caravan,
  FileSearch,
  GaugeCircle,
  BadgeCheck,
  Wrench,
  Banknote,
  Timer,
  ArrowRight,
  Check,
} from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Car Report",
    body: "Complete vehicle history including accidents, ownership records, mileage verification, title status and theft checks.",
  },
  {
    icon: Bike,
    title: "Motorbike Report",
    body: "Detailed history of any used bike including accidents, ownership details, odometer reading, theft records and registration status.",
  },
  {
    icon: Truck,
    title: "Truck Report",
    body: "Full background details including accident history, ownership records, mileage verification, title status and usage information.",
  },
  {
    icon: Ship,
    title: "Boat Report",
    body: "Complete marine history including accidents, ownership, registration, title checks and documented usage details.",
  },
  {
    icon: Compass,
    title: "ATV Report",
    body: "Off-road vehicle background covering accident records, ownership, hours/mileage, title brands and theft status.",
  },
  {
    icon: Caravan,
    title: "RV Report",
    body: "Motorhome and trailer history with accident reports, ownership chain, title verification and service records.",
  },
];

const checks = [
  { icon: FileSearch, label: "Accident & damage history" },
  { icon: BadgeCheck, label: "Title records (salvage, rebuilt, flood)" },
  { icon: GaugeCircle, label: "Odometer & mileage verification" },
  { icon: Wrench, label: "Service and maintenance events" },
  { icon: Banknote, label: "Lien, loan and market value data" },
  { icon: Timer, label: "Reports delivered in as little as 3 hours" },
];

const steps = [
  {
    n: "01",
    title: "Enter the VIN",
    body: "Type the 17-character VIN found on the dashboard, door jamb or title document.",
  },
  {
    n: "02",
    title: "Choose your package",
    body: "Pick Basic, Standard or Premium depending on how deep you need the audit to go.",
  },
  {
    n: "03",
    title: "Pay securely",
    body: "Checkout is handled end-to-end by PayPal — we never store your card details.",
  },
  {
    n: "04",
    title: "Get your report",
    body: "Your comprehensive PDF lands in your inbox, backed by a 30-day money-back guarantee.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-[#121619] border-b border-[#e2e8f0]">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-0 text-center sm:pt-20">
          <p className="eyebrow text-[#198754] font-semibold">Welcome to {site.brand}</p>

          <h1 className="mx-auto mt-5 max-w-3xl text-[34px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px] text-shadow-none">
            <span className="text-[#198754]">Trusted Vehicle</span>
            <br />
            History Reports For Every Ride
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[#adb5bd]">
            Get complete and accurate vehicle history reports before you buy, sell, or register any
            vehicle. We provide detailed reports for cars, motorcycles, trucks, ATVs, RVs, and boats
            to help you make safe and confident decisions.
          </p>

          <div className="mt-10">
            <HeroLookupForm />
          </div>
        </div>

        {/* Car photo band */}
        <div className="bg-[#121619] mt-12 pb-6">
          <div className="mx-auto max-w-3xl px-5">
            <Image
              src="/images/hero-car.png"
              alt="Front view of a vehicle ready for a history check"
              width={1024}
              height={1024}
              priority
              className="mx-auto h-auto w-full max-w-xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────── */}
      <section className="border-b border-[#e2e8f0] bg-[#f8f9fa]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-10 sm:grid-cols-4">
          {[
            ["NMVTIS", "Approved data sources"],
            ["3 Hours", "Fastest delivery tier"],
            ["30 Days", "Money-back guarantee"],
            ["PayPal", "Protected checkout"],
          ].map(([big, small]) => (
            <div key={big} className="text-center">
              <p className="text-[20px] font-bold tracking-[-0.01em] text-[#121619]">{big}</p>
              <p className="mt-1 text-[13px] text-[#495057]">{small}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#198754]">What we do</p>
            <h2 className="mt-3 text-[30px] font-bold tracking-[-0.02em] text-[#121619] sm:text-[38px]">
              History report services
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#495057]">
              One VIN unlocks the full paper trail. Every report is compiled from verified,
              regularly updated public and industry records.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group rounded-xl border border-[#e2e8f0] bg-white p-8 transition duration-200 shadow-modern-soft hover:border-[#198754]/40 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#f8f9fa] text-[#0f5132] border border-[#e2e8f0] transition group-hover:bg-[#0f5132] group-hover:text-white group-hover:border-transparent">
                  <s.icon size={20} strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-[#121619]">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#495057]">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's inside ────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-20 border-t border-b border-[#e2e8f0]">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-[#198754]">About us</p>
            <h2 className="mt-3 text-[28px] font-bold tracking-[-0.02em] text-[#121619] sm:text-[34px]">
              Every vehicle has a history worth knowing
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#495057]">
              Whether you&apos;re buying, selling, or simply researching a vehicle, accessing its
              complete background helps you avoid hidden problems and costly surprises. We turn raw
              VIN data into a clear, readable audit you can act on.
            </p>

            <ul className="mt-8 space-y-3.5">
              {checks.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#e2e8f0] text-[#0f5132]">
                    <c.icon size={15} strokeWidth={2.2} />
                  </span>
                  <span className="pt-1 text-[15px] font-medium text-[#495057]">{c.label}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#0f5132] hover:bg-[#157347] px-6 py-3.5 text-[13.5px] font-bold text-white transition shadow-sm"
            >
              More about us <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
            <p className="eyebrow text-[#198754]">Inside a report</p>
            <h3 className="mt-3 text-[22px] font-bold tracking-[-0.01em] text-[#121619]">
              A sample of what you receive
            </h3>

            <dl className="mt-6 divide-y divide-[#e2e8f0]">
              {[
                ["Title status", "Clean — no brands recorded"],
                ["Reported accidents", "0 events"],
                ["Last odometer reading", "35,240 mi"],
                ["Previous owners", "2 personal owners"],
                ["Theft record", "Not reported stolen"],
                ["Open lien", "None found"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-[14px] text-[#495057]">{k}</dt>
                  <dd className="text-[14px] font-bold text-[#121619]">{v}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/sample-report"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#e2e8f0] bg-[#f8f9fa] px-6 py-3.5 text-[13.5px] font-bold text-[#0f5132] hover:bg-[#0f5132] hover:text-white hover:border-transparent transition"
            >
              View full sample report <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#198754]">How it works</p>
            <h2 className="mt-3 text-[30px] font-bold tracking-[-0.02em] text-[#121619] sm:text-[38px]">
              Four steps to total clarity
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-[#e2e8f0] bg-[#f8f9fa] p-8 shadow-modern-soft">
                <span className="text-[13px] font-bold tracking-[0.1em] text-[#198754]">
                  {s.n}
                </span>
                <h3 className="mt-3 text-[17px] font-bold text-[#121619]">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#495057]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="bg-[#121619] py-16 border-t border-b border-[#2c3237]">
        <div className="mx-auto max-w-6xl px-5">
          <StatsCounter />
        </div>
      </section>

      {/* ── Pricing teaser ───────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[#198754]">Pricing</p>
            <h2 className="mt-3 text-[30px] font-bold tracking-[-0.02em] text-[#121619] sm:text-[38px]">
              Straightforward one-time pricing
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#495057]">
              No subscriptions. No recurring charges. Pay once per report, for any vehicle class.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { name: "Basic", price: "55.99", note: "Essential VIN audit" },
              { name: "Standard", price: "60.99", note: "Most chosen package" },
              { name: "Premium", price: "65.99", note: "Full transparency" },
            ].map((p, i) => (
              <div
                key={p.name}
                className={`rounded-xl border p-8 text-center shadow-modern-soft ${
                  i === 1
                    ? "border-[#198754] bg-[#f2fbf5] ring-1 ring-[#198754]/25"
                    : "border-[#e2e8f0] bg-white"
                }`}
              >
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#64748b]">
                  {p.name}
                </p>
                <p className="mt-3 text-[34px] font-bold tracking-[-0.02em] text-[#121619]">
                  ${p.price}
                </p>
                <p className="mt-1.5 text-[13px] text-[#64748b]">{p.note}</p>
                <ul className="mt-6 space-y-2.5 text-left border-t border-[#e2e8f0] pt-5">
                  {["1 VIN report", "Comprehensive PDF", "Money-back guarantee"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-[#475569]">
                      <Check size={14} className="text-[#198754]" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-md bg-[#0f5132] hover:bg-[#157347] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition shadow-sm"
            >
              See all packages <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-[#121619] py-20 border-t border-[#2c3237]">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-[28px] font-bold tracking-[-0.02em] text-white sm:text-[34px] text-shadow-none">
            Ready to check a vehicle?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-[#adb5bd]">
            Run the VIN before the money changes hands. It takes a minute and can save you
            thousands.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="w-full rounded-md bg-[#0f5132] hover:bg-[#157347] px-8 py-4 text-center text-[13px] font-bold uppercase tracking-[0.1em] text-white transition sm:w-auto shadow-sm"
            >
              Get my report
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-md border border-[#2c3237] px-8 py-4 text-center text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white/5 sm:w-auto"
            >
              Talk to support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
