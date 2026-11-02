import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/primitives";
import { Faqs } from "@/components/site/Sections";
import { BookDemo } from "@/components/site/BookDemo";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "Book a Free Demo | Keystone AI" },
    { name: "description", content: "Book a free 30-minute live demo of AI reception, lead capture and follow-up tools for UK estate agencies." },
    { property: "og:title", content: "Book a Free Keystone AI Demo" },
    { property: "og:description", content: "See the AI tools working on real estate-agency scenarios." },
  ] }),
  component: () => (<>
    <PageHeader eyebrow="Free demo" title={<>See it working <span className="text-gradient">before you commit.</span></>} text="Pick a time for a free 30-minute walkthrough. No obligation, no jargon." />
    <BookDemo /><Faqs />
  </>),
});
