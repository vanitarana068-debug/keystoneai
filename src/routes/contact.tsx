import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/site/primitives";
import { ContactForm } from "@/components/site/ContactForm";

const search = z.object({ intent: z.enum(["strategy-call", "audit", "implementation", "general"]).optional() });

export const Route = createFileRoute("/contact")({
  validateSearch: (s) => search.parse(s),
  head: () => ({ meta: [
    { title: "Book Your Free AI Strategy Call | Keystone AI" },
    { name: "description", content: "Book a free 45-minute AI strategy call for your estate or letting agency, or send us an enquiry." },
    { property: "og:title", content: "Book a Free AI Strategy Call" },
    { property: "og:description", content: "No-obligation call to find AI opportunities in your agency." },
  ] }),
  component: Contact,
});

function Contact() {
  const { intent } = Route.useSearch();
  return (<>
    <PageHeader eyebrow="Contact" title={<>Let's find your <span className="text-gradient">missed opportunities.</span></>} text="Tell us about your agency and we'll arrange your free strategy call." />
    <section className="px-6 pb-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_2fr]">
        <ul className="space-y-4">
          {[{ i: CalendarCheck, t: "45-minute call", d: "Video or phone, at a time that suits you." }, { i: Clock, t: "Reply within 1 working day", d: "We'll confirm your slot by email." }, { i: ShieldCheck, t: "Your data stays private", d: "Used only to respond to your enquiry." }].map((x) => (
            <li key={x.t} className="glass flex gap-4 rounded-2xl p-5"><x.i className="h-6 w-6 shrink-0 text-cyan" /><div><p className="font-semibold">{x.t}</p><p className="text-sm text-muted-foreground">{x.d}</p></div></li>
          ))}
        </ul>
        <ContactForm intent={intent ?? "strategy-call"} />
      </div>
    </section>
  </>);
}
