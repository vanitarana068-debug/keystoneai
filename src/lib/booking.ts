import { z } from "zod";

export const DEMO_TIMES = ["09:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30"] as const;

export const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a day"),
  time: z.enum(DEMO_TIMES, { errorMap: () => ({ message: "Please choose a time" }) }),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).regex(/^[0-9+()\s-]*$/, "Enter a valid phone number").optional().or(z.literal("")),
  agency: z.string().trim().min(2, "Please enter your agency name").max(120),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can confirm your demo" }) }),
  website: z.string().max(0).optional(), // honeypot
});
export type BookingInput = z.infer<typeof bookingSchema>;

/** Next `count` weekdays starting tomorrow, as local YYYY-MM-DD strings. */
export function upcomingWeekdays(count: number, from = new Date()) {
  const days: Date[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days.map((x) => ({
    iso: `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`,
    weekday: x.toLocaleDateString("en-GB", { weekday: "short" }),
    day: x.getDate(),
    month: x.toLocaleDateString("en-GB", { month: "short" }),
    long: x.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
  }));
}
