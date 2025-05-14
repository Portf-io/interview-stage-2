import { EvaluationResult, Rule, Portfolio } from "./types";

// Mock Data
export const mockPortfolios: Portfolio[] = [
  {
    investorId: 1,
    companies: [
      { id: 'AAPL', name: 'Company A', category: 'technology', revenue: 5000000, esgScore: 75, cashReserves: 1000000, monthlyBurnRate: 150000 },
      { id: 'MSFT', name: 'Company B ', category: 'software', revenue: 12000000, esgScore: 85, cashReserves: 3000000, monthlyBurnRate: 250000 },
      { id: 'AGG', name: 'Company C ', category: 'sustainability', revenue: 2000000, esgScore: 60, cashReserves: 500000, monthlyBurnRate: 50000 },
      { id: 'CASH', name: 'Company D', category: 'fintech', revenue: 1000000, esgScore: 70, cashReserves: 2000000, monthlyBurnRate: 100000 },
    ],
  },
  {
    investorId: 2,
    companies: [
      { id: 'TSLA', name: 'Company E', category: 'manufacturing', revenue: 25000000, esgScore: 65, cashReserves: 5000000, monthlyBurnRate: 750000 },
      { id: 'GOOG', name: 'Company F', category: 'data analytics', revenue: 18000000, esgScore: 90, cashReserves: 6000000, monthlyBurnRate: 400000 },
      { id: 'SHY', name: 'Company G', category: 'logistics', revenue: 7000000, esgScore: 55, cashReserves: 1200000, monthlyBurnRate: 200000 },
      { id: 'CASH2', name: 'Company H', category: 'services', revenue: 3000000, esgScore: 80, cashReserves: 1500000, monthlyBurnRate: 120000 },
    ],
  },
];

export const mockRules: Rule[] = [
  {
    id: 'CASH_RUNWAY_MIN_6_MONTHS',
    investorId: 1,
    type: 'cash_runway',
    config: { 
      minMonths: 6 
    }
  },
  {
    id: 'ESG_SCORE_MIN_70',
    investorId: 2,
    type: 'custom_kpi_below', // Assuming this means the KPI must NOT be below the threshold (i.e., KPI >= threshold)
    config: { 
      kpiName: 'esgScore', 
      threshold: 70 
    }
  }
];

// Function to be implemented by the candidate
export async function evaluate(
  portfolio: Portfolio,
  rules: Rule[]
): Promise<EvaluationResult[]> {
  // This function will be implemented by the candidate
  console.log('Evaluating portfolio:', portfolio);
  console.log('Against rules:', rules);
  // Example:
  // For each rule, check against the portfolio
  // Return an array of EvaluationResult
  throw new Error('Not implemented');
}

async function main() {
  // Example usage: Evaluate each portfolio against all rules
  // In a real scenario, you would likely have a mapping of portfolios to specific rule sets
  for (const portfolio of mockPortfolios) {
    console.log(`\nEvaluating rules for investor ${portfolio.investorId}`);
    try {
      const results = await evaluate(portfolio, mockRules); // Passing all rules for simplicity
      console.log('Results:', results);
    } catch (error) {
      console.error('Error during evaluation:', error);
    }
  }
}

// Run the example
main().catch(console.error); 