import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";
import { cn } from "@/lib/utils";
import { BookLink } from "./primitives";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-[22px] font-medium lowercase tracking-[-0.06em]" aria-label="Keystone AI home">
      keystone<sup className="-ml-1 text-[10px] font-normal tracking-normal opacity-70">AI</sup>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 transition-all", scrolled ? "pt-3" : "pt-6")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <div className="on-dark flex w-full max-w-fit items-center gap-6 rounded-full bg-black py-2 pr-2 pl-6 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.55)] max-lg:w-full max-lg:max-w-sm max-lg:justify-between max-lg:pr-3">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="rounded-full px-3 py-2 text-[13px] text-white/65 transition hover:text-white"
              activeProps={{ className: "text-white" }}>{n.label}</Link>
          ))}
        </nav>
        <BookLink
          className="hidden rounded-full bg-white px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.04em] text-[#262626] transition hover:bg-highlight lg:inline-flex">
          Book free call
        </BookLink>
        <button className="rounded-full p-2 text-white lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="on-dark mt-2 flex w-full max-w-sm flex-col gap-1 rounded-3xl bg-black p-3 animate-slide-in lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
              className="rounded-2xl px-4 py-3 text-base text-white/70" activeProps={{ className: "bg-white/10 text-white" }}>{n.label}</Link>
          ))}
          <BookLink onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-white px-5 py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.04em] text-[#262626]">Book your free demo</BookLink>
        </nav>
      )}
    </header>
  );
}
