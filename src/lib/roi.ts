export type RoiInputs = {
  monthlyEnquiries: number;
  missedCallRate: number; // % of enquiries missed
  instructionValue: number; // £ average fee per instruction
  conversionRate: number; // % of enquiries that become instructions
  recoveryRate: number; // % of missed enquiries AI could recover (assumption)
};

export function estimateOpportunity(i: RoiInputs) {
  const missed = (i.monthlyEnquiries * i.missedCallRate) / 100;
  const recovered = (missed * i.recoveryRate) / 100;
  const extraInstructions = (recovered * i.conversionRate) / 100;
  const monthlyValue = extraInstructions * i.instructionValue;
  return {
    missed: Math.round(missed),
    recovered: Math.round(recovered),
    extraInstructions: Math.round(extraInstructions * 10) / 10,
    monthlyValue: Math.round(monthlyValue),
    annualValue: Math.round(monthlyValue * 12),
  };
}
