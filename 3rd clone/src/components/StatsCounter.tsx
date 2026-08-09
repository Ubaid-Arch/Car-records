"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 4500, suffix: "+", label: "Active partners", comma: true },
  { value: 200, suffix: "K+", label: "Reports delivered" },
  { value: 42, suffix: "B+", label: "Historical records" },
  { value: 800, suffix: "+", label: "Data sources", comma: true },
];

export default function StatsCounter() {
  const [counts, setCounts] = useState(() => stats.map(() => 0));
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    const steps = 60;
    let step = 0;
    const id = window.setInterval(() => {
      step += 1;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setCounts(stats.map((s) => Math.round(s.value * eased)));
      if (step >= steps) {
        setCounts(stats.map((s) => s.value));
        window.clearInterval(id);
      }
    }, 2000 / steps);
    return () => window.clearInterval(id);
  }, [start]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className="text-center">
          <p className="text-[34px] font-bold tracking-[-0.02em] text-white sm:text-[42px]">
            {s.comma ? counts[i].toLocaleString() : counts[i]}
            <span className="text-[#198754] ml-0.5 font-bold">{s.suffix}</span>
          </p>
          <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.1em] text-[#adb5bd]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
