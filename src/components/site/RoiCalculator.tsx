import { useState } from "react";
import { estimateOpportunity, type RoiInputs } from "@/lib/roi";
import { DemoBadge, SectionHeading, BookCta } from "./primitives";

const FIELDS: { key: keyof RoiInputs; label: string; min: number; max: number; step: number; fmt: (v: number) => string; assumption?: boolean }[] = [
  { key: "monthlyEnquiries", label: "Monthly enquiries", min: 20, max: 2000, step: 10, fmt: (v) => v.toLocaleString("en-GB") },
  { key: "missedCallRate", label: "Missed / unanswered enquiries", min: 0, max: 60, step: 1, fmt: (v) => `${v}%` },
  { key: "instructionValue", label: "Average instruction value", min: 500, max: 15000, step: 100, fmt: (v) => `£${v.toLocaleString("en-GB")}` },
  { key: "conversionRate", label: "Enquiry → instruction conversion", min: 1, max: 30, step: 0.5, fmt: (v) => `${v}%` },
  { key: "recoveryRate", label: "Share of missed enquiries recovered by AI", min: 0, max: 100, step: 5, fmt: (v) => `${v}%`, assumption: true },
];

const gbp = (v: number) => `£${v.toLocaleString("en-GB")}`;

export function RoiCalculator() {
  const [v, setV] = useState<RoiInputs>({ monthlyEnquiries: 300, missedCallRate: 20, instructionValue: 2500, conversionRate: 5, recoveryRate: 40 });
  const r = estimateOpportunity(v);
  const scenarios = [25, 50, 75].map((rec) => ({ rec, ...estimateOpportunity({ ...v, recoveryRate: rec }) }));

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Opportunity calculator" title={<>What could missed enquiries <span className="text-gradient">be worth?</span></>} text="Adjust every input and assumption. This is a transparent estimate, not a guarantee." />
        <div className="grid gap-6 lg:grid-cols-2">
          <form className="glass space-y-6 rounded-3xl p-8" onSubmit={(e) => e.preventDefault()} aria-label="ROI inputs">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor={f.key} className="text-sm font-medium">{f.label}{f.assumption && <span className="ml-2 text-xs text-warning">assumption</span>}</label>
                  <input type="number" aria-label={`${f.label} value`} min={f.min} max={f.max} step={f.step} value={v[f.key]}
                    onChange={(e) => { const n = Number(e.target.value); if (!Number.isNaN(n)) setV({ ...v, [f.key]: Math.min(f.max, Math.max(f.min, n)) }); }}
                    className="w-28 rounded-lg border border-input bg-background/60 px-3 py-1.5 text-right text-sm tabular-nums" />
                </div>
                <input id={f.key} type="range" min={f.min} max={f.max} step={f.step} value={v[f.key]} aria-valuetext={f.fmt(v[f.key])}
                  onChange={(e) => setV({ ...v, [f.key]: Number(e.target.value) })} className="w-full" />
              </div>
            ))}
          </form>
          <div className="glass flex flex-col rounded-3xl p-8">
            <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Estimated additional fee opportunity</p><DemoBadge label="Estimate" /></div>
            <p className="mt-3 font-display text-5xl font-medium text-gradient md:text-6xl" aria-live="polite">{gbp(r.annualValue)}<span className="text-xl text-muted-foreground"> /yr</span></p>
            <p className="text-sm text-muted-foreground">{gbp(r.monthlyValue)} per month</p>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[["Missed / mo", r.missed], ["Recovered / mo", r.recovered], ["Extra instructions", r.extraInstructions]].map(([l, n]) => (
                <div key={l as string} className="rounded-2xl bg-background/40 p-3"><dt className="text-[11px] text-muted-foreground">{l}</dt><dd className="font-display text-2xl font-medium">{n}</dd></div>
              ))}
            </dl>
            <p className="mt-6 mb-3 text-sm font-medium">Scenarios by recovery rate</p>
            <div className="space-y-2">
              {scenarios.map((s) => (
                <div key={s.rec} className="flex items-center justify-between rounded-xl border border-border px-4 py-2.5 text-sm">
                  <span>{s.rec === 25 ? "Conservative" : s.rec === 50 ? "Moderate" : "Optimistic"} · {s.rec}%</span>
                  <span className="font-semibold tabular-nums">{gbp(s.annualValue)}/yr</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Formula: enquiries × missed % × recovered % × conversion % × instruction value. Excludes costs. Actual outcomes depend on your market, team and implementation.</p>
            <BookCta className="mt-6">Validate these numbers on a free call</BookCta>
          </div>
        </div>
      </div>
    </section>
  );
}
