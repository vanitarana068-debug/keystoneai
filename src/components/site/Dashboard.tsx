import { useEffect, useState } from "react";
import { PhoneIncoming, PhoneCall, UserPlus, CalendarCheck, Send } from "lucide-react";
import { DemoBadge } from "./primitives";

const METRICS = [
  { icon: PhoneIncoming, label: "Incoming enquiries", base: 148 },
  { icon: PhoneCall, label: "Calls answered", base: 136 },
  { icon: UserPlus, label: "Leads captured", base: 92 },
  { icon: CalendarCheck, label: "Appointments booked", base: 37 },
  { icon: Send, label: "Follow-ups completed", base: 211 },
];

const FEED = [
  "Valuation request · 3-bed semi · captured 21:42",
  "Tenant enquiry · 2-bed flat · viewing booked",
  "Missed call returned by AI · 08:03",
  "Landlord lead · 4 properties · priority alert",
  "WhatsApp follow-up sent · viewing feedback",
  "Buyer qualified · mortgage AIP confirmed",
];

const BARS = [38, 52, 44, 68, 59, 81, 74];

export function Dashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);
  const feed = [0, 1, 2].map((i) => FEED[(tick + i) % FEED.length]);

  return (
    <div className="relative" aria-label="Demonstration AI dashboard">
      <div className="glass rounded-3xl p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">This week · Sample agency</p>
            <p className="font-display text-lg font-semibold">AI Operations</p>
          </div>
          <DemoBadge />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {METRICS.map((m, i) => (
            <div key={m.label} className={`rounded-2xl border border-border bg-background/40 p-3.5 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <m.icon className="mb-2 h-4 w-4 text-cyan" />
              <p className="font-display text-2xl font-medium tabular-nums">{m.base + (tick % 5) * (i + 1)}</p>
              <p className="text-[11px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
          <div className="col-span-2 flex items-end gap-1.5 rounded-2xl border border-border bg-background/40 p-3.5 sm:col-span-1">
            {BARS.map((b, i) => (
              <div key={i} className="flex-1 rounded-t bg-brand transition-all duration-700" style={{ height: `${Math.max(20, ((b + tick * 7 * (i + 1)) % 90) + 10)}%`, minHeight: 8, maxHeight: 64 }} />
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2" aria-live="polite">
          {feed.map((f, i) => (
            <div key={f + tick} className="flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2 text-xs animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="h-2 w-2 shrink-0 rounded-full bg-success" />{f}
            </div>
          ))}
        </div>
      </div>
      <div className="glass absolute -left-6 -bottom-16 hidden rounded-2xl px-4 py-3 animate-float md:block">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg. response · demo</p>
        <p className="font-display text-xl font-medium text-gradient">&lt; 30 sec</p>
      </div>
      <div className="glass absolute -right-4 -top-6 hidden rounded-2xl px-4 py-3 animate-float md:block" style={{ animationDelay: "1.5s" }}>
        <p className="flex items-center gap-2 text-xs"><span className="h-2 w-2 rounded-full bg-cyan animate-pulse-ring" />AI receptionist live</p>
      </div>
    </div>
  );
}
