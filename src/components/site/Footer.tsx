import { Link } from "@tanstack/react-router";
import { NAV } from "@/lib/content";
import { Logo } from "./Header";
import { BookCta, Reveal } from "./primitives";

export function FinalCta() {
  return (
    <section className="px-6 py-24">
      <Reveal className="on-dark relative mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] bg-[#262626] p-10 text-center md:p-20">
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-[1.05] md:text-6xl">Stop losing enquiries <span className="text-gradient">after 5pm.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">A free 45-minute strategy call to map where AI can help your agency — no obligation, no jargon.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BookCta className="bg-white text-[#262626] hover:bg-highlight" />
            <Link to="/pricing" hash="book-demo" className="inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-muted-foreground hover:text-foreground">See a free demo →</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 pt-16 pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">AI consulting for UK estate agents, letting agencies and property managers. Capture more enquiries, automate admin and grow with confidence.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-foreground">{n.label}</Link></li>)}
            <li><Link to="/pricing" className="hover:text-foreground">Free demo</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Get in touch</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" search={{ intent: "strategy-call" }} className="hover:text-foreground">Book a strategy call</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact form</Link></li>
            <li>United Kingdom</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Keystone AI. All rights reserved.</p>
        <p>Dashboard figures and calculator outputs are demonstrations or estimates, not client results.</p>
      </div>
    </footer>
  );
}
