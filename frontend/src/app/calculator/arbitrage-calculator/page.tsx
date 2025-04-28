'use client';

import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

// Helper function to convert American odds to decimal
const americanToDecimal = (american: number): number => {
  if (american > 0) {
    return Number(((american / 100) + 1).toFixed(2));
  } else {
    return Number(((-100 / american) + 1).toFixed(2));
  }
};

// Helper function to convert decimal odds to American
const decimalToAmerican = (decimal: number): number => {
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100);
  } else {
    return Math.round(-100 / (decimal - 1));
  }
};

// Helper function to format American odds
const formatAmericanOdds = (odds: number): string => {
  return odds > 0 ? `+${odds}` : `${odds}`;
};

// Helper function to calculate implied probability from decimal odds
const decimalToImpliedProbability = (decimal: number): number => {
  return Number(((1 / decimal) * 100).toFixed(2));
};

// Calculate arbitrage
const calculateArbitrage = (
  odds1: number,
  odds2: number,
  totalStake: number
): {
  arbitrageExists: boolean;
  impliedProbability1: number;
  impliedProbability2: number;
  totalImpliedProbability: number;
  profit: number;
  profitPercentage: number;
  stake1: number;
  stake2: number;
  return1: number;
  return2: number;
} => {
  // Calculate implied probabilities for each outcome
  const impliedProb1 = decimalToImpliedProbability(odds1);
  const impliedProb2 = decimalToImpliedProbability(odds2);
  const totalImpliedProb = impliedProb1 + impliedProb2;
  
  // Determine if arbitrage opportunity exists (total implied probability < 100%)
  const arbitrageExists = totalImpliedProb < 100;
  
  // Calculate optimal stakes for each outcome
  const stake1 = (impliedProb1 / totalImpliedProb) * totalStake;
  const stake2 = (impliedProb2 / totalImpliedProb) * totalStake;
  
  // Calculate potential returns
  const return1 = stake1 * odds1;
  const return2 = stake2 * odds2;
  
  // Calculate profit
  const profit = return1 - totalStake; // Should be the same as (return2 - totalStake)
  const profitPercentage = (profit / totalStake) * 100;
  
  return {
    arbitrageExists,
    impliedProbability1: impliedProb1,
    impliedProbability2: impliedProb2,
    totalImpliedProbability: totalImpliedProb,
    profit,
    profitPercentage,
    stake1,
    stake2,
    return1,
    return2
  };
};

