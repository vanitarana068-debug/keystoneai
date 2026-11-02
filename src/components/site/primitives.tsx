import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", visible && "is-visible", className)}>{children}</div>;
}

export function Counter({ to, duration = 1600, prefix = "", suffix = "" }: { to: number; duration?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-GB")}{suffix}</span>;
}

export function DemoBadge({ label = "Demonstration data" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-warning">
      <span className="h-1.5 w-1.5 rounded-full bg-warning" />{label}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"><span className="eyebrow-dot grid h-5 w-5 grid-cols-2 place-content-center gap-[3px] rounded-md bg-foreground p-1"><i className="h-[3px] w-[3px] rounded-full bg-background" /><i className="h-[3px] w-[3px] rounded-full bg-background" /><i className="h-[3px] w-[3px] rounded-full bg-background" /><i className="h-[3px] w-[3px] rounded-full bg-background/40" /></span>{children}</p>;
}

export function SectionHeading({ eyebrow, title, text, center }: { eyebrow: string; title: ReactNode; text?: string; center?: boolean }) {
  return (
    <Reveal className={cn("mb-14 max-w-3xl", center && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-4xl font-medium leading-[1] md:text-[4.5rem]">{title}</h2>
      {text && <p className="mt-5 text-lg text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

const btnBase = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.04em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";
export const btn = {
  primary: cn(btnBase, "bg-[#262626] text-white shadow-glow hover:-translate-y-0.5 hover:bg-black"),
  ghost: cn(btnBase, "border border-black/5 bg-white text-[#262626] shadow-[0_12px_30px_-14px_rgb(0_0_0/0.3)] hover:-translate-y-0.5"),
};

export function BookCta({ children = "Book Your Free AI Strategy Call", className }: { children?: ReactNode; className?: string }) {
  return <Link to="/contact" search={{ intent: "strategy-call" }} className={cn(btn.primary, className)}>{children}</Link>;
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return (
    <section className="relative overflow-hidden pt-44 pb-20">
      <div className="absolute inset-0 bg-hero" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mx-auto max-w-4xl text-5xl font-medium leading-[0.98] md:text-[5.5rem]">{title}</h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}
