"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/sample-report", label: "Sample Report" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#f8f9fa]/95 backdrop-blur border-b border-[#e2e8f0]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex h-16 items-center justify-between">
          <Logo tone="dark" />

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-md px-3 py-2 text-[14px] font-semibold transition ${
                    active
                      ? "text-[#0f5132]"
                      : "text-[#495057] hover:text-[#121619]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/cart"
              aria-label="Cart"
              className="ml-2 relative p-2 text-[#495057] hover:text-[#0f5132] transition"
            >
              <ShoppingCart size={20} />
            </Link>
            <Link
              href="/orders"
              className="ml-2 rounded-md bg-[#0f5132] hover:bg-[#157347] px-5 py-2.5 text-[14px] font-semibold text-white transition shadow-sm"
            >
              Login
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              aria-label="Cart"
              className="p-2 text-[#495057]"
            >
              <ShoppingCart size={20} />
            </Link>
            <Link
              href="/orders"
              className="rounded-md bg-[#0f5132] px-4 py-1.5 text-[13px] font-semibold text-white"
            >
              Login
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
              className="rounded-md p-2 text-[#121619]"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-[#e2e8f0] bg-[#f8f9fa]">
          <ul className="mx-auto max-w-6xl px-5 py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-[15px] font-medium text-[#495057] hover:bg-black/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-[#e2e8f0] mt-2">
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-2 py-3 text-[15px] font-medium text-[#495057] hover:bg-black/5"
              >
                <ShoppingCart size={18} /> Cart
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
