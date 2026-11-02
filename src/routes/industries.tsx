import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/primitives";
import { Industries, Problems } from "@/components/site/Sections";

export const Route = createFileRoute("/industries")({
  head: () => ({ meta: [
    { title: "Industries — Estate, Lettings & Property Management | Keystone AI" },
    { name: "description", content: "AI solutions tailored to UK estate agents, letting agencies and property management companies." },
    { property: "og:title", content: "AI for Estate Agents, Letting Agencies & Property Managers" },
    { property: "og:description", content: "Industry-specific AI for UK property businesses." },
  ] }),
  component: () => (<>
    <PageHeader eyebrow="Industries" title={<>Specialists in <span className="text-gradient">UK property.</span></>} text="Sales, lettings and management each have different pressures. Our solutions are configured for yours." />
    <Industries /><Problems />
  </>),
});
