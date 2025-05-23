export interface Company {
  id: string; // e.g., stock symbol or internal ID
  name: string;
  category: string; // e.g., "technology", "finance", "healthcare"
  revenue: number; // Annual revenue
  esgScore: number; // ESG score from 0-100
  cashReserves?: number; // Available cash reserves
  monthlyBurnRate?: number; // Monthly cash burn
}

export interface Portfolio {
  investorId: number;
  companies: Company[];
}

export type RuleType = 'custom_kpi_below' | 'cash_runway' | 'revenue_drop';

export interface Rule {
  id: string;
  investorId: number;
  type: RuleType;
  config: Record<string, unknown>;
}

// Evaluation result format
export interface EvaluationResult {
  ruleId: string;
  companyId: string;
  passed: boolean;
  message?: string;
}
