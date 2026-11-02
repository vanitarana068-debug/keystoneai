import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-terrace.jpg";
import officeImg from "@/assets/agency-office.jpg";
import { Dashboard } from "@/components/site/Dashboard";
import { RoiCalculator } from "@/components/site/RoiCalculator";
import { BookDemo } from "@/components/site/BookDemo";
import { BookCta, Reveal, btn, Eyebrow } from "@/components/site/primitives";
import { Problems, SolutionsGrid, Workflow, StatsStrip, HowItWorks, Industries, CaseStudyPlaceholders, Faqs } from "@/components/site/Sections";

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
      <section className="on-dark relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20">
        <img src={heroImg} alt="" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="relative mx-auto max-w-6xl px-6 text-center animate-slide-in">
          <Eyebrow>AI consulting for UK property</Eyebrow>
          <h1 className="text-5xl font-medium leading-[0.95] md:text-7xl xl:text-[6.5rem]">Turn every property enquiry into an <span className="text-gradient">opportunity.</span></h1>
          <p className="mx-auto mt-8 max-w-xl font-mono text-sm uppercase leading-relaxed tracking-[0.04em] text-muted-foreground">AI-powered reception, lead management and automation, built for UK estate agencies.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <BookCta />
            <Link to="/solutions" className={btn.ghost}>Explore our solutions</Link>
          </div>
        </div>
      </section>
      <section className="relative z-10 -mt-24 px-6 pb-10">
        <div className="mx-auto max-w-3xl animate-slide-in" style={{ animationDelay: "200ms" }}><Dashboard /></div>
      </section>
      <StatsStrip />
      <Problems />
      <SolutionsGrid />
      <Workflow />
      <RoiCalculator />
      <HowItWorks />
      <section className="px-6 py-10">
        <Reveal className="on-dark relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)]">
          <img src={officeImg} alt="Estate agency office at night" loading="lazy" width={1280} height={896} className="h-[520px] w-full object-cover" />
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
