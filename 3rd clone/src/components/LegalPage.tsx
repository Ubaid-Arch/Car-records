import type { ReactNode } from "react";

export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="band-navy py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h1 className="text-[30px] font-extrabold tracking-[-0.02em] text-white sm:text-[38px]">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#a7b9cc]">
            {intro}
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8f6] py-14">
        <div className="mx-auto max-w-3xl px-5">
          <div className="space-y-8 rounded-xl border border-black/8 bg-white p-7 sm:p-9">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

export function Clause({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[17px] font-extrabold tracking-[-0.01em] text-[#0b1524]">{heading}</h2>
      <div className="mt-2.5 space-y-3 text-[14.5px] leading-relaxed text-[#5b6878]">
        {children}
      </div>
    </section>
  );
}
