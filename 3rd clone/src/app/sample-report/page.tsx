import type { Metadata } from "next";
import Link from "next/link";
import SampleReportRequest from "@/components/SampleReportRequest";
import { site } from "@/lib/site";
import { AlertTriangle, Check, FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sample Report",
  description: `See exactly what a ${site.brand} vehicle history report contains before you order.`,
};

const specs: [string, string][] = [
  ["Make", "Honda"],
  ["Model", "Civic EX"],
  ["Year", "2020"],
  ["Body style", "Sedan"],
  ["Engine", "2.0L I4"],
  ["Transmission", "Automatic"],
  ["Drivetrain", "FWD"],
  ["Fuel", "Gasoline"],
];

const odometer: [string, string, string][] = [
  ["15 Jan 2023", "35,240 mi", "Service centre"],
  ["20 Jun 2022", "28,150 mi", "State inspection"],
  ["05 Dec 2021", "20,800 mi", "DMV title transfer"],
  ["10 May 2021", "15,000 mi", "Franchise dealer"],
];

export default function SampleReportPage() {
  return (
    <>
      <section className="relative bg-[#121619] py-16 border-b border-[#2c3237] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/page-hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121619]/90 via-[#121619]/80 to-[#121619]" />

        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow text-[#198754]">Sample report</p>
          <h1 className="mt-4 text-[32px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[42px] text-shadow-none">
            See what you get before you pay
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-[#adb5bd]">
            This is an anonymised extract of a real Premium report. Your PDF follows the same
            structure for any supported vehicle class.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-14">
        <div className="mx-auto max-w-4xl px-5">
          <article className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-modern-soft">
            {/* Report header */}
            <header className="flex flex-wrap items-center justify-between gap-4 bg-[#121619] px-6 py-5 border-b border-[#2c3237]">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-[#198754]" />
                <div>
                  <p className="text-[15.5px] font-bold text-white">
                    Vehicle history report
                  </p>
                  <p className="font-mono text-[12.5px] text-[#adb5bd]">
                    VIN 1HGBH41JXMN109186
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#198754] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                Sample
              </span>
            </header>

            <div className="space-y-9 p-8">
              {/* Specs */}
              <section>
                <h2 className="text-[16px] font-bold text-[#121619]">Vehicle information</h2>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {specs.map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-[#f8f9fa] border border-[#e2e8f0] p-4 shadow-sm">
                      <dt className="eyebrow text-[#64748b]">{k}</dt>
                      <dd className="mt-1 text-[14.5px] font-bold text-[#121619]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Status blocks */}
              <section className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[#c3e6cb] bg-[#f4fbf6] p-6">
                  <p className="flex items-center gap-2 text-[14.5px] font-bold text-[#155724]">
                    <Check size={16} strokeWidth={3} /> Clean title
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#155724]/90">
                    No salvage, rebuilt, flood or junk brand recorded in any state registry.
                  </p>
                </div>
                <div className="rounded-lg border border-[#c3e6cb] bg-[#f4fbf6] p-6">
                  <p className="flex items-center gap-2 text-[14.5px] font-bold text-[#155724]">
                    <Check size={16} strokeWidth={3} /> No reported accidents
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#155724]/90">
                    Zero insurance damage claims or police-reported collisions found.
                  </p>
                </div>
                <div className="rounded-lg border border-[#ffeeba] bg-[#fffbf0] p-6">
                  <p className="flex items-center gap-2 text-[14.5px] font-bold text-[#856404]">
                    <AlertTriangle size={16} strokeWidth={2.6} /> Minor advisory
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#856404]/90">
                    One open recall from the manufacturer remains unresolved. Free to fix at any
                    franchise dealer.
                  </p>
                </div>
                <div className="rounded-lg border border-[#c3e6cb] bg-[#f4fbf6] p-6">
                  <p className="flex items-center gap-2 text-[14.5px] font-bold text-[#155724]">
                    <Check size={16} strokeWidth={3} /> No open lien
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#155724]/90">
                    No active finance agreement is registered against this VIN.
                  </p>
                </div>
              </section>

              {/* Odometer */}
              <section>
                <h2 className="text-[16px] font-bold text-[#121619]">Odometer history</h2>
                <div className="mt-4 overflow-x-auto rounded-lg border border-[#e2e8f0] bg-white">
                  <table className="w-full min-w-[420px] text-left text-[14px]">
                    <thead>
                      <tr className="border-b border-[#e2e8f0] bg-[#f8f9fa]">
                        {["Date", "Reading", "Source"].map((h) => (
                          <th key={h} className="py-3 px-4 eyebrow text-[#64748b]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0]">
                      {odometer.map((row) => (
                        <tr key={row[0]} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 text-[#495057]">{row[0]}</td>
                          <td className="py-3 px-4 font-semibold text-[#121619]">{row[1]}</td>
                          <td className="py-3 px-4 text-[#495057]">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-[13px] text-[#64748b]">
                  Readings increase consistently — no rollback detected.
                </p>
              </section>

              {/* Ownership */}
              <section>
                <h2 className="text-[16px] font-bold text-[#121619]">Ownership</h2>
                <div className="mt-4 rounded-lg border border-[#bee5eb] bg-[#f4fafd] p-6">
                  <p className="text-[14.5px] font-bold text-[#0c5460]">2 previous owners</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#0c5460]/90">
                    Personal use only. No taxi, rental, lease or fleet registration recorded.
                  </p>
                </div>
              </section>
            </div>
          </article>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
              <ShieldCheck size={22} className="text-[#198754]" strokeWidth={2.2} />
              <h2 className="mt-4 text-[18px] font-bold tracking-[-0.01em] text-[#121619]">
                Ready for your own VIN?
              </h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#495057]">
                Choose a package and get the full document, backed by a 30-day money-back
                guarantee.
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-block rounded-md bg-[#198754] hover:bg-[#157347] px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.15em] text-white transition shadow-sm"
              >
                View packages
              </Link>
            </div>

            <SampleReportRequest />
          </div>
        </div>
      </section>
    </>
  );
}
