import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/contact";
import { submitContact } from "@/lib/contact.functions";
import { btn } from "./primitives";

type Intent = "strategy-call" | "audit" | "implementation" | "general";
const INTENTS: { v: Intent; l: string }[] = [
  { v: "strategy-call", l: "Free AI strategy call" }, { v: "audit", l: "AI audit & roadmap" },
  { v: "implementation", l: "Implementation project" }, { v: "general", l: "General enquiry" },
];

const field = "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm transition focus:border-cyan focus:outline-none";

export function ContactForm({ intent = "strategy-call" }: { intent?: Intent }) {
  const submit = useServerFn(submitContact);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = { ...Object.fromEntries(fd), consent: fd.get("consent") === "on" };
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] ??= i.message; });
      setErrors(errs);
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setErrors({}); setStatus("sending");
    try { await submit({ data: parsed.data }); setStatus("done"); } catch { setStatus("error"); }
  };

  if (status === "done") return (
    <div className="glass rounded-3xl p-10 text-center animate-slide-in" role="status">
      <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
      <h2 className="mt-4 text-3xl font-medium">Thank you — request received.</h2>
      <p className="mt-3 text-muted-foreground">We'll be in touch within one working day to confirm a time.</p>
    </div>
  );

  const err = (k: string) => errors[k] && <p id={`${k}-err`} className="mt-1.5 text-xs text-destructive">{errors[k]}</p>;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="glass grid gap-5 rounded-3xl p-8 md:grid-cols-2 md:p-10">
      <div><label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full name *</label><input id="name" name="name" autoComplete="name" maxLength={100} className={field} {...aria("name")} />{err("name")}</div>
      <div><label htmlFor="email" className="mb-1.5 block text-sm font-medium">Work email *</label><input id="email" name="email" type="email" autoComplete="email" maxLength={255} className={field} {...aria("email")} />{err("email")}</div>
      <div><label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} className={field} {...aria("phone")} />{err("phone")}</div>
      <div><label htmlFor="agency" className="mb-1.5 block text-sm font-medium">Agency name *</label><input id="agency" name="agency" autoComplete="organization" maxLength={120} className={field} {...aria("agency")} />{err("agency")}</div>
      <div><label htmlFor="type" className="mb-1.5 block text-sm font-medium">Business type</label>
        <select id="type" name="type" className={field}>{["Estate Agent", "Letting Agency", "Property Management", "Other"].map((t) => <option key={t}>{t}</option>)}</select></div>
      <div><label htmlFor="intent" className="mb-1.5 block text-sm font-medium">I'm interested in</label>
        <select id="intent" name="intent" defaultValue={intent} key={intent} className={field}>{INTENTS.map((i) => <option key={i.v} value={i.v}>{i.l}</option>)}</select></div>
      <div className="md:col-span-2"><label htmlFor="message" className="mb-1.5 block text-sm font-medium">What would you like to improve?</label><textarea id="message" name="message" rows={4} maxLength={2000} className={field} {...aria("message")} />{err("message")}</div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground"><input id="consent" name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-cyan" {...aria("consent")} />I agree to be contacted about my enquiry. We never share your details.</label>{err("consent")}
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={status === "sending"} className={`${btn.primary} w-full md:w-auto`}>
          {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : "Send my request"}
        </button>
        {status === "error" && <p role="alert" className="mt-3 text-sm text-destructive">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}
