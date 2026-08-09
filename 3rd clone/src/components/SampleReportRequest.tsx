"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Download, Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SampleReportRequest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      setState("failed");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      setState("failed");
      return;
    }

    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/sample-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "We could not send the sample.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send the sample.");
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 text-center shadow-modern-soft">
        <CheckCircle2 size={40} className="mx-auto text-[#198754]" />
        <h2 className="mt-4 text-[18px] font-bold tracking-[-0.01em] text-[#121619]">
          Sample on its way
        </h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-[#495057]">
          We&apos;ve queued the full PDF sample for <strong>{email}</strong>. It usually lands
          within a couple of minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft">
      <h2 className="text-[18px] font-bold tracking-[-0.01em] text-[#121619]">
        Email me the full sample
      </h2>
      <p className="mt-2 text-[14.5px] leading-relaxed text-[#495057]">
        We&apos;ll send the complete multi-page PDF so you can review every section.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="sampleName" className="eyebrow mb-2 block text-[#495057]">
            Your name
          </label>
          <input
            id="sampleName"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (state === "failed") setState("idle");
            }}
            placeholder="John Doe"
            className="field border-[#e2e8f0]"
          />
        </div>
        <div>
          <label htmlFor="sampleEmail" className="eyebrow mb-2 block text-[#495057]">
            Email address
          </label>
          <input
            id="sampleEmail"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "failed") setState("idle");
            }}
            placeholder="john@example.com"
            className="field border-[#e2e8f0]"
          />
        </div>
      </div>

      {state === "failed" && (
        <p className="mt-4 flex items-start gap-2 rounded-md bg-[#fff5f5] px-4 py-3 text-[13.5px] text-[#e53e3e]">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#0f5132] px-6 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#157347] disabled:opacity-70 shadow-sm"
      >
        {state === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Download size={15} /> Send me the sample
          </>
        )}
      </button>
    </form>
  );
}
