import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).regex(/^[0-9+()\s-]*$/, "Enter a valid phone number").optional().or(z.literal("")),
  agency: z.string().trim().min(2, "Please enter your agency name").max(120),
  type: z.enum(["Estate Agent", "Letting Agency", "Property Management", "Other"]),
  intent: z.enum(["strategy-call", "audit", "implementation", "general"]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can contact you" }) }),
  website: z.string().max(0).optional(), // honeypot
});
export type ContactInput = z.infer<typeof contactSchema>;
