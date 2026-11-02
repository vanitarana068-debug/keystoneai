import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // silently drop bots
    // Validated server-side. Connect storage/email delivery here.
    console.log("[enquiry]", { intent: data.intent, type: data.type, at: new Date().toISOString() });
    return { ok: true as const };
  });
