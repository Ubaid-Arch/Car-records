import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-[#fbf8f6] py-24">
      <div className="mx-auto max-w-md px-5 text-center">
        <Compass size={44} className="mx-auto text-[#1f6fa8]" />
        <p className="mt-5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#ef7215]">
          404
        </p>
        <h1 className="mt-2 text-[28px] font-extrabold tracking-[-0.02em] text-[#0b1524]">
          Page not found
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[#5b6878]">
          The page you were looking for has moved or never existed. Try a VIN lookup instead.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-md bg-[#d9600b] px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#c25409]"
          >
            Back home
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-black/12 bg-white px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#0b1524] transition hover:bg-[#0b1524] hover:text-white"
          >
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
}
