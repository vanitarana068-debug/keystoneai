import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact";
import { LEAD, landingUrl, saveLead, today } from "./airtable";

const INTENT_LABEL = {
  "strategy-call": "Free AI strategy call",
  audit: "AI audit & roadmap",
  implementation: "Implementation project",
  general: "General enquiry",
} as const;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // silently drop bots

    const { saved } = await saveLead({
      [LEAD.name]: data.name,
      [LEAD.email]: data.email,
      [LEAD.phone]: data.phone,
      [LEAD.company]: data.agency,
      [LEAD.source]: "Website Inbound",
      [LEAD.status]: "New",
      [LEAD.priority]: "Warm",
      [LEAD.captured]: today(),
      [LEAD.detail]: "Contact form",
      [LEAD.landing]: landingUrl("/contact"),
      [LEAD.notes]: [`Interested in: ${INTENT_LABEL[data.intent]}`, `Business type: ${data.type}`, data.message].filter(Boolean).join("\n\n"),
    });
    console.log("[enquiry]", { intent: data.intent, type: data.type, savedToAirtable: saved, at: new Date().toISOString() });
    return { ok: true as const };
  });
