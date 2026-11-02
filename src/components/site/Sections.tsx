import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, PhoneMissed, Clock, FileStack, TrendingDown, ArrowRight, X } from "lucide-react";
import { SOLUTIONS, STEPS, INDUSTRIES, FAQS } from "@/lib/content";
import { Reveal, SectionHeading, Counter, DemoBadge, btn } from "./primitives";
import { cn } from "@/lib/utils";

export function Problems() {
  const items = [
    { icon: PhoneMissed, title: "Missed calls", text: "Calls during viewings, lunch and after hours go unanswered — and callers ring the next agent." },
    { icon: Clock, title: "Delayed follow-ups", text: "Portal enquiries sit for hours before anyone responds, while interest cools." },
    { icon: FileStack, title: "Manual admin", text: "Negotiators re-key data into the CRM instead of selling and letting." },
    { icon: TrendingDown, title: "Lost opportunities", text: "Future sellers and landlords slip away without consistent nurture." },
  ];
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="The problem" title={<>Every unanswered enquiry is <span className="text-gradient">a lost instruction.</span></>} text="Busy UK agencies face the same leaks. The good news: most are fixable with the right automation." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90} className="glass rounded-3xl p-7">
              <it.icon className="mb-6 h-7 w-7 text-destructive" />
              <h3 className="text-xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionsGrid() {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const current = SOLUTIONS.find((s) => s.id === active)!;
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="AI solutions" title={<>Seven systems. <span className="text-gradient">One smarter agency.</span></>} text="Select a solution to see what it does." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div role="tablist" aria-label="AI solutions" className="grid gap-2">
            {SOLUTIONS.map((s) => (
              <button key={s.id} role="tab" aria-selected={active === s.id} aria-controls="solution-panel" onClick={() => setActive(s.id)}
                className={cn("group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                  active === s.id ? "border-cyan/50 bg-secondary shadow-glow" : "border-border hover:border-cyan/30 hover:bg-secondary/50")}>
                <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", active === s.id ? "bg-brand" : "bg-muted")}><s.icon className="h-5 w-5" /></span>
                <span className="font-display font-semibold">{s.title}</span>
                <ArrowRight className={cn("ml-auto h-4 w-4 transition", active === s.id ? "text-cyan" : "opacity-0 group-hover:opacity-60")} />
              </button>
            ))}
          </div>
          <div id="solution-panel" role="tabpanel" key={current.id} className="glass rounded-3xl p-8 md:p-10 animate-slide-in lg:sticky lg:top-28 lg:self-start">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand shadow-glow"><current.icon className="h-6 w-6" /></span>
            <h3 className="mt-6 text-3xl font-medium">{current.title}</h3>
            <p className="mt-3 text-muted-foreground">{current.short}</p>
            <ul className="mt-6 space-y-3">
              {current.points.map((p) => <li key={p} className="flex gap-3 text-sm"><Check className="h-5 w-5 shrink-0 text-cyan" />{p}</li>)}
            </ul>
            <Link to="/contact" search={{ intent: "strategy-call" }} className={cn(btn.primary, "mt-8")}>Discuss {current.title}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Workflow() {
  const [after, setAfter] = useState(true);
  const before = ["Call rings out during a viewing", "Voicemail checked next morning", "Details typed into CRM manually", "Callback attempted — applicant has moved on"];
  const withAi = ["AI receptionist answers in seconds", "Caller qualified and details captured", "Viewing booked into negotiator diary", "WhatsApp confirmation & CRM updated automatically"];
  const steps = after ? withAi : before;
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading center eyebrow="Before & after" title={<>The same 9pm call. <span className="text-gradient">Two outcomes.</span></>} />
        <div className="mx-auto mb-10 flex w-fit rounded-full glass p-1.5" role="group" aria-label="Toggle workflow">
          {[false, true].map((v) => (
            <button key={String(v)} aria-pressed={after === v} onClick={() => setAfter(v)}
              className={cn("rounded-full px-6 py-2.5 text-sm font-semibold transition", after === v ? (v ? "bg-brand" : "bg-destructive") : "text-muted-foreground")}>
              {v ? "With AI" : "Without AI"}
            </button>
          ))}
        </div>
        <ol className="grid gap-4 md:grid-cols-4" key={String(after)}>
          {steps.map((s, i) => (
            <li key={s} className="glass relative rounded-2xl p-6 animate-slide-in" style={{ animationDelay: `${i * 120}ms` }}>
              <span className={cn("mb-4 grid h-9 w-9 place-items-center rounded-full text-sm font-medium", after ? "bg-brand" : "bg-destructive/20 text-destructive")}>
                {after ? <Check className="h-4 w-4" /> : i === 3 ? <X className="h-4 w-4" /> : i + 1}
              </span>
              <p className="text-sm">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StatsStrip() {
  const stats = [{ to: 24, s: "/7", l: "Enquiry coverage possible" }, { to: 7, s: "", l: "Core AI solutions" }, { to: 4, s: "", l: "Step delivery process" }, { to: 45, s: " min", l: "Free strategy call" }];
  return (
    <section className="px-6 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 rounded-3xl glass p-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l}>
            <p className="font-display text-4xl font-medium text-gradient md:text-5xl"><Counter to={s.to} suffix={s.s} /></p>
            <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-3 max-w-7xl text-center text-xs text-muted-foreground">Service facts, not client results.</p>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="How it works" title={<>Discover → Strategy → <span className="text-gradient">Implementation → Optimisation</span></>} />
        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="glass group relative rounded-3xl p-7 transition hover:-translate-y-1">
              <p className="font-display text-6xl font-medium text-gradient opacity-80">{s.n}</p>
              <h3 className="mt-6 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const [tab, setTab] = useState(INDUSTRIES[0].id);
  const cur = INDUSTRIES.find((i) => i.id === tab)!;
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Industries" title={<>Built for <span className="text-gradient">UK property.</span></>} />
        <div role="tablist" aria-label="Industries" className="mb-6 flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => (
            <button key={i.id} role="tab" aria-selected={tab === i.id} onClick={() => setTab(i.id)}
              className={cn("rounded-full border px-5 py-2.5 text-sm font-semibold transition", tab === i.id ? "border-cyan bg-secondary text-cyan" : "border-border text-muted-foreground hover:text-foreground")}>{i.title}</button>
          ))}
        </div>
        <div key={cur.id} role="tabpanel" className="glass grid gap-8 rounded-3xl p-8 animate-slide-in md:grid-cols-2 md:p-12">
          <div>
            <h3 className="text-3xl font-medium">{cur.title}</h3>
            <p className="mt-3 text-muted-foreground">{cur.text}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cur.uses.map((u) => <li key={u} className="rounded-2xl border border-border bg-background/40 p-4 text-sm"><Check className="mb-2 h-4 w-4 text-cyan" />{u}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyPlaceholders() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Case studies & testimonials" title={<>Real results, <span className="text-gradient">when they're verified.</span></>} text="We only publish case studies and testimonials with verified evidence and client permission. These spaces are reserved until then." />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Reveal key={n} delay={n * 80} className="rounded-3xl border border-dashed border-border p-8">
              <DemoBadge label="Placeholder" />
              <p className="mt-6 font-display text-xl text-muted-foreground">"Client testimonial will appear here once verified."</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div><div className="h-3 w-24 rounded bg-muted" /><div className="mt-2 h-2.5 w-32 rounded bg-muted/60" /></div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">Want to be one of our first pilot agencies? <Link to="/contact" search={{ intent: "implementation" }} className="text-cyan underline-offset-4 hover:underline">Talk to us</Link>.</p>
      </div>
    </section>
  );
}

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading center eyebrow="FAQs" title="Questions agents ask us" />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="glass rounded-2xl">
              <h3>
                <button className="flex w-full items-center justify-between gap-4 p-6 text-left font-display font-semibold" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}<ChevronDown className={cn("h-5 w-5 shrink-0 transition", open === i && "rotate-180 text-cyan")} />
                </button>
              </h3>
              {open === i && <p id={`faq-${i}`} className="px-6 pb-6 text-sm text-muted-foreground animate-slide-in">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