export default function ArbitrageCalculator() {
  const [oddsFormat, setOddsFormat] = useState<'american' | 'decimal'>('american');
  const [odds1, setOdds1] = useState<string>('');
  const [odds2, setOdds2] = useState<string>('');
  const [totalStake, setTotalStake] = useState<string>('1000');
  const [bookmaker1, setBookmaker1] = useState<string>('Bookmaker A');
  const [bookmaker2, setBookmaker2] = useState<string>('Bookmaker B');
  const [arbitrageResult, setArbitrageResult] = useState<{
    arbitrageExists: boolean;
    impliedProbability1: number;
    impliedProbability2: number;
    totalImpliedProbability: number;
    profit: number;
    profitPercentage: number;
    stake1: number;
    stake2: number;
    return1: number;
    return2: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateArbitrageBet = () => {
    setErrorMessage(null);
    
    if (!odds1 || !odds2 || !totalStake) {
      setErrorMessage('Please enter all required fields');
      return;
    }

    try {
      // Parse inputs
      const stakeAmount = parseFloat(totalStake);
      
      if (isNaN(stakeAmount) || stakeAmount <= 0) {
        throw new Error('Total stake must be a positive number');
      }
      
      // Convert odds to decimal format
      let decimalOdds1: number;
      let decimalOdds2: number;
      
      if (oddsFormat === 'american') {
        const americanOdds1 = parseFloat(odds1);
        const americanOdds2 = parseFloat(odds2);
        
        if (isNaN(americanOdds1) || isNaN(americanOdds2)) {
          throw new Error('Please enter valid odds');
        }
        
        decimalOdds1 = americanToDecimal(americanOdds1);
        decimalOdds2 = americanToDecimal(americanOdds2);
      } else {
        decimalOdds1 = parseFloat(odds1);
        decimalOdds2 = parseFloat(odds2);
        
        if (isNaN(decimalOdds1) || isNaN(decimalOdds2) || 
            decimalOdds1 < 1 || decimalOdds2 < 1) {
          throw new Error('Decimal odds must be 1.00 or greater');
        }
      }
      
      // Calculate arbitrage
      const result = calculateArbitrage(decimalOdds1, decimalOdds2, stakeAmount);
      
      // Round results to two decimal places
      setArbitrageResult({
        arbitrageExists: result.arbitrageExists,
        impliedProbability1: parseFloat(result.impliedProbability1.toFixed(2)),
        impliedProbability2: parseFloat(result.impliedProbability2.toFixed(2)),
        totalImpliedProbability: parseFloat(result.totalImpliedProbability.toFixed(2)),
        profit: parseFloat(result.profit.toFixed(2)),
        profitPercentage: parseFloat(result.profitPercentage.toFixed(2)),
        stake1: parseFloat(result.stake1.toFixed(2)),
        stake2: parseFloat(result.stake2.toFixed(2)),
        return1: parseFloat(result.return1.toFixed(2)),
        return2: parseFloat(result.return2.toFixed(2))
      });
      
    } catch (error) {
      setErrorMessage((error as Error).message || 'An error occurred during calculation');
      setArbitrageResult(null);
    }
  };

  return (
    <PageLayout>
      <div className="relative isolate">
        {/* Background blob */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 -z-10 transform-gpu blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1108/632] w-[40rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-15"
          />
        </div>
        
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <a href="/calculator" className="text-sky-300 hover:text-sky-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </a>
              <h1 className="text-4xl font-bold tracking-tight">Arbitrage Calculator</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Calculate arbitrage opportunities across different sportsbooks to lock in risk-free profits. 
              An arbitrage bet (or "sure bet") allows you to profit regardless of the outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-6">Arbitrage Calculator</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Odds Format</label>
                  <div className="grid grid-cols-2 gap-3 max-w-xs">
                    <button 
                      type="button"
                      onClick={() => setOddsFormat('american')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        oddsFormat === 'american' 
                          ? 'bg-sky-800 text-white' 
                          : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      American
                    </button>
                    <button 
                      type="button"
                      onClick={() => setOddsFormat('decimal')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        oddsFormat === 'decimal' 
                          ? 'bg-sky-800 text-white' 
                          : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      Decimal
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-base font-medium text-white mb-3">Total Investment</h3>
                  <div className="max-w-xs">
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="total-stake"
                        id="total-stake"
                        value={totalStake}
                        onChange={(e) => setTotalStake(e.target.value)}
                        className="block w-full rounded-md border-0 bg-slate-800 py-1.5 pl-7 pr-12 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-sky-500 sm:text-sm sm:leading-6"
                        placeholder="1000"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      Enter the total amount you want to invest across both bets.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-base font-medium text-white mb-3">Outcome 1</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="bookmaker1" className="block text-sm font-medium text-gray-300 mb-1">
                          Bookmaker Name (Optional)
                        </label>
                        <input
                          id="bookmaker1"
                          type="text"
                          value={bookmaker1}
                          onChange={(e) => setBookmaker1(e.target.value)}
                          placeholder="e.g., DraftKings"
                          className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="odds1" className="block text-sm font-medium text-gray-300 mb-1">
                          Odds
                        </label>
                        <input
                          id="odds1"
                          type="text"
                          value={odds1}
                          onChange={(e) => setOdds1(e.target.value)}
                          placeholder={oddsFormat === 'american' ? "e.g., -110" : "e.g., 1.91"}
                          className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-white mb-3">Outcome 2</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="bookmaker2" className="block text-sm font-medium text-gray-300 mb-1">
                          Bookmaker Name (Optional)
                        </label>
                        <input
                          id="bookmaker2"
                          type="text"
                          value={bookmaker2}
                          onChange={(e) => setBookmaker2(e.target.value)}
                          placeholder="e.g., FanDuel"
                          className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="odds2" className="block text-sm font-medium text-gray-300 mb-1">
                          Odds
                        </label>
                        <input
                          id="odds2"
                          type="text"
                          value={odds2}
                          onChange={(e) => setOdds2(e.target.value)}
                          placeholder={oddsFormat === 'american' ? "e.g., +110" : "e.g., 2.10"}
                          className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateArbitrageBet}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-sky-300 text-slate-950 font-medium hover:bg-blue-500 transition-colors"
                >
                  Calculate Arbitrage
                </button>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-900/30 border border-red-500/20 rounded-md text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                {arbitrageResult && (
                  <div className="mt-6">
                    {!arbitrageResult.arbitrageExists ? (
                      <div className="p-4 rounded-lg bg-red-900/30 border border-red-500/20">
                        <h3 className="text-lg font-medium text-red-400 mb-2">No Arbitrage Opportunity</h3>
                        <p className="text-sm text-gray-300">
                          The total implied probability is {arbitrageResult.totalImpliedProbability}%, which is greater than 100%. 
                          An arbitrage opportunity exists only when the total implied probability is less than 100%.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 rounded-lg bg-emerald-900/30 border border-emerald-500/20 mb-4">
                          <h3 className="text-lg font-medium text-emerald-400 mb-2">Arbitrage Opportunity Found!</h3>
                          <p className="text-sm text-gray-300">
                            The total implied probability is {arbitrageResult.totalImpliedProbability}% (less than 100%), 
                            indicating a guaranteed profit of ${arbitrageResult.profit} ({arbitrageResult.profitPercentage}% ROI).
                          </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800/50">
                          <h3 className="text-lg font-medium mb-4">Suggested Bets</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-slate-800/80 rounded-lg p-4">
                              <h4 className="font-medium text-sky-300 mb-3">{bookmaker1} Bet</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Stake:</span>
                                  <span className="font-medium text-white">${arbitrageResult.stake1}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Implied Probability:</span>
                                  <span className="font-medium text-white">{arbitrageResult.impliedProbability1}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Potential Return:</span>
                                  <span className="font-medium text-emerald-400">${arbitrageResult.return1}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-slate-800/80 rounded-lg p-4">
                              <h4 className="font-medium text-sky-300 mb-3">{bookmaker2} Bet</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Stake:</span>
                                  <span className="font-medium text-white">${arbitrageResult.stake2}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Implied Probability:</span>
                                  <span className="font-medium text-white">{arbitrageResult.impliedProbability2}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Potential Return:</span>
                                  <span className="font-medium text-emerald-400">${arbitrageResult.return2}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">What is Arbitrage Betting?</h2>
                
                <p className="text-sm text-gray-400 mb-4">
                  Arbitrage betting or "sure betting" is a strategy where you place bets on all possible outcomes of an event 
                  at odds that guarantee a profit regardless of the result.
                </p>
                
                <h3 className="font-medium text-sky-300 mt-4">How It Works</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Arbitrage opportunities arise when different bookmakers have different opinions on the same event, 
                  resulting in odds discrepancies. By betting proportionally on all outcomes, you can lock in a profit.
                </p>
                
                <h3 className="font-medium text-sky-300 mt-4">Key Indicators</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li>• Total implied probability less than 100%</li>
                  <li>• Higher odds than market average on opposing outcomes</li>
                  <li>• Bookmakers with significantly different odds</li>
                </ul>
                
                <div className="mt-4 p-3 bg-slate-800/50 rounded-md">
                  <h3 className="font-medium text-sky-300 mb-1">Formula</h3>
                  <p className="text-sm text-gray-300">
                    If the sum of inverse odds (1/decimal odds) across all outcomes is less than 1 or 100%, 
                    an arbitrage opportunity exists.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">Arbitrage Tips</h2>
                
                <div className="text-sm text-gray-400 space-y-4">
                  <p>
                    <span className="text-white">Act Quickly:</span> Arbitrage opportunities often disappear fast as bookmakers adjust their odds.
                  </p>
                  
                  <p>
                    <span className="text-white">Consider Fees:</span> Account for withdrawal or deposit fees when calculating potential profit.
                  </p>
                  
                  <p>
                    <span className="text-white">Beware of Limits:</span> Bookmakers may limit accounts that frequently exploit arbitrage opportunities.
                  </p>
                  
                  <p>
                    <span className="text-white">Watch for Voided Bets:</span> If one side of your arbitrage is voided, you could be exposed to a loss on the other side.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">When to Look for Arbitrage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">1</div>
                <h3 className="text-xl font-medium mb-2">Market Movement</h3>
                <p className="text-gray-400">
                  During times of significant line movement or breaking news, bookmakers may adjust their odds at different rates, creating temporary arbitrage windows.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">2</div>
                <h3 className="text-xl font-medium mb-2">Niche Markets</h3>
                <p className="text-gray-400">
                  Less popular sports or bet types often have more price variation between bookmakers due to lower liquidity and less attention from oddsmakers.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">3</div>
                <h3 className="text-xl font-medium mb-2">Promotional Odds</h3>
                <p className="text-gray-400">
                  Bookmakers offering boosted odds or promotions can create excellent arbitrage opportunities when compared against standard market prices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}