import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/primitives";
import { HowItWorks, Faqs } from "@/components/site/Sections";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [
    { title: "How It Works — Discover, Strategy, Implement, Optimise | Keystone AI" },
    { name: "description", content: "Our four-step process for bringing AI into your estate or letting agency safely and measurably." },
    { property: "og:title", content: "How Keystone AI Works" },
    { property: "og:description", content: "Discover → Strategy → Implementation → Optimisation." },
  ] }),
  component: () => (<>
    <PageHeader eyebrow="How it works" title={<>A clear path from <span className="text-gradient">idea to impact.</span></>} text="No black boxes. Every stage has agreed scope, deliverables and success measures." />
    <HowItWorks /><Faqs />
  </>),
});
