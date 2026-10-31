import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `Vindecode — Trusted Vehicle History Reports`,
    template: `%s · ${site.brand}`,
  },
  description:
    "Get complete and accurate vehicle history reports before you buy, sell, or register any vehicle. Detailed reports for cars, motorcycles, trucks, ATVs, RVs and boats.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fbf8f6] text-[#0b1524] antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
