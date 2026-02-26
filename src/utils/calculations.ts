export function calculateSIP(monthlyInvestment: number, expectedReturnRate: number, timePeriodYears: number) {
  const n = timePeriodYears * 12;
  const investedAmount = monthlyInvestment * n;
  
  if (expectedReturnRate === 0) {
    return { investedAmount, estimatedReturns: 0, totalValue: investedAmount };
  }

  // Groww uses CAGR derived monthly rate, not simple division by 12
  const annualRate = expectedReturnRate / 100;
  const i = Math.pow(1 + annualRate, 1 / 12) - 1;
  
  const totalValue = Math.round(monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const estimatedReturns = totalValue - investedAmount;
  
  return { investedAmount, estimatedReturns, totalValue };
}

export function calculateLumpsum(totalInvestment: number, expectedReturnRate: number, timePeriodYears: number) {
  if (expectedReturnRate === 0) {
    return { investedAmount: totalInvestment, estimatedReturns: 0, totalValue: totalInvestment };
  }

  const i = expectedReturnRate / 100;
  const n = timePeriodYears;
  const totalValue = Math.round(totalInvestment * Math.pow(1 + i, n));
  const estimatedReturns = totalValue - totalInvestment;
  
  return { investedAmount: totalInvestment, estimatedReturns, totalValue };
}
