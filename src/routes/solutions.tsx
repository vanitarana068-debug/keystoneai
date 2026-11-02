import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/primitives";
import { SolutionsGrid, Workflow } from "@/components/site/Sections";
import { RoiCalculator } from "@/components/site/RoiCalculator";

export const Route = createFileRoute("/solutions")({
  head: () => ({ meta: [
    { title: "AI Solutions for Estate Agents | Keystone AI" },
    { name: "description", content: "AI voice receptionist, lead qualification, CRM automation, WhatsApp follow-ups, booking, marketing and analytics for UK agencies." },
    { property: "og:title", content: "AI Solutions for UK Estate Agents" },
    { property: "og:description", content: "Seven AI systems that capture enquiries and remove admin." },
  ] }),
  component: () => (<>
    <PageHeader eyebrow="Solutions" title={<>AI that works <span className="text-gradient">the way agents do.</span></>} text="Modular solutions you can adopt one at a time — each designed around real estate and lettings workflows." />
    <SolutionsGrid /><Workflow /><RoiCalculator />
  </>),
});
