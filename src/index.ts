import { EvaluationResult, Rule, Portfolio, RuleType } from './types';

// Mock Data
export const mockPortfolios: Portfolio[] = [
  {
    investorId: 1,
    companies: [
      {
        id: 'AAPL',
        name: 'Company A',
        category: 'technology',
        revenue: 5000000,
        esgScore: 75,
        cashReserves: 100000,
        monthlyBurnRate: 150000,
      },
      {
        id: 'MSFT',
        name: 'Company B ',
        category: 'software',
        revenue: 12000000,
        esgScore: 85,
        cashReserves: 3000000,
        monthlyBurnRate: 250000,
      },
      {
        id: 'AGG',
        name: 'Company C ',
        category: 'sustainability',
        revenue: 2000000,
        esgScore: 60,
        cashReserves: 500000,
        monthlyBurnRate: 50000,
      },
      {
        id: 'CASH',
        name: 'Company D',
        category: 'fintech',
        revenue: 1000000,
        esgScore: 70,
        cashReserves: 2000000,
        monthlyBurnRate: 100000,
      },
    ],
  },
  {
    investorId: 2,
    companies: [
      {
        id: 'TSLA',
        name: 'Company E',
        category: 'manufacturing',
        revenue: 25000000,
        esgScore: 65,
        cashReserves: 500000,
        monthlyBurnRate: 750000,
      },
      {
        id: 'GOOG',
        name: 'Company F',
        category: 'data analytics',
        revenue: 18000000,
        esgScore: 90,
        cashReserves: 6000000,
        monthlyBurnRate: 400000,
      },
      {
        id: 'SHY',
        name: 'Company G',
        category: 'logistics',
        revenue: 7000000,
        esgScore: 55,
        cashReserves: 1200000,
        monthlyBurnRate: 200000,
      },
      {
        id: 'CASH2',
        name: 'Company H',
        category: 'services',
        revenue: 3000000,
        esgScore: 80,
        cashReserves: 1500000,
        monthlyBurnRate: 120000,
      },
    ],
  },
];

export const mockRules: Rule[] = [
  {
    id: 'CASH_RUNWAY_MIN_6_MONTHS',
    investorId: 1,
    config: {
        ruleType: "cash_runway",
        minMonths: 6,
    },
  },
  {
    id: 'ESG_SCORE_MIN_70',
    investorId: 2,
    // type: 'custom_kpi_below', // Assuming this means the KPI must NOT be below the threshold (i.e., KPI >= threshold)
    config: {
        ruleType: "custom_kpi_below",
        kpiName: "esgScore",
        threshold: 70,
    },
  },
];

function handleCashRunway(portfolio: Portfolio, rule: Rule){

    const results: EvaluationResult[] = [];

    for(const company of portfolio.companies){

        if(!company.cashReserves || ! company.monthlyBurnRate){
            results.push({
                companyId: company.id,
                passed: false,
                ruleId: rule.id,
                message: "No cash reserves or monthly burn rate!"
            });

            continue;
        }

        const minMonths = rule.config.minMonths;

        const passed = company.cashReserves >= company.monthlyBurnRate * minMonths;

        results.push({
            companyId: company.id,
            passed,
            ruleId: rule.id,
        })
    }

    return results;
}

const handlerRules : Record < RuleType, any > = {
    "cash_runway" : handleCashRunway,
    "custom_kpi_below": ()=>{},
    "revenue_drop": ()=>{},
}

// Function to be implemented by the candidate
export async function evaluate(portfolio: Portfolio, rules: Rule[]) {

    const investorId = portfolio.investorId;
    
    const usedRules = rules.filter((rule)=>rule.investorId === investorId);

    const results: EvaluationResult[][] = [];

    const promises = [];

    for(const rules of usedRules){
        const ruleType = rules.config.ruleType;
        const ruleResults = handlerRules[ruleType](portfolio, rules);

        for(const ruleresult of ruleResults){

            if(!ruleresult.passed){
                const promise = sendMessage({company: ruleresult});
                promises.push(promise);
            }

        }

        results.push(ruleResults);
    }

    await Promise.all(promises);

    return results;
}

async function main() {
  for (const portfolio of mockPortfolios) {
    console.log(`\nEvaluating rules for investor ${portfolio.investorId}`);
    try {
      const results = await evaluate(portfolio, mockRules);
      console.log('Results:', results);
    } catch (error) {
      console.error('Error during evaluation:', error);
    }
  }
}

// Run the example
main().catch(console.error);
