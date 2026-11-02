import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LEAD, saveLead } from "./airtable";

describe("saveLead", () => {
  const fetchMock = vi.fn();
  beforeEach(() => { vi.stubGlobal("fetch", fetchMock); fetchMock.mockReset(); });
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it("skips Airtable (and warns) when no token is configured", async () => {
    vi.stubEnv("AIRTABLE_TOKEN", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(await saveLead({ [LEAD.name]: "A" })).toEqual({ saved: false });
    expect(fetchMock).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("posts one typecast record to the Leads table and drops empty fields", async () => {
    vi.stubEnv("AIRTABLE_TOKEN", "test-token");
    fetchMock.mockResolvedValue({ ok: true });
    await saveLead({ [LEAD.name]: "Jo", [LEAD.phone]: "", [LEAD.landing]: undefined, [LEAD.source]: "Website Inbound" });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://api.airtable.com/v0/appjlaTzXpCr5vODI/tblUUowR7bF3xOOFl");
    expect(init.headers.Authorization).toBe("Bearer test-token");
    expect(JSON.parse(init.body)).toEqual({
      records: [{ fields: { [LEAD.name]: "Jo", [LEAD.source]: "Website Inbound" } }],
      typecast: true,
    });
  });

  it("throws when Airtable rejects the request so the form can show an error", async () => {
    vi.stubEnv("AIRTABLE_TOKEN", "test-token");
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResolvedValue({ ok: false, status: 403, text: async () => "denied" });
    await expect(saveLead({ [LEAD.name]: "Jo" })).rejects.toThrow();
  });
});
