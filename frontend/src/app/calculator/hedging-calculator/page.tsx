'use client';

import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

// Helper function to convert American odds to decimal
const americanToDecimal = (american: number): number => {
  if (american > 0) {
    return Number((american / 100 + 1).toFixed(2));
  } else {
    return Number((-100 / american + 1).toFixed(2));
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

// Calculate hedging bet
const calculateHedge = (
  originalStake: number,
  originalOdds: number,
  hedgeOdds: number,
  profitTarget: number | null
): {
  hedgeStake: number;
  guaranteedProfit: number;
  roi: number;
  originalPayout: number;
} => {
  // Original potential payout
  const originalPayout = originalStake * originalOdds;

  let hedgeStake: number;
  let guaranteedProfit: number;

  if (profitTarget !== null && profitTarget >= 0) {
    // Calculate hedge stake to achieve desired profit
    hedgeStake = (originalPayout - profitTarget) / hedgeOdds;
    guaranteedProfit = profitTarget;
  } else {
    // Calculate hedge stake for equal profit regardless of outcome
    hedgeStake = originalPayout / hedgeOdds;
    guaranteedProfit = originalPayout - hedgeStake;
  }

  // Calculate ROI
  const totalStaked = originalStake + hedgeStake;
  const roi = (guaranteedProfit / totalStaked) * 100;

  return {
    hedgeStake: hedgeStake,
    guaranteedProfit: guaranteedProfit,
    roi: roi,
    originalPayout: originalPayout,
  };
};

export default function HedgingCalculator() {
  const [oddsFormat, setOddsFormat] = useState<'american' | 'decimal'>('american');
  const [originalStake, setOriginalStake] = useState<string>('');
  const [originalOdds, setOriginalOdds] = useState<string>('');
  const [hedgeOdds, setHedgeOdds] = useState<string>('');
  const [profitTarget, setProfitTarget] = useState<string>('');
  const [useCustomProfit, setUseCustomProfit] = useState<boolean>(false);
  const [hedgeResult, setHedgeResult] = useState<{
    hedgeStake: number;
    guaranteedProfit: number;
    roi: number;
    originalPayout: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateHedgeBet = () => {
    setErrorMessage(null);

    if (!originalStake || !originalOdds || !hedgeOdds) {
      setErrorMessage('Please enter all required fields');
      return;
    }

    try {
      // Parse inputs
      const stake = parseFloat(originalStake);
      const customProfit = useCustomProfit && profitTarget ? parseFloat(profitTarget) : null;

      if (isNaN(stake) || stake <= 0) {
        throw new Error('Stake must be a positive number');
      }

      if (useCustomProfit && customProfit !== null && isNaN(customProfit)) {
        throw new Error('Target profit must be a number');
      }

      // Convert odds to decimal if needed
      let decimalOriginalOdds: number;
      let decimalHedgeOdds: number;

      if (oddsFormat === 'american') {
        const originalOddsNum = parseFloat(originalOdds);
        const hedgeOddsNum = parseFloat(hedgeOdds);

        if (isNaN(originalOddsNum) || isNaN(hedgeOddsNum)) {
          throw new Error('Please enter valid odds');
        }

        decimalOriginalOdds = americanToDecimal(originalOddsNum);
        decimalHedgeOdds = americanToDecimal(hedgeOddsNum);
      } else {
        decimalOriginalOdds = parseFloat(originalOdds);
        decimalHedgeOdds = parseFloat(hedgeOdds);

        if (
          isNaN(decimalOriginalOdds) ||
          isNaN(decimalHedgeOdds) ||
          decimalOriginalOdds < 1 ||
          decimalHedgeOdds < 1
        ) {
          throw new Error('Decimal odds must be 1.00 or greater');
        }
      }

      // Calculate hedge bet
      const result = calculateHedge(stake, decimalOriginalOdds, decimalHedgeOdds, customProfit);
      setHedgeResult({
        hedgeStake: parseFloat(result.hedgeStake.toFixed(2)),
        guaranteedProfit: parseFloat(result.guaranteedProfit.toFixed(2)),
        roi: parseFloat(result.roi.toFixed(2)),
        originalPayout: parseFloat(result.originalPayout.toFixed(2)),
      });
    } catch (error) {
      setErrorMessage((error as Error).message || 'An error occurred during calculation');
      setHedgeResult(null);
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </a>
              <h1 className="text-4xl font-bold tracking-tight">Hedging Calculator</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Calculate how to hedge your existing bet to guarantee a profit or minimize potential
              losses. This calculator helps you determine the optimal stake for your hedge bet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-6">Hedging Calculator</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Odds Format
                  </label>
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
                  <h3 className="text-base font-medium text-white mb-3">Original Bet Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="original-stake"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Original Stake ($)
                      </label>
                      <input
                        id="original-stake"
                        type="text"
                        value={originalStake}
                        onChange={e => setOriginalStake(e.target.value)}
                        placeholder="e.g., 100"
                        className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="original-odds"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Original Odds
                      </label>
                      <input
                        id="original-odds"
                        type="text"
                        value={originalOdds}
                        onChange={e => setOriginalOdds(e.target.value)}
                        placeholder={oddsFormat === 'american' ? 'e.g., +150' : 'e.g., 2.50'}
                        className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-medium text-white mb-3">Hedge Bet Details</h3>
                  <div>
                    <label
                      htmlFor="hedge-odds"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Hedge Odds
                    </label>
                    <input
                      id="hedge-odds"
                      type="text"
                      value={hedgeOdds}
                      onChange={e => setHedgeOdds(e.target.value)}
                      placeholder={oddsFormat === 'american' ? 'e.g., -110' : 'e.g., 1.91'}
                      className="w-full sm:w-1/2 bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <input
                      id="custom-profit"
                      type="checkbox"
                      checked={useCustomProfit}
                      onChange={e => setUseCustomProfit(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-600 bg-slate-800 text-sky-600 focus:ring-sky-500"
                    />
                    <label htmlFor="custom-profit" className="ml-2 block text-sm text-gray-300">
                      Set Target Profit (Optional)
                    </label>
                  </div>

                  {useCustomProfit && (
                    <div className="mt-2">
                      <div className="max-w-xs">
                        <div className="relative rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="profit-target"
                            id="profit-target"
                            value={profitTarget}
                            onChange={e => setProfitTarget(e.target.value)}
                            className="block w-full rounded-md border-0 bg-slate-800 py-1.5 pl-7 pr-12 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-sky-500 sm:text-sm sm:leading-6"
                            placeholder="Target profit"
                          />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        Enter how much profit you want to lock in. Leave empty for maximum balanced
                        profit.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={calculateHedgeBet}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-sky-300 text-slate-950 font-medium hover:bg-blue-500 transition-colors"
                >
                  Calculate Hedge
                </button>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-900/30 border border-red-500/20 rounded-md text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                {hedgeResult && (
                  <div className="mt-6 p-4 rounded-lg bg-slate-800/50">
                    <h3 className="text-lg font-medium mb-4">Hedge Results</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">
                          Original Bet Potential Payout
                        </div>
                        <div className="text-xl font-semibold text-white">
                          ${hedgeResult.originalPayout}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-400 mb-1">Hedge Bet Amount</div>
                        <div className="text-xl font-semibold text-emerald-400">
                          ${hedgeResult.hedgeStake}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          This is how much to bet on the opposite outcome
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-400 mb-1">Guaranteed Profit</div>
                        <div className="text-xl font-semibold text-emerald-400">
                          ${hedgeResult.guaranteedProfit}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          You'll win this amount regardless of outcome
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-400 mb-1">ROI on Total Risk</div>
                        <div className="text-xl font-semibold text-white">{hedgeResult.roi}%</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Return on investment across both bets
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">When to Hedge Your Bets</h2>

                <p className="text-sm text-gray-400 mb-4">
                  Hedging is a strategy where you place a second bet against your original wager to
                  guarantee a profit or minimize losses.
                </p>

                <h3 className="font-medium text-sky-300 mt-4">Good Times to Hedge</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li>• When your original bet has gained significant value</li>
                  <li>• In the final leg of a parlay with a large potential payout</li>
                  <li>• When odds have shifted dramatically in your favor</li>
                  <li>• To secure profit in a volatile market</li>
                </ul>

                <h3 className="font-medium text-sky-300 mt-4">Downsides of Hedging</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li>• Reduces your maximum potential profit</li>
                  <li>• Increases total amount risked</li>
                  <li>• Can be inefficient if not calculated properly</li>
                </ul>

                <div className="mt-4 p-3 bg-sky-900/30 border border-sky-500/20 rounded-md">
                  <h3 className="font-medium text-sky-300 mb-1">Pro Tip</h3>
                  <p className="text-sm text-gray-300">
                    The larger the odds change since your original bet, the more profitable your
                    hedge can be. Perfect for futures bets that have gained value over time.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">Hedging Examples</h2>

                <div className="text-sm text-gray-400 space-y-4">
                  <p>
                    <span className="text-white">Playoff Futures:</span> You bet $100 on a team to
                    win the championship at +1000 before the season. They reach the finals and are
                    now +150. You can hedge to guarantee profit.
                  </p>

                  <p>
                    <span className="text-white">Live Betting:</span> You bet $100 on the underdog
                    at +250 pre-game. They take an early lead and their opponent is now +200. A
                    hedge bet locks in profit.
                  </p>

                  <p>
                    <span className="text-white">Parlay Final Leg:</span> You have a $50 parlay with
                    a $1,000 payout riding on the final game. Hedging can ensure you walk away with
                    some profit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Smart Hedging Strategies</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Partial Hedges</h3>
                <p className="text-gray-400">
                  Instead of hedging for equal profit, consider a partial hedge where you guarantee
                  some profit while maintaining upside potential if your original bet wins.
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Shop for the Best Odds</h3>
                <p className="text-gray-400">
                  When hedging, small differences in odds can significantly impact your guaranteed
                  profit. Compare odds across multiple sportsbooks to maximize your return.
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">Consider the Vig</h3>
                <p className="text-gray-400">
                  Remember that the bookmaker's margin (vig) affects hedging efficiency. The lower
                  the combined vig between your original and hedge bets, the better your guaranteed
                  profit will be.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
