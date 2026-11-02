// Server-side only: used from server-function handlers, never imported by browser code.
// Saves website leads into the "Leads" table of the Keystone AI Airtable base.

/** Airtable field IDs for the Leads table (IDs survive column renames). */
export const LEAD = {
  name: "fldzEqwfxwlADDOIX", // Lead Name
  email: "fld4V1cvRdyMSe2YT", // Email
  phone: "fldu2tCLlQWeYPnJy", // Phone
  company: "fldM7Vty3OoTNbQFy", // Company
  source: "fldGMsfwHidrfEw2I", // Lead Source (single select)
  status: "fld0Q3tFXubvpnsJ2", // Status (single select)
  priority: "fldqB3GTWOoYW9Iog", // Priority (single select)
  captured: "fldeyGF4wmIvgoq0L", // Date Captured
  detail: "fldDIfDWmv9N84aCk", // Campaign / Source Detail
  landing: "fldRHXSAqeM89sZKB", // Landing Page URL
  followUp: "fldzJJNwVQoDhlKNI", // Next Follow-up
  notes: "fldv7E2zOsmA5FTOc", // Message / Notes
} as const;

export type LeadFields = Partial<Record<(typeof LEAD)[keyof typeof LEAD], string | undefined>>;

/**
 * Creates one record in the Leads table. Needs AIRTABLE_TOKEN (server env only, see .env.example).
 * Without a token it logs a warning and returns saved:false so the site keeps working in development.
 * Throws if Airtable rejects the request, so the form can tell the visitor to try again instead of losing the lead.
 */
export async function saveLead(fields: LeadFields): Promise<{ saved: boolean }> {
  const token = process.env["AIRTABLE_TOKEN"]?.trim();
  if (!token) {
    console.warn("[airtable] AIRTABLE_TOKEN is not set, so this lead was NOT saved to Airtable.");
    return { saved: false };
  }
  const base = process.env["AIRTABLE_BASE_ID"]?.trim() || "appjlaTzXpCr5vODI";
  const table = process.env["AIRTABLE_TABLE_ID"]?.trim() || "tblUUowR7bF3xOOFl";

  const clean = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined && v !== ""));
  const res = await fetch(`https://api.airtable.com/v0/${base}/${table}`, {
    method: "POST",
    signal: AbortSignal.timeout(15_000),
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    // typecast lets Airtable match select options by name (e.g. "Website Inbound") instead of option IDs.
    body: JSON.stringify({ records: [{ fields: clean }], typecast: true }),
  });
  if (!res.ok) {
    console.error("[airtable] save failed", res.status, (await res.text()).slice(0, 300));
    throw new Error("Could not save lead");
  }
  return { saved: true };
}

/** Today's date as YYYY-MM-DD for Airtable date fields. */
export const today = () => new Date().toISOString().slice(0, 10);

/** Landing Page URL for the lead: the public site URL if configured (Airtable rejects non-URLs). */
export function landingUrl(path: string) {
  const site = process.env["SITE_URL"]?.trim().replace(/\/$/, "");
  return site ? `${site}${path}` : undefined;
}
