import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

export default function Logo({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const text = tone === "dark" ? "text-[#121619]" : "text-white";
  const icon = tone === "dark" ? "text-[#0f5132]" : "text-[#198754]";
  const sizes = {
    sm: { icon: 18, text: "text-base" },
    md: { icon: 22, text: "text-xl" },
    lg: { icon: 26, text: "text-2xl" },
  }[size];

  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <ShieldCheck size={sizes.icon} className={icon} strokeWidth={2.4} />
      <span className={`${text} ${sizes.text} font-bold tracking-[-0.02em]`}>
        {site.brand}
      </span>
    </Link>
  );
}
