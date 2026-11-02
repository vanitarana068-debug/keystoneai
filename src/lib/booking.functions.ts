import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "./booking";
import { LEAD, landingUrl, saveLead, today } from "./airtable";

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // silently drop bots

    const when = new Date(`${data.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const { saved } = await saveLead({
      [LEAD.name]: data.name,
      [LEAD.email]: data.email,
      [LEAD.phone]: data.phone,
      [LEAD.company]: data.agency,
      [LEAD.source]: "Website Inbound",
      [LEAD.status]: "New",
      [LEAD.priority]: "Hot", // an explicit demo request is high intent
      [LEAD.captured]: today(),
      [LEAD.detail]: "Free demo booking form",
      [LEAD.landing]: landingUrl("/#book-demo"),
      [LEAD.followUp]: data.date, // the requested demo day
      [LEAD.notes]: `Free demo requested for ${when} at ${data.time} (UK time).`,
    });
    console.log("[demo-booking]", { date: data.date, time: data.time, savedToAirtable: saved, at: new Date().toISOString() });
    return { ok: true as const };
  });
