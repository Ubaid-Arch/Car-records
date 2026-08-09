import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  ArrowRight,
  BadgeCheck,
  Database,
  Gauge,
  Globe2,
  Lock,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: `Who we are and how ${site.brand} compiles vehicle history reports.`,
};

const pillars = [
  {
    icon: Database,
    title: "Verified sources",
    body: "Records are compiled from motor vehicle departments, insurance databases, auction houses, salvage yards and service networks.",
  },
  {
    icon: Gauge,
    title: "Readable output",
    body: "We translate raw registry data into a plain-English PDF, so you can spot a problem in seconds rather than hours.",
  },
  {
    icon: Lock,
    title: "Honest billing",
    body: "One report, one payment. No hidden subscription, no auto-renewal, and a refund whenever the data falls short.",
  },
];

const numbers = [
  { icon: Users, value: "4,500+", label: "Active partners" },
  { icon: BadgeCheck, value: "200K+", label: "Reports delivered" },
  { icon: Database, value: "42B+", label: "Historical records" },
  { icon: Globe2, value: "50", label: "States covered" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-[#121619] py-16 sm:py-20 border-b border-[#2c3237] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/page-hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121619]/90 via-[#121619]/80 to-[#121619]" />

        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow text-[#198754]">About us</p>
          <h1 className="mt-4 text-[32px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[44px] text-shadow-none">
            Every vehicle has a <span className="text-[#198754]">history worth knowing</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-[#adb5bd]">
            Whether you&apos;re buying, selling, or simply researching a vehicle, accessing its
            complete background helps you avoid hidden problems and costly surprises.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.title} className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#f8f9fa] text-[#0f5132] border border-[#e2e8f0]">
                  <p.icon size={20} strokeWidth={2.2} />
                </span>
                <h2 className="mt-5 text-[17px] font-bold text-[#121619]">{p.title}</h2>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#495057]">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-b border-[#e2e8f0]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-[#198754]">What we do</p>
            <h2 className="mt-3 text-[28px] font-bold tracking-[-0.02em] text-[#121619] sm:text-[34px]">
              A full audit from a single VIN
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#495057]">
              We specialise in delivering comprehensive vehicle history reports using the Vehicle
              Identification Number. Each report cross-references multiple registries so that gaps
              in one source are filled by another.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#495057]">
              The result covers accident and damage history, title brands such as salvage, rebuilt
              or flood, mileage verification, theft records, lien status and estimated market value
              — depending on the package you choose.
            </p>
            <Link
              href="/pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#0f5132] hover:bg-[#157347] px-6 py-3.5 text-[13.5px] font-bold text-white transition shadow-sm"
            >
              See packages <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {numbers.map((n) => (
              <div
                key={n.label}
                className="rounded-xl border border-[#e2e8f0] bg-[#f8f9fa] p-6 text-center shadow-modern-soft"
              >
                <n.icon size={20} className="mx-auto text-[#0f5132]" strokeWidth={2.2} />
                <p className="mt-3 text-[26px] font-bold tracking-[-0.02em] text-[#121619]">
                  {n.value}
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                  {n.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121619] py-16 border-b border-[#2c3237]">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[32px] text-shadow-none">
            Check the VIN before you commit
          </h2>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#198754] hover:bg-[#157347] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition shadow-sm"
          >
            Run a VIN lookup <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
