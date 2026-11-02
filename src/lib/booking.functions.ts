import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "./booking";

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // silently drop bots
    // Validated server-side. Connect calendar/email delivery here.
    console.log("[demo-booking]", { date: data.date, time: data.time, at: new Date().toISOString() });
    return { ok: true as const };
  });
