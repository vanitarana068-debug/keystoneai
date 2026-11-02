import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Handshake, Target } from "lucide-react";
import { PageHeader, Reveal } from "@/components/site/primitives";
import { HowItWorks } from "@/components/site/Sections";

const VALUES = [
  { icon: Target, t: "Property-first", d: "We start with how your branches actually work, not with the technology." },
  { icon: ShieldCheck, t: "Honest by default", d: "Transparent assumptions, clear pricing, and no invented results." },
  { icon: Handshake, t: "Long-term partners", d: "We stay to measure, refine and improve after go-live." },
];

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Keystone AI — AI Consultants for UK Property" },
    { name: "description", content: "An AI consultancy focused exclusively on UK estate agents, letting agencies and property managers." },
    { property: "og:title", content: "About Keystone AI" },
    { property: "og:description", content: "Practical, honest AI consulting for UK property businesses." },
  ] }),
  component: () => (<>
    <PageHeader eyebrow="About" title={<>Practical AI for <span className="text-gradient">people-first agencies.</span></>} text="We help UK estate agencies capture more enquiries, automate repetitive operations, reduce missed opportunities and improve business performance using AI." />
    <section className="px-6 pb-16"><div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
      {VALUES.map((v, i) => <Reveal key={v.t} delay={i * 90} className="glass rounded-3xl p-8"><v.icon className="h-7 w-7 text-cyan" /><h2 className="mt-5 text-2xl font-semibold">{v.t}</h2><p className="mt-2 text-sm text-muted-foreground">{v.d}</p></Reveal>)}
    </div></section>
    <HowItWorks />
  </>),
});
