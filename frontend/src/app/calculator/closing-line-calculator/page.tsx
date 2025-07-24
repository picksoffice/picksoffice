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

// Calculate CLV percentage using decimal odds
const calculateCLV = (placedOdds: number, closingOdds: number): number => {
  // Convert to implied probabilities
  const placedImpliedProb = 1 / placedOdds;
  const closingImpliedProb = 1 / closingOdds;

  // Calculate CLV
  const clv = (placedImpliedProb / closingImpliedProb - 1) * 100;

  // Invert for bets where the placed odds are higher than closing odds
  return placedOdds > closingOdds ? clv : -clv;
};

export default function ClosingLineCalculator() {
  const [oddsFormat, setOddsFormat] = useState<'american' | 'decimal'>('american');
  const [placedOdds, setPlacedOdds] = useState<string>('');
  const [closingOdds, setClosingOdds] = useState<string>('');
  const [clvResult, setClvResult] = useState<number | null>(null);
  const [edgeDescription, setEdgeDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateResult = () => {
    setErrorMessage(null);

    if (!placedOdds || !closingOdds) {
      setErrorMessage('Please enter both placed odds and closing odds.');
      return;
    }

    try {
      let placedDecimal: number;
      let closingDecimal: number;

      if (oddsFormat === 'american') {
        const placedAmerican = parseFloat(placedOdds);
        const closingAmerican = parseFloat(closingOdds);

        if (isNaN(placedAmerican) || isNaN(closingAmerican)) {
          throw new Error('Invalid odds format');
        }

        placedDecimal = americanToDecimal(placedAmerican);
        closingDecimal = americanToDecimal(closingAmerican);
      } else {
        placedDecimal = parseFloat(placedOdds);
        closingDecimal = parseFloat(closingOdds);

        if (
          isNaN(placedDecimal) ||
          isNaN(closingDecimal) ||
          placedDecimal < 1 ||
          closingDecimal < 1
        ) {
          throw new Error('Decimal odds must be 1.00 or greater');
        }
      }

      // Calculate CLV percentage
      const clvPercentage = calculateCLV(placedDecimal, closingDecimal);
      setClvResult(parseFloat(clvPercentage.toFixed(2)));

      // Provide edge description based on CLV
      if (clvPercentage > 3) {
        setEdgeDescription(
          'Excellent edge! You have a significant advantage over the closing line.'
        );
      } else if (clvPercentage > 1) {
        setEdgeDescription(
          'Good edge. You consistently beat the closing line, which indicates positive expected value.'
        );
      } else if (clvPercentage > 0) {
        setEdgeDescription('Slight edge. You are barely beating the closing line.');
      } else if (clvPercentage === 0) {
        setEdgeDescription('No edge. Your odds are the same as the closing line.');
      } else if (clvPercentage > -1) {
        setEdgeDescription(
          'Slight negative edge. The closing line is slightly better than your odds.'
        );
      } else if (clvPercentage > -3) {
        setEdgeDescription(
          'Negative edge. The closing line is better than your odds, suggesting negative expected value.'
        );
      } else {
        setEdgeDescription('Significant negative edge. You should reassess your betting strategy.');
      }
    } catch (error) {
      setErrorMessage((error as Error).message || 'Invalid input. Please check your odds values.');
      setClvResult(null);
      setEdgeDescription('');
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
              <h1 className="text-4xl font-bold tracking-tight">Closing Line Value Calculator</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Calculate how much value you captured compared to the closing line. Consistently
              beating the closing line is a strong indicator of long-term profitability in sports
              betting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-6">Calculate CLV</h2>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="placed-odds"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Your Bet Odds
                    </label>
                    <input
                      id="placed-odds"
                      type="text"
                      value={placedOdds}
                      onChange={e => setPlacedOdds(e.target.value)}
                      placeholder={
                        oddsFormat === 'american' ? 'e.g., -110, +150' : 'e.g., 1.91, 2.50'
                      }
                      className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="closing-odds"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Closing Odds
                    </label>
                    <input
                      id="closing-odds"
                      type="text"
                      value={closingOdds}
                      onChange={e => setClosingOdds(e.target.value)}
                      placeholder={
                        oddsFormat === 'american' ? 'e.g., -120, +140' : 'e.g., 1.83, 2.40'
                      }
                      className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateResult}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-sky-300 text-slate-950 font-medium hover:bg-blue-500 transition-colors"
                >
                  Calculate CLV
                </button>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-900/30 border border-red-500/20 rounded-md text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                {clvResult !== null && (
                  <div className="mt-6 p-4 rounded-lg bg-slate-800/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Closing Line Value (CLV)</div>
                        <div
                          className={`text-2xl font-semibold ${
                            clvResult > 0
                              ? 'text-emerald-400'
                              : clvResult < 0
                                ? 'text-red-400'
                                : 'text-white'
                          }`}
                        >
                          {clvResult > 0 ? '+' : ''}
                          {clvResult}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Edge Assessment</div>
                        <div className="text-sm text-white">{edgeDescription}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">What is Closing Line Value?</h2>

                <p className="text-sm text-gray-400 mb-4">
                  Closing Line Value (CLV) measures how much better or worse your odds were compared
                  to the final odds right before the event started (the closing line).
                </p>

                <h3 className="font-medium text-sky-300 mt-4">Why CLV Matters</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Consistently getting better odds than the closing line is a strong predictor of
                  long-term profitability. It means you are accurately identifying value before the
                  market does.
                </p>

                <h3 className="font-medium text-sky-300 mt-4">How to Interpret CLV</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li>
                    <span className="text-emerald-400">Positive CLV</span>: You got better odds than
                    the closing line.
                  </li>
                  <li>
                    <span className="text-white">Zero CLV</span>: Your odds matched the closing
                    line.
                  </li>
                  <li>
                    <span className="text-red-400">Negative CLV</span>: The closing line had better
                    odds than you got.
                  </li>
                </ul>

                <h3 className="font-medium text-sky-300 mt-4">Expert Insight</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Sharp bettors aim for a positive CLV of at least 1-2% on average. Consistently
                  achieving this level of CLV indicates a sustainable edge over the market.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">How to Use CLV to Improve Your Betting</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Track Your CLV</h3>
                <p className="text-gray-400">
                  Record the odds you get for each bet and compare them to the closing line.
                  Calculate your average CLV over time.
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Analyze Patterns</h3>
                <p className="text-gray-400">
                  Identify which types of bets, sports, or situations consistently give you positive
                  CLV and focus more on those areas.
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">Bet with Confidence</h3>
                <p className="text-gray-400">
                  If you consistently achieve positive CLV, you can be confident in your long-term
                  betting strategy, even during losing streaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
