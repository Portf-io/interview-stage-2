import { evaluate, mockPortfolios, mockRules } from './index';
import { Portfolio, Rule, EvaluationResult } from './types';

describe('Portfolio Evaluation', () => {
  describe('evaluate function', () => {
    // This test is still relevant until 'evaluate' is fully implemented for new rules
    it('should throw "Not implemented" error if rule type processing is not implemented', async () => {
      const portfolioToTest: Portfolio = mockPortfolios[0];
      // Using a generic rule here, assuming the function might still throw if a type is unhandled.
      // Or, this test might need to be more specific based on how evaluate is structured.
      const rulesToTest: Rule[] = [{ id: 'TEST_RULE', type: 'cash_runway', config: {} }]; 

      await expect(evaluate(portfolioToTest, rulesToTest))
        .rejects
        .toThrow('Not implemented');
    });

    describe('Rule: CASH_RUNWAY_MIN_6_MONTHS', () => {
      it('should PASS for INV001 as all companies have >= 6 months cash runway', async () => {
        const portfolioToTest: Portfolio = mockPortfolios[0];
        const ruleToTest = mockRules.find(r => r.id === 'CASH_RUNWAY_MIN_6_MONTHS');
        if (!ruleToTest) throw new Error('Rule CASH_RUNWAY_MIN_6_MONTHS not found');

        // Expected outcome based on manual calculation:
        // CompA: 1M / 150k = 6.67 (Pass)
        // CompB: 3M / 250k = 12 (Pass)
        // CompC: 500k / 50k = 10 (Pass)
        // CompD: 2M / 100k = 20 (Pass)
        // All pass, so portfolio passes.

        const results: EvaluationResult[] = await evaluate(portfolioToTest, [ruleToTest]);
        expect(results).toHaveLength(1);
        expect(results[0].ruleId).toBe('CASH_RUNWAY_MIN_6_MONTHS');
        expect(results[0].passed).toBe(true);
        // Optional: check message if evaluate provides one for this case
        // expect(results[0].message).toBe('All companies meet the minimum cash runway of 6 months.');
      });
    });

    describe('Rule: ESG_SCORE_MIN_70', () => {
      it('should FAIL for INV001 as Company C has ESG < 70 (assuming rule requires all companies to meet threshold)', async () => {
        const portfolioToTest: Portfolio = mockPortfolios[0];
        const ruleToTest = mockRules.find(r => r.id === 'ESG_SCORE_MIN_70');
        if (!ruleToTest) throw new Error('Rule ESG_SCORE_MIN_70 not found');
        
        // Expected outcome based on manual calculation (assuming portfolio fails if any company fails):
        // CompA: ESG 75 (Ok)
        // CompB: ESG 85 (Ok)
        // CompC: ESG 60 (Fail!)
        // CompD: ESG 70 (Ok)
        // Portfolio fails because of Company C.

        const results: EvaluationResult[] = await evaluate(portfolioToTest, [ruleToTest]);
        expect(results).toHaveLength(1);
        expect(results[0].ruleId).toBe('ESG_SCORE_MIN_70');
        expect(results[0].passed).toBe(false);
        // Optional: check message if evaluate provides one for this case
        // expect(results[0].message).toContain('Company C (AGG) has an ESG score of 60, which is below the threshold of 70.');
      });
    });
  });
});

// TODO: Re-enable and update tests once new mockRules are defined and evaluate function is adapted.
describe('Tests placeholder', () => {
  it('should have tests re-enabled and updated later', () => {
    expect(true).toBe(true);
  });
}); 