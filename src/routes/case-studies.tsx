import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/primitives";
import { CaseStudyPlaceholders } from "@/components/site/Sections";

export const Route = createFileRoute("/case-studies")({
  head: () => ({ meta: [
    { title: "Case Studies | Keystone AI" },
    { name: "description", content: "Verified case studies from UK agencies using AI. We only publish evidenced results with client permission." },
    { property: "og:title", content: "Keystone AI Case Studies" },
    { property: "og:description", content: "Verified results only — no invented statistics." },
  ] }),
  component: () => (<>
    <PageHeader eyebrow="Case studies" title={<>Evidence over <span className="text-gradient">hype.</span></>} text="We're onboarding our first pilot agencies. Verified results will be published here with their permission." />
    <CaseStudyPlaceholders />
  </>),
});
