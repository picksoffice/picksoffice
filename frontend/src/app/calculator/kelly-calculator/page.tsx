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

// Helper function to convert decimal odds to implied probability
const decimalToImpliedProbability = (decimal: number): number => {
  return Number(((1 / decimal) * 100).toFixed(2));
};

// Calculate Kelly percentage
const calculateKelly = (decimalOdds: number, winProbability: number): number => {
  const probability = winProbability / 100; // Convert percentage to decimal
  const decimalMinusOne = decimalOdds - 1;
  
  // Kelly formula: (bp - q) / b
  // where: b = odds - 1, p = probability of winning, q = probability of losing (1 - p)
  const kellyPercentage = ((decimalMinusOne * probability) - (1 - probability)) / decimalMinusOne;
  
  return Math.max(kellyPercentage * 100, 0); // Convert to percentage and ensure it's not negative
};

export default function KellyCalculator() {
  const [oddsFormat, setOddsFormat] = useState<'american' | 'decimal'>('american');
  const [odds, setOdds] = useState<string>('');
  const [winProbability, setWinProbability] = useState<string>('');
  const [bankroll, setBankroll] = useState<string>('1000');
  const [kellyPercentage, setKellyPercentage] = useState<number | null>(null);
  const [kellyAmount, setKellyAmount] = useState<number | null>(null);
  const [halfKellyAmount, setHalfKellyAmount] = useState<number | null>(null);
  const [quarterKellyAmount, setQuarterKellyAmount] = useState<number | null>(null);
  const [fairOdds, setFairOdds] = useState<number | null>(null);
  const [impliedProbability, setImpliedProbability] = useState<number | null>(null);
  const [edge, setEdge] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateKellyBet = () => {
    setErrorMessage(null);
    
    if (!odds || !winProbability || !bankroll) {
      setErrorMessage('Please enter all required fields');
      return;
    }

    try {
      // Parse inputs
      const oddsValue = parseFloat(odds);
      const probabilityValue = parseFloat(winProbability);
      const bankrollValue = parseFloat(bankroll);
      
      if (isNaN(oddsValue) || isNaN(probabilityValue) || isNaN(bankrollValue)) {
        throw new Error('Please enter valid numbers');
      }
      
      if (probabilityValue <= 0 || probabilityValue > 100) {
        throw new Error('Win probability must be between 0 and 100');
      }
      
      if (bankrollValue <= 0) {
        throw new Error('Bankroll must be greater than 0');
      }
      
      // Convert odds to decimal if needed
      const decimalOdds = oddsFormat === 'american' ? americanToDecimal(oddsValue) : oddsValue;
      
      if (decimalOdds < 1) {
        throw new Error('Decimal odds must be 1.00 or greater');
      }
      
      // Calculate implied probability from the odds
      const calculatedImpliedProbability = decimalToImpliedProbability(decimalOdds);
      setImpliedProbability(calculatedImpliedProbability);
      
      // Calculate fair odds based on your probability
      const fairDecimalOdds = 100 / probabilityValue;
      setFairOdds(parseFloat(fairDecimalOdds.toFixed(2)));
      
      // Calculate edge (Value - 1)
      const valueRatio = fairDecimalOdds / decimalOdds;
      setEdge(parseFloat(((valueRatio - 1) * 100).toFixed(2)));
      
      // Calculate Kelly percentage
      const calculatedKellyPercentage = calculateKelly(decimalOdds, probabilityValue);
      setKellyPercentage(parseFloat(calculatedKellyPercentage.toFixed(2)));
      
      // Calculate Kelly bet amounts
      const fullKellyAmount = (calculatedKellyPercentage / 100) * bankrollValue;
      setKellyAmount(parseFloat(fullKellyAmount.toFixed(2)));
      setHalfKellyAmount(parseFloat((fullKellyAmount / 2).toFixed(2)));
      setQuarterKellyAmount(parseFloat((fullKellyAmount / 4).toFixed(2)));
      
    } catch (error) {
      setErrorMessage((error as Error).message || 'An error occurred during calculation');
      setKellyPercentage(null);
      setKellyAmount(null);
      setHalfKellyAmount(null);
      setQuarterKellyAmount(null);
      setFairOdds(null);
      setImpliedProbability(null);
      setEdge(null);
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
              <h1 className="text-4xl font-bold tracking-tight">Kelly Criterion Calculator</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Calculate the optimal bet size based on your bankroll and edge using the Kelly Criterion formula. 
              This mathematical formula helps maximize long-term growth while minimizing risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-6">Kelly Criterion Calculator</h2>
                
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="odds" className="block text-sm font-medium text-gray-300 mb-2">
                      {oddsFormat === 'american' ? 'American Odds' : 'Decimal Odds'}
                    </label>
                    <input
                      id="odds"
                      type="text"
                      value={odds}
                      onChange={(e) => setOdds(e.target.value)}
                      placeholder={oddsFormat === 'american' ? "e.g., -110, +150" : "e.g., 1.91, 2.50"}
                      className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="win-probability" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Estimated Win Probability (%)
                    </label>
                    <input
                      id="win-probability"
                      type="text"
                      value={winProbability}
                      onChange={(e) => setWinProbability(e.target.value)}
                      placeholder="e.g., 55"
                      className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bankroll" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Bankroll ($)
                    </label>
                    <input
                      id="bankroll"
                      type="text"
                      value={bankroll}
                      onChange={(e) => setBankroll(e.target.value)}
                      placeholder="e.g., 1000"
                      className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateKellyBet}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-sky-300 text-slate-950 font-medium hover:bg-blue-500 transition-colors"
                >
                  Calculate Kelly Bet
                </button>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-900/30 border border-red-500/20 rounded-md text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                {kellyPercentage !== null && (
                  <div className="mt-6">
                    <div className="p-4 rounded-lg bg-slate-800/50 mb-4">
                      <h3 className="text-lg font-medium mb-3">Edge Analysis</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Implied Probability</div>
                          <div className="text-xl font-semibold text-white">
                            {impliedProbability}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Your Fair Odds</div>
                          <div className="text-xl font-semibold text-white">
                            {fairOdds}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Edge</div>
                          <div className={`text-xl font-semibold ${edge && edge > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {edge && edge > 0 ? '+' : ''}{edge}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-800/50">
                      <h3 className="text-lg font-medium mb-3">Kelly Bet Sizes</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Kelly Percentage</div>
                          <div className="text-xl font-semibold text-white">
                            {kellyPercentage}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Full Kelly</div>
                          <div className="text-xl font-semibold text-emerald-400">
                            ${kellyAmount}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Half Kelly</div>
                          <div className="text-xl font-semibold text-emerald-400">
                            ${halfKellyAmount}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Quarter Kelly</div>
                          <div className="text-xl font-semibold text-emerald-400">
                            ${quarterKellyAmount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">Understanding Kelly Criterion</h2>
                
                <p className="text-sm text-gray-400 mb-4">
                  The Kelly Criterion is a mathematical formula used to determine the optimal size of bets to maximize long-term bankroll growth.
                </p>
                
                <h3 className="font-medium text-sky-300 mt-4">How It Works</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Kelly calculates what percentage of your bankroll to wager based on your edge and the odds offered. The formula balances the competing goals of growth and security.
                </p>
                
                <h3 className="font-medium text-sky-300 mt-4">Kelly Variations</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li><span className="text-white">Full Kelly:</span> Mathematically optimal but high volatility</li>
                  <li><span className="text-white">Half Kelly:</span> 50% of the optimal bet (recommended)</li>
                  <li><span className="text-white">Quarter Kelly:</span> 25% of the optimal bet (conservative)</li>
                </ul>
                
                <div className="mt-4 p-3 bg-sky-900/30 border border-sky-500/20 rounded-md">
                  <h3 className="font-medium text-sky-300 mb-1">Important Note</h3>
                  <p className="text-sm text-gray-300">
                    Kelly only works when your probability estimate is accurate. If your probability is off, Kelly can lead to overbetting. Most professional bettors use fractional Kelly (like Half or Quarter Kelly) for safety.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">Edge Explained</h2>
                
                <p className="text-sm text-gray-400 mb-2">
                  Your edge is the difference between your estimated probability and the implied probability from the odds.
                </p>
                
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Negative Edge (<0%)</span>
                    <span className="text-sm text-red-400">Don't Bet</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">No Edge (0%)</span>
                    <span className="text-sm text-gray-300">Don't Bet</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Small Edge (0-2%)</span>
                    <span className="text-sm text-yellow-400">Caution</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Good Edge (2%+)</span>
                    <span className="text-sm text-emerald-400">Bet (Size Proportional)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Best Practices for Kelly Betting</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">1</div>
                <h3 className="text-xl font-medium mb-2">Be Conservative</h3>
                <p className="text-gray-400">
                  Use Half or Quarter Kelly sizes instead of Full Kelly to reduce variance while still capturing most of the growth benefits.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">2</div>
                <h3 className="text-xl font-medium mb-2">Assess Probabilities Realistically</h3>
                <p className="text-gray-400">
                  Be honest and accurate with your probability estimates. Overstating your edge will lead to overbetting and potential bankroll destruction.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">3</div>
                <h3 className="text-xl font-medium mb-2">Set Maximum Bet Limits</h3>
                <p className="text-gray-400">
                  Consider setting a maximum bet size (e.g., 5% of bankroll) regardless of what Kelly suggests, especially for bets with uncertain probabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}