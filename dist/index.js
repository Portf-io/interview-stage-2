"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mock Data
const mockPortfolios = [
    {
        investorId: 'INV001',
        totalValue: 100000,
        holdings: [
            { symbol: 'AAPL', category: 'equity', value: 30000 },
            { symbol: 'MSFT', category: 'equity', value: 25000 },
            { symbol: 'AGG', category: 'debt', value: 35000 },
            { symbol: 'CASH', category: 'cash', value: 10000 },
        ],
    },
    {
        investorId: 'INV002',
        totalValue: 250000,
        holdings: [
            { symbol: 'TSLA', category: 'equity', value: 100000 },
            { symbol: 'GOOG', category: 'equity', value: 75000 },
            { symbol: 'SHY', category: 'debt', value: 50000 },
            { symbol: 'CASH', category: 'cash', value: 25000 },
        ],
    },
];
const mockRules = [
    {
        id: 'RULE001',
        type: 'exposure_threshold',
        config: {
            category: 'equity',
            maxPercentage: 60, // Max 60% of total portfolio value in equity
        },
    },
    {
        id: 'RULE002',
        type: 'minimum_cash_buffer',
        config: {
            minPercentage: 5, // Min 5% of total portfolio value in cash
        },
    },
    {
        id: 'RULE003',
        type: 'exposure_threshold',
        config: {
            symbol: 'TSLA',
            maxPercentage: 30, // Max 30% of total portfolio value in a single stock (TSLA)
        },
    },
];
// Function to be implemented by the candidate
async function evaluate(portfolio, rules) {
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
        }
        catch (error) {
            console.error('Error during evaluation:', error);
        }
    }
}
// Run the example
main().catch(console.error);
