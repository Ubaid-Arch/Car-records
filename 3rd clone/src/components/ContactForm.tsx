"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { inquiryTypes } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  inquiry: string;
  message: string;
};

const empty: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  inquiry: inquiryTypes[0],
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [failure, setFailure] = useState("");

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.email.trim()) next.email = "Email address is required.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Please give us at least 10 characters so we can help.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setState("sending");
    setFailure("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          email: form.email.trim(),
          subject: form.inquiry,
          message: form.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "We could not send your message.");
      setState("done");
      setForm(empty);
    } catch (err) {
      setState("failed");
      setFailure(err instanceof Error ? err.message : "We could not send your message.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 text-center shadow-modern-soft">
        <CheckCircle2 size={44} className="mx-auto text-[#198754]" />
        <h3 className="mt-4 text-[20px] font-bold tracking-[-0.01em] text-[#121619]">
          Message received
        </h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-[#495057]">
          A support specialist will reply to your inbox, usually within one business day.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 rounded-md bg-[#0f5132] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#157347] shadow-sm"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft"
    >
      <h2 className="text-[24px] font-bold tracking-[-0.01em] text-[#121619]">
        Send a Message
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="eyebrow mb-2 block text-[#495057]">
            First name
          </label>
          <input
            id="firstName"
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="John"
            className={`field border-[#e2e8f0] ${errors.firstName ? "field-error" : ""}`}
          />
          {errors.firstName && (
            <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="eyebrow mb-2 block text-[#495057]">
            Last name
          </label>
          <input
            id="lastName"
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Doe"
            className="field border-[#e2e8f0]"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="eyebrow mb-2 block text-[#495057]">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="john@example.com"
          className={`field border-[#e2e8f0] ${errors.email ? "field-error" : ""}`}
        />
        {errors.email && <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.email}</p>}
      </div>

      <div className="mt-5">
        <label htmlFor="inquiry" className="eyebrow mb-2 block text-[#495057]">
          Inquiry type
        </label>
        <select
          id="inquiry"
          value={form.inquiry}
          onChange={(e) => set("inquiry", e.target.value)}
          className="field border-[#e2e8f0]"
        >
          {inquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="eyebrow mb-2 block text-[#495057]">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="How can we assist you today?"
          className={`field resize-none border-[#e2e8f0] ${errors.message ? "field-error" : ""}`}
        />
        {errors.message && <p className="mt-1.5 text-[12.5px] text-[#dc2626] font-medium">{errors.message}</p>}
      </div>

      {state === "failed" && (
        <p className="mt-5 flex items-start gap-2 rounded-md bg-[#fff5f5] px-4 py-3 text-[13.5px] text-[#e53e3e]">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {failure}
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
            Send message <Send size={15} />
          </>
        )}
      </button>
    </form>
  );
}
