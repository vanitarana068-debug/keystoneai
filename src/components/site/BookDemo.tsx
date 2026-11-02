import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarCheck, Check, CheckCircle2, Clock, Loader2, Video } from "lucide-react";
import { bookingSchema, DEMO_TIMES, upcomingWeekdays } from "@/lib/booking";
import { submitBooking } from "@/lib/booking.functions";
import { btn, Eyebrow, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

const field = "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm transition focus:border-foreground focus:outline-none";
const AGENDA = [
  "Live AI receptionist answering a real-style viewing enquiry",
  "Lead capture flowing into a sample CRM",
  "Automated WhatsApp & email follow-ups",
  "Where it would fit in your agency",
];

export function BookDemo() {
  const submit = useServerFn(submitBooking);
  // Days are computed after mount so server and browser agree on "today".
  const [days, setDays] = useState<ReturnType<typeof upcomingWeekdays>>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  useEffect(() => { setDays(upcomingWeekdays(10)); }, []);
  // Arriving from another page via /#book-demo: the router resets scroll on navigation, so scroll here once mounted.
  useEffect(() => {
    if (window.location.hash !== "#book-demo") return;
    const t = setTimeout(() => document.getElementById("book-demo")?.scrollIntoView({ behavior: "instant", block: "start" }), 300);
    return () => clearTimeout(t);
  }, []);

  const picked = days.find((d) => d.iso === date);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = { ...Object.fromEntries(fd), date, time, consent: fd.get("consent") === "on" };
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] ??= i.message; });
      setErrors(errs);
      document.getElementById(`demo-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({}); setStatus("sending");
    try { await submit({ data: parsed.data }); setStatus("done"); } catch { setStatus("error"); }
  };

  const err = (k: string) => errors[k] && <p id={`demo-${k}-err`} className="mt-1.5 text-xs text-destructive">{errors[k]}</p>;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `demo-${k}-err` : undefined });

  return (
    <section id="book-demo" data-scroll3d suppressHydrationWarning className="book-3d scroll-mt-28 px-6 py-20">
      <Reveal className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="on-dark flex flex-col bg-[#262626] p-8 md:p-12">
          <Eyebrow>Free live demo</Eyebrow>
          <h2 className="text-4xl font-medium leading-[1] md:text-5xl">See it answer <span className="text-gradient">your enquiries.</span></h2>
          <p className="mt-5 text-muted-foreground">A 30-minute walkthrough of the AI tools on real estate-agency scenarios. Free, no obligation.</p>
          <ul className="mt-8 space-y-3">
            {AGENDA.map((a) => <li key={a} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />{a}</li>)}
          </ul>
          <div className="mt-auto grid grid-cols-3 gap-3 pt-10 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
            <span className="flex flex-col gap-2"><Clock className="h-4 w-4 text-foreground" />30 minutes</span>
            <span className="flex flex-col gap-2"><Video className="h-4 w-4 text-foreground" />Video call</span>
            <span className="flex flex-col gap-2"><CalendarCheck className="h-4 w-4 text-foreground" />UK time</span>
          </div>
        </div>

        <div className="bg-card p-8 md:p-12">
          {status === "done" ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center animate-slide-in" role="status">
              <CheckCircle2 className="h-14 w-14 text-success" />
              <h3 className="mt-4 text-3xl font-medium">Demo requested.</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">{picked?.long} at {time} (UK time). We'll email you a calendar invite within one working day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-7" aria-label="Book a free demo">
              <fieldset>
                <legend className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">1 · Choose a day</legend>
                <div id="demo-date" tabIndex={-1} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2" {...aria("date")}>
                  {days.map((d) => (
                    <button key={d.iso} type="button" aria-label={d.long} aria-pressed={date === d.iso} onClick={() => setDate(d.iso)}
                      className={cn("flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition",
                        date === d.iso ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40")}>
                      <span className="text-[11px] uppercase opacity-70">{d.weekday}</span>
                      <span className="font-display text-2xl font-medium leading-tight">{d.day}</span>
                      <span className="text-[11px] opacity-70">{d.month}</span>
                    </button>
                  ))}
                </div>
                {err("date")}
              </fieldset>

              <fieldset>
                <legend className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">2 · Choose a time (UK)</legend>
                <div id="demo-time" tabIndex={-1} className="grid grid-cols-3 gap-2 sm:grid-cols-4" {...aria("time")}>
                  {DEMO_TIMES.map((t) => (
                    <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)}
                      className={cn("rounded-full border py-2.5 text-sm transition",
                        time === t ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40")}>{t}</button>
                  ))}
                </div>
                {err("time")}
              </fieldset>

              <fieldset className="grid gap-4 sm:grid-cols-2">
                <legend className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">3 · Your details</legend>
                <div><label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium">Full name *</label><input id="demo-name" name="name" autoComplete="name" maxLength={100} className={field} {...aria("name")} />{err("name")}</div>
                <div><label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium">Work email *</label><input id="demo-email" name="email" type="email" autoComplete="email" maxLength={255} className={field} {...aria("email")} />{err("email")}</div>
                <div><label htmlFor="demo-agency" className="mb-1.5 block text-sm font-medium">Agency name *</label><input id="demo-agency" name="agency" autoComplete="organization" maxLength={120} className={field} {...aria("agency")} />{err("agency")}</div>
                <div><label htmlFor="demo-phone" className="mb-1.5 block text-sm font-medium">Phone</label><input id="demo-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} className={field} {...aria("phone")} />{err("phone")}</div>
              </fieldset>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground"><input id="demo-consent" name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-[#262626]" {...aria("consent")} />I agree to be contacted to confirm my demo. We never share your details.</label>
                {err("consent")}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={status === "sending"} className={cn(btn.primary, "w-full sm:w-auto")}>
                  {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" />Booking…</> : "Book my free demo"}
                </button>
                {picked && time && <p className="text-sm text-muted-foreground">{picked.long} · {time}</p>}
              </div>
              {status === "error" && <p role="alert" className="text-sm text-destructive">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
