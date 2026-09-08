import type { EMIPlan } from '@/types';

const PROCESSING_FEE_RATE = 0.02;

export function calculateEMIPlans(price: number): EMIPlan[] {
  const tenures = [3, 6, 9, 12, 18, 24];
  return tenures.map((tenure) => {
    const interestRate = tenure <= 6 ? 0 : tenure <= 12 ? 0.08 : 0.12;
    const interestAmount = Math.round((price * interestRate * tenure) / 12);
    const processingFee = Math.round(price * PROCESSING_FEE_RATE);
    const totalPayable = price + interestAmount + processingFee;
    const monthlyEMI = Math.round(totalPayable / tenure);
    return {
      tenure,
      monthlyEMI,
      interestRate,
      interestAmount,
      processingFee,
      totalPayable,
    };
  });
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(price: number, mrp: number): number {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
