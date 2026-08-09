import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-[#121619] text-white border-t border-[#2c3237]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <ShieldCheck size={24} className="text-[#198754]" strokeWidth={2.4} />
              <span className="text-xl font-bold tracking-[-0.02em]">{site.brand}</span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#adb5bd]">
              {site.tagline}
            </p>
            <p className="mt-5 text-[12.5px] font-medium leading-relaxed text-[#6c757d]">
              &copy; Copyright 2026 {site.brand}. Use of this website constitutes acceptance of our Terms & Conditions and Privacy Policy.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-[#198754] font-semibold">User Links</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-[14.5px] text-[#adb5bd] transition hover:text-[#198754]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[#198754] font-semibold">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/pricing?type=car", label: "Car Report" },
                { href: "/pricing?type=bike", label: "Motorbike Report" },
                { href: "/pricing?type=truck", label: "Truck Report" },
                { href: "/pricing?type=boat", label: "Boat Report" },
                { href: "/pricing?type=atv", label: "ATV Report" },
                { href: "/pricing?type=rv", label: "RV Report" },
              ].map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-[14.5px] text-[#adb5bd] transition hover:text-[#198754]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[#198754] font-semibold">Support</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms and Conditons" },
                { href: "/contact", label: "Contact Support" },
                { href: "/orders", label: "Track My Report" },
              ].map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-[14.5px] text-[#adb5bd] transition hover:text-[#198754]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2c3237] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[13px] text-[#adb5bd]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              en English
            </span>
          </div>
          <div className="flex items-center gap-x-6 text-[13px] text-[#adb5bd]">
            <span className="inline-flex items-center gap-2">
              <Lock size={14} className="text-[#198754]" />
              256-bit SSL encrypted checkout
            </span>
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
