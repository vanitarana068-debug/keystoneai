import {
  PhoneCall, Filter, Database, MessageCircle, CalendarCheck, Megaphone, BarChart3,
  type LucideIcon,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type Solution = { id: string; icon: LucideIcon; title: string; short: string; points: string[] };

export const SOLUTIONS: Solution[] = [
  { id: "voice", icon: PhoneCall, title: "AI Voice Receptionist", short: "Answers calls 24/7, books viewings and captures caller details when your team is busy.", points: ["Natural UK-English voice", "Handles viewings, valuations and maintenance calls", "Warm transfer to your negotiators", "Call summaries sent to your CRM"] },
  { id: "qualify", icon: Filter, title: "AI Lead Qualification", short: "Scores buyers, sellers, landlords and tenants so negotiators focus on the right conversations.", points: ["Mortgage position & chain status", "Budget and area matching", "Landlord portfolio size", "Priority alerts for hot leads"] },
  { id: "crm", icon: Database, title: "CRM Automation", short: "Keeps your property CRM up to date without manual data entry.", points: ["Works alongside common UK property CRMs", "Automatic contact & enquiry logging", "Duplicate detection", "Task creation for negotiators"] },
  { id: "follow", icon: MessageCircle, title: "WhatsApp & Email Follow-ups", short: "Timely, personalised follow-ups that keep applicants and vendors engaged.", points: ["Instant enquiry acknowledgement", "Viewing reminders & feedback requests", "Nurture sequences for future sellers", "GDPR-conscious opt-in handling"] },
  { id: "booking", icon: CalendarCheck, title: "AI Appointment Booking", short: "Books viewings and valuations directly into negotiator diaries.", points: ["Diary-aware scheduling", "Automatic confirmations", "Rescheduling by message", "No-show reduction reminders"] },
  { id: "marketing", icon: Megaphone, title: "AI Marketing Automation", short: "Generates listing copy, social posts and campaigns that win instructions.", points: ["Listing descriptions in your tone", "Just-listed / just-sold campaigns", "Market update emails", "Valuation lead magnets"] },
  { id: "analytics", icon: BarChart3, title: "Business Analytics", short: "Clear dashboards showing enquiries, response times and pipeline performance.", points: ["Response-time tracking", "Source-of-enquiry reporting", "Negotiator activity insights", "Weekly performance summaries"] },
];

export const STEPS = [
  { n: "01", title: "Discover", text: "We audit how enquiries arrive, how fast they're handled, and where opportunities are lost across calls, portals, email and WhatsApp." },
  { n: "02", title: "Strategy", text: "A prioritised AI roadmap with clear scope, costs and success measures agreed with you before anything is built." },
  { n: "03", title: "Implementation", text: "We configure, integrate and test each solution with your team, your branches and your existing systems." },
  { n: "04", title: "Optimisation", text: "Monthly reviews of real performance data, refining scripts, workflows and automations as your agency grows." },
];

export const INDUSTRIES = [
  { id: "estate", title: "Estate Agents", text: "Capture every valuation request and buyer enquiry, qualify applicants and keep vendors informed.", uses: ["Out-of-hours valuation booking", "Buyer qualification & chain checks", "Vendor progress updates", "Portal enquiry instant response"] },
  { id: "lettings", title: "Letting Agencies", text: "Handle high volumes of tenant enquiries and landlord leads without overloading your team.", uses: ["Tenant pre-qualification", "Viewing scheduling at scale", "Landlord acquisition nurture", "Referencing status updates"] },
  { id: "pm", title: "Property Management", text: "Triage maintenance, route urgent issues and reduce repetitive tenant calls.", uses: ["24/7 maintenance call triage", "Contractor job notifications", "Rent & renewal reminders", "Compliance date tracking"] },
];

export const PACKAGES = [
  { name: "Strategy Session", price: "Free", period: "45 minutes", desc: "A no-obligation call to review your enquiry handling and identify AI opportunities.", features: ["Enquiry flow review", "Top 3 opportunity areas", "Indicative costs", "No sales pressure"], cta: "Book free call", featured: false },
  { name: "AI Audit & Roadmap", price: "From £1,500", period: "one-off", desc: "A detailed audit of your agency operations with a costed implementation roadmap.", features: ["Call & enquiry analysis", "Systems & CRM review", "Prioritised AI roadmap", "ROI assumptions documented"], cta: "Request an audit", featured: true },
  { name: "Implementation & Care", price: "Custom", period: "scoped per agency", desc: "We build, integrate and continuously optimise your AI solutions.", features: ["Solution build & integration", "Staff onboarding", "Monthly optimisation", "Priority support"], cta: "Discuss your project", featured: false },
];

export const FAQS = [
  { q: "Will AI replace my negotiators or lettings team?", a: "No. Our solutions handle repetitive tasks like answering routine calls, logging enquiries and sending follow-ups, so your people can spend more time on valuations, viewings and relationships." },
  { q: "Does it work with our existing CRM?", a: "We assess your current systems during discovery. Many UK property CRMs offer integrations or APIs; where they don't, we'll be transparent about what's achievable." },
  { q: "Is it GDPR compliant?", a: "We design every solution with UK GDPR in mind — including data minimisation, lawful basis, call recording notices and data processing agreements. We'll work with your compliance lead." },
  { q: "How long does implementation take?", a: "It depends on scope. A single solution such as an AI receptionist can typically be piloted within a few weeks; broader programmes are phased. We confirm timelines in your roadmap." },
  { q: "What does it cost?", a: "The strategy call is free. Audits start from £1,500 and implementation is scoped per agency so you only pay for what you need." },
  { q: "Are the figures on this site real results?", a: "No. All dashboard figures and calculator outputs are clearly labelled demonstrations or estimates. We will only publish client results with verified evidence and permission." },
];
