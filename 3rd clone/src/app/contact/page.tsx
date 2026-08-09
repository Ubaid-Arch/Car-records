import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { Mail, MapPin, Phone, ShieldCheck, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact Support · ${site.brand}`,
  description: "Reach the support team for help with reports, billing or order status.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-[#121619] py-16 sm:py-20 border-b border-[#2c3237] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/page-hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121619]/90 via-[#121619]/80 to-[#121619]" />

        <div className="relative mx-auto max-w-2xl px-5 text-center">
          <h1 className="text-[32px] font-bold tracking-[-0.02em] text-white sm:text-[42px] text-shadow-none">
            Get in Touch
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-[#adb5bd]">
            We&apos;re here to help you make confident vehicle decisions. Reach out to our expert
            support team for any questions about your reports.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-14">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          {/* Left column */}
          <div className="space-y-6">
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
              <h2 className="text-[22px] font-bold tracking-[-0.01em] text-[#121619]">
                Contact Information
              </h2>

              <ul className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8f9fa] border border-[#e2e8f0] text-[#0f5132]">
                    <Mail size={18} strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow text-[#198754]">Support email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block truncate text-[15px] font-bold text-[#121619] hover:text-[#198754]"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8f9fa] border border-[#e2e8f0] text-[#0f5132]">
                    <MapPin size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="eyebrow text-[#198754]">Headquarters</p>
                    <address className="mt-1 not-italic text-[15px] leading-relaxed text-[#495057]">
                      {site.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8f9fa] border border-[#e2e8f0] text-[#0f5132]">
                    <Phone size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="eyebrow text-[#198754]">Phone</p>
                    <a
                      href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                      className="mt-1 block text-[15px] font-bold text-[#121619] hover:text-[#198754]"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
              <div className="flex gap-4">
                <ShieldCheck size={30} className="mt-1 shrink-0 text-[#198754]" strokeWidth={2.2} />
                <div>
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] text-[#121619]">
                    Peace of Mind Guarantee
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#495057]">
                    Our dedicated support team ensures every report inquiry is handled with the
                    utmost security and precision.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-[#0f5132]" strokeWidth={2.2} />
                <h3 className="text-[16px] font-bold text-[#121619]">Opening hours</h3>
              </div>
              <ul className="mt-4 divide-y divide-[#e2e8f0]">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-2.5">
                    <span className="text-[14px] font-semibold text-[#495057]">{h.day}</span>
                    <span
                      className={`text-[13.5px] ${
                        h.value === "Closed" ? "text-[#e53e3e]" : "text-[#64748b]"
                      }`}
                    >
                      {h.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
