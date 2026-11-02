import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-terrace.jpg";
import officeImg from "@/assets/agency-office.jpg";
import { Dashboard } from "@/components/site/Dashboard";
import { RoiCalculator } from "@/components/site/RoiCalculator";
import { BookDemo } from "@/components/site/BookDemo";
import { BookCta, Reveal, btn, Eyebrow } from "@/components/site/primitives";
import { Problems, SolutionsGrid, Workflow, StatsStrip, HowItWorks, Industries, CaseStudyPlaceholders, Faqs } from "@/components/site/Sections";

// Decorative depth layers in the hero; illustrative, not live data.
const CHIPS = [
  { k: "21:42 · Valuation", t: "3-bed semi captured", x: "5%", y: "17%", d: 1.4 },
  { k: "AI receptionist", t: "Call answered in 4s", x: "80%", y: "15%", d: 0.8 },
  { k: "Lettings", t: "Viewing booked for Sat", x: "81%", y: "80%", d: 1.8 },
  { k: "Follow-up", t: "WhatsApp sent to buyer", x: "4%", y: "82%", d: 1.1 },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keystone AI — Turn Every Property Enquiry Into an Opportunity" },
      { name: "description", content: "AI-powered reception, lead management and automation built for UK estate agencies and letting agents." },
      { property: "og:title", content: "Keystone AI — AI for UK Estate Agencies" },
      { property: "og:description", content: "Capture more enquiries, automate admin and never miss a valuation call again." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section data-scroll3d className="hero-3d on-dark relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20">
        <img src={heroImg} alt="" width={1920} height={1088} fetchPriority="high" className="hero-bg absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
          {CHIPS.map((c) => (
            <div key={c.t} className="hero-chip glass absolute rounded-2xl px-4 py-3 text-left" style={{ left: c.x, top: c.y, "--d": c.d } as React.CSSProperties}>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{c.k}</p>
              <p className="text-sm">{c.t}</p>
            </div>
          ))}
        </div>
        <div className="hero-copy relative mx-auto max-w-6xl px-6 text-center"><div className="animate-slide-in">
          <Eyebrow>AI consulting for UK property</Eyebrow>
          <h1 className="text-5xl font-medium leading-[0.95] md:text-7xl xl:text-[6.5rem]">Turn every property enquiry into an <span className="text-gradient">opportunity.</span></h1>
          <p className="mx-auto mt-8 max-w-xl font-mono text-sm uppercase leading-relaxed tracking-[0.04em] text-muted-foreground">AI-powered reception, lead management and automation, built for UK estate agencies.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <BookCta />
            <Link to="/solutions" className={btn.ghost}>Explore our solutions</Link>
          </div>
        </div></div>
      </section>
      <section data-scroll3d className="dash-stage relative z-10 -mt-24 px-6 pb-10">
        <div className="mx-auto max-w-3xl animate-slide-in" style={{ animationDelay: "200ms" }}><div className="dash-3d"><Dashboard /></div></div>
      </section>
      <StatsStrip />
      <Problems />
      <SolutionsGrid />
      <Workflow />
      <RoiCalculator />
      <HowItWorks />
      <section data-scroll3d className="office-3d px-6 py-10">
        <Reveal className="on-dark relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)]">
          <img src={officeImg} alt="Estate agency office at night" loading="lazy" width={1280} height={896} className="office-img h-[520px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center p-10 md:p-16">
            <div className="max-w-lg">
              <h2 className="text-4xl font-medium leading-[1] md:text-6xl">Your office closes. <span className="text-gradient">Your enquiries don't.</span></h2>
              <p className="mt-4 text-muted-foreground">Buyers, sellers and tenants enquire in the evening. AI makes sure someone always answers.</p>
            </div>
          </div>
        </Reveal>
      </section>
      <Industries />
      <CaseStudyPlaceholders />
      <BookDemo />
      <Faqs />
    </>
  );
}
