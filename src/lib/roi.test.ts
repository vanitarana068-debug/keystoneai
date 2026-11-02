import { describe, it, expect } from "vitest";
import { estimateOpportunity } from "./roi";

describe("estimateOpportunity", () => {
  it("computes missed, recovered and value from assumptions", () => {
    const r = estimateOpportunity({ monthlyEnquiries: 400, missedCallRate: 25, instructionValue: 3000, conversionRate: 5, recoveryRate: 50 });
    expect(r.missed).toBe(100);
    expect(r.recovered).toBe(50);
    expect(r.extraInstructions).toBe(2.5);
    expect(r.monthlyValue).toBe(7500);
    expect(r.annualValue).toBe(90000);
  });
});
