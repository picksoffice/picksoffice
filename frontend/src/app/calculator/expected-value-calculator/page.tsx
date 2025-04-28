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

// Calculate Expected Value in percentage
const calculateEV = (odds: number, probability: number): number => {
  const probabilityDecimal = probability / 100; // Convert percentage to decimal
  const evPercentage = ((odds * probabilityDecimal) - 1) * 100;
  return evPercentage;
};

// Calculate Expected Value in units
const calculateEVUnits = (odds: number, probability: number, stake: number): number => {
  const evPercentage = calculateEV(odds, probability);
  return (evPercentage / 100) * stake;
};

export default function ExpectedValueCalculator() {
  const [oddsFormat, setOddsFormat] = useState<'american' | 'decimal'>('american');
  const [odds, setOdds] = useState<string>('');
  const [probability, setProbability] = useState<string>('');
  const [stake, setStake] = useState<string>('100');
  const [evResult, setEvResult] = useState<{
    evPercentage: number;
    evUnits: number;
    impliedProbability: number;
    edgePercentage: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateExpectedValue = () => {
    setErrorMessage(null);
    
    if (!odds || !probability) {
      setErrorMessage('Please enter both odds and your estimated probability');
      return;
    }

    try {
      // Parse inputs
      const probabilityValue = parseFloat(probability);
      const stakeValue = parseFloat(stake || '100');
      
      if (isNaN(probabilityValue)) {
        throw new Error('Please enter a valid probability');
      }
      
      if (probabilityValue <= 0 || probabilityValue > 100) {
        throw new Error('Probability must be between 0 and 100');
      }
      
      if (isNaN(stakeValue) || stakeValue <= 0) {
        throw new Error('Stake must be a positive number');
      }
      
      // Convert odds to decimal if needed
      let decimalOdds: number;
      
      if (oddsFormat === 'american') {
        const americanOddsValue = parseFloat(odds);
        
        if (isNaN(americanOddsValue)) {
          throw new Error('Please enter valid odds');
        }
        
        decimalOdds = americanToDecimal(americanOddsValue);
      } else {
        decimalOdds = parseFloat(odds);
        
        if (isNaN(decimalOdds) || decimalOdds < 1) {
          throw new Error('Decimal odds must be 1.00 or greater');
        }
      }
      
      // Calculate expected value
      const evPercentage = calculateEV(decimalOdds, probabilityValue);
      const evUnits = calculateEVUnits(decimalOdds, probabilityValue, stakeValue);
      
      // Calculate implied probability from odds
      const impliedProbability = decimalToImpliedProbability(decimalOdds);
      
      // Calculate edge (difference between your probability and implied probability)
      const edgePercentage = probabilityValue - impliedProbability;
      
      setEvResult({
        evPercentage: parseFloat(evPercentage.toFixed(2)),
        evUnits: parseFloat(evUnits.toFixed(2)),
        impliedProbability: parseFloat(impliedProbability.toFixed(2)),
        edgePercentage: parseFloat(edgePercentage.toFixed(2))
      });
      
    } catch (error) {
      setErrorMessage((error as Error).message || 'An error occurred during calculation');
      setEvResult(null);
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
              <h1 className="text-4xl font-bold tracking-tight">Expected Value Calculator</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Calculate the expected value (EV) of your sports bets to determine if they have positive long-term value. 
              EV is a key metric for assessing bet quality and making profitable betting decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-6">Expected Value Calculator</h2>
                
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
                    <label htmlFor="probability" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Estimated Win Probability (%)
                    </label>
                    <input
                      id="probability"
                      type="text"
                      value={probability}
                      onChange={(e) => setProbability(e.target.value)}
                      placeholder="e.g., 55"
                      className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Your honest assessment of the true probability of winning
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="stake" className="block text-sm font-medium text-gray-300 mb-2">
                      Stake Amount ($)
                    </label>
                    <input
                      id="stake"
                      type="text"
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      placeholder="e.g., 100"
                      className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateExpectedValue}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-sky-300 text-slate-950 font-medium hover:bg-blue-500 transition-colors"
                >
                  Calculate Expected Value
                </button>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-900/30 border border-red-500/20 rounded-md text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                {evResult && (
                  <div className="mt-6 p-4 rounded-lg bg-slate-800/50">
                    <h3 className="text-lg font-medium mb-4">Expected Value Results</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">EV Percentage</div>
                        <div className={`text-2xl font-semibold ${evResult.evPercentage > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {evResult.evPercentage > 0 ? '+' : ''}{evResult.evPercentage}%
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {evResult.evPercentage > 0 
                            ? 'Positive EV - Long-term profitable bet' 
                            : 'Negative EV - Not a profitable bet long-term'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Expected Value</div>
                        <div className={`text-2xl font-semibold ${evResult.evUnits > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {evResult.evUnits > 0 ? '+' : ''}${evResult.evUnits}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Expected profit/loss per bet over the long run
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Implied Probability</div>
                        <div className="text-2xl font-semibold text-white">
                          {evResult.impliedProbability}%
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          The probability reflected in the bookmaker's odds
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Your Edge</div>
                        <div className={`text-2xl font-semibold ${evResult.edgePercentage > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {evResult.edgePercentage > 0 ? '+' : ''}{evResult.edgePercentage}%
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Difference between your probability and implied probability
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">What is Expected Value?</h2>
                
                <p className="text-sm text-gray-400 mb-4">
                  Expected Value (EV) measures the average amount you can expect to win or lose per bet if you were to place the same bet many times over.
                </p>
                
                <h3 className="font-medium text-sky-300 mt-4">Why EV Matters</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Consistently betting with positive EV is the foundation of profitable sports betting. 
                  Even bets that lose can be "good bets" if they have positive EV over the long run.
                </p>
                
                <h3 className="font-medium text-sky-300 mt-4">The EV Formula</h3>
                <div className="mt-1 p-3 bg-slate-800/80 rounded-md">
                  <p className="text-sm text-gray-300">
                    EV = (Probability of Win × Potential Profit) - (Probability of Loss × Stake)
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    Or simplified: EV% = (Decimal Odds × Your Probability%) - 100%
                  </p>
                </div>
                
                <h3 className="font-medium text-sky-300 mt-4">Interpreting Results</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li><span className="text-emerald-400">Positive EV:</span> Profitable in the long run</li>
                  <li><span className="text-red-400">Negative EV:</span> Unprofitable in the long run</li>
                  <li><span className="text-white">EV = 0:</span> Break-even bet</li>
                </ul>
              </div>
              
              <div className="mt-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">EV Betting Strategy</h2>
                
                <div className="text-sm text-gray-400 space-y-4">
                  <p>
                    <span className="text-white">Be Realistic:</span> Your probability estimates must be accurate for EV to be meaningful. Overconfidence leads to mistakenly believing you have positive EV.
                  </p>
                  
                  <p>
                    <span className="text-white">Accept Variance:</span> Even with positive EV, you'll experience losing streaks. Focus on the process, not individual results.
                  </p>
                  
                  <p>
                    <span className="text-white">Specialize:</span> Develop edge in specific markets or sports rather than betting broadly.
                  </p>
                  
                  <p>
                    <span className="text-white">Shop for the Best Odds:</span> Small differences in odds can turn a negative EV bet into a positive one.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Common EV Betting Mistakes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">1</div>
                <h3 className="text-xl font-medium mb-2">Overestimating Probabilities</h3>
                <p className="text-gray-400">
                  Many bettors overestimate their edge, believing they have positive EV when they don't. Be brutally honest in your probability assessments.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">2</div>
                <h3 className="text-xl font-medium mb-2">Ignoring the Vig</h3>
                <p className="text-gray-400">
                  Remember that bookmakers build their profit margin (vig) into the odds. To overcome this, your edge needs to be greater than the bookmaker's margin.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">3</div>
                <h3 className="text-xl font-medium mb-2">Chasing Losses</h3>
                <p className="text-gray-400">
                  Sticking to positive EV bets requires discipline. Don't abandon your strategy after losses by making larger or riskier bets to "catch up."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}