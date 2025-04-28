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

// Calculate parlay odds in decimal format
const calculateParlayOdds = (oddsArray: number[]): number => {
  return oddsArray.reduce((acc, odds) => acc * odds, 1);
};

interface Selection {
  id: number;
  odds: string;
  description: string;
}

export default function ParlayCalculator() {
  const [oddsFormat, setOddsFormat] = useState<'american' | 'decimal'>('american');
  const [stake, setStake] = useState<string>('100');
  const [selections, setSelections] = useState<Selection[]>([
    { id: 1, odds: '', description: '' },
    { id: 2, odds: '', description: '' }
  ]);
  const [parlayOdds, setParlayOdds] = useState<number | null>(null);
  const [potentialPayout, setPotentialPayout] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addSelection = () => {
    const newId = selections.length > 0 ? Math.max(...selections.map(s => s.id)) + 1 : 1;
    setSelections([...selections, { id: newId, odds: '', description: '' }]);
  };

  const removeSelection = (id: number) => {
    if (selections.length <= 2) {
      setErrorMessage('A parlay requires at least 2 selections');
      return;
    }
    setSelections(selections.filter(selection => selection.id !== id));
  };

  const updateSelection = (id: number, field: 'odds' | 'description', value: string) => {
    setSelections(selections.map(selection => 
      selection.id === id ? { ...selection, [field]: value } : selection
    ));
  };

  const calculateParlay = () => {
    setErrorMessage(null);
    
    // Validate inputs
    if (!stake || isNaN(parseFloat(stake)) || parseFloat(stake) <= 0) {
      setErrorMessage('Please enter a valid stake amount');
      return;
    }

    // Check that all selections have odds
    const missingOdds = selections.some(selection => !selection.odds);
    if (missingOdds) {
      setErrorMessage('Please enter odds for all selections');
      return;
    }

    try {
      // Convert all odds to decimal format for calculation
      const decimalOddsArray = selections.map(selection => {
        const oddsValue = parseFloat(selection.odds);
        if (isNaN(oddsValue)) {
          throw new Error(`Invalid odds: ${selection.odds}`);
        }
        
        return oddsFormat === 'american' ? americanToDecimal(oddsValue) : oddsValue;
      });
      
      // Calculate parlay odds
      const calculatedParlayOdds = calculateParlayOdds(decimalOddsArray);
      setParlayOdds(calculatedParlayOdds);
      
      // Calculate potential payout and profit
      const stakeAmount = parseFloat(stake);
      const calculatedPayout = stakeAmount * calculatedParlayOdds;
      setPotentialPayout(parseFloat(calculatedPayout.toFixed(2)));
      setProfit(parseFloat((calculatedPayout - stakeAmount).toFixed(2)));
      
    } catch (error) {
      setErrorMessage((error as Error).message || 'Invalid input. Please check your odds values.');
      setParlayOdds(null);
      setPotentialPayout(null);
      setProfit(null);
    }
  };

  const formatOdds = (parlayOddsDecimal: number | null): string => {
    if (parlayOddsDecimal === null) return '—';
    
    if (oddsFormat === 'american') {
      const americanOdds = decimalToAmerican(parlayOddsDecimal);
      return americanOdds > 0 ? `+${americanOdds}` : `${americanOdds}`;
    } else {
      return parlayOddsDecimal.toFixed(2);
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
              <h1 className="text-4xl font-bold tracking-tight">Parlay Calculator</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Calculate potential payouts for parlay bets with multiple selections. Add legs to your parlay and 
              see how each selection affects your potential winnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-6">Build Your Parlay</h2>
                
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
                  <label htmlFor="stake" className="block text-sm font-medium text-gray-300 mb-2">
                    Stake Amount
                  </label>
                  <div className="max-w-xs">
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="stake"
                        id="stake"
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        className="block w-full rounded-md border-0 bg-slate-800 py-1.5 pl-7 pr-12 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-sky-500 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-medium text-white">Parlay Selections</h3>
                    <button
                      type="button"
                      onClick={addSelection}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-sky-800 text-white hover:bg-sky-700"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Selection
                    </button>
                  </div>
                  
                  {selections.map((selection, index) => (
                    <div key={selection.id} className="bg-slate-800/50 p-4 mb-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-300">Selection {index + 1}</h4>
                        {selections.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeSelection(selection.id)}
                            className="text-gray-400 hover:text-red-400"
                            aria-label={`Remove selection ${index + 1}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`odds-${selection.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                            Odds
                          </label>
                          <input
                            id={`odds-${selection.id}`}
                            type="text"
                            value={selection.odds}
                            onChange={(e) => updateSelection(selection.id, 'odds', e.target.value)}
                            placeholder={oddsFormat === 'american' ? "e.g., -110, +150" : "e.g., 1.91, 2.50"}
                            className="w-full bg-slate-800 border-slate-700 rounded-md py-1.5 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`description-${selection.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                            Description (Optional)
                          </label>
                          <input
                            id={`description-${selection.id}`}
                            type="text"
                            value={selection.description}
                            onChange={(e) => updateSelection(selection.id, 'description', e.target.value)}
                            placeholder="e.g., Lakers -3.5"
                            className="w-full bg-slate-800 border-slate-700 rounded-md py-1.5 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={calculateParlay}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-sky-300 text-slate-950 font-medium hover:bg-blue-500 transition-colors"
                >
                  Calculate Parlay
                </button>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-900/30 border border-red-500/20 rounded-md text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                {parlayOdds !== null && (
                  <div className="mt-6 p-4 rounded-lg bg-slate-800/50">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Parlay Odds</div>
                        <div className="text-2xl font-semibold text-white">
                          {formatOdds(parlayOdds)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Potential Payout</div>
                        <div className="text-2xl font-semibold text-emerald-400">
                          ${potentialPayout?.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Profit</div>
                        <div className="text-2xl font-semibold text-emerald-400">
                          ${profit?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">What is a Parlay Bet?</h2>
                
                <p className="text-sm text-gray-400 mb-4">
                  A parlay is a single bet that combines two or more individual wagers for a potentially higher payout. 
                  The catch is that all selections must win for the parlay to pay out.
                </p>
                
                <h3 className="font-medium text-sky-300 mt-4">Parlay Benefits</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li>• Higher potential payouts than individual bets</li>
                  <li>• Exciting way to combine multiple games/events</li>
                  <li>• Small stakes can lead to large returns</li>
                </ul>
                
                <h3 className="font-medium text-sky-300 mt-4">Parlay Risks</h3>
                <ul className="text-sm text-gray-400 mt-1 space-y-2">
                  <li>• Higher variance - one loss means the entire bet loses</li>
                  <li>• Bookmakers typically build in higher margins</li>
                  <li>• Not generally recommended for serious bettors</li>
                </ul>
                
                <h3 className="font-medium text-sky-300 mt-4">Calculating Odds</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Parlay odds are calculated by multiplying the decimal odds of each selection together. The more selections you add, 
                  the higher your potential payout — but also the lower your chances of winning.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Parlay Strategy Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">1</div>
                <h3 className="text-xl font-medium mb-2">Keep It Small</h3>
                <p className="text-gray-400">
                  Limit the number of selections in your parlay. Each additional leg significantly decreases your chances of winning.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">2</div>
                <h3 className="text-xl font-medium mb-2">Correlation is Key</h3>
                <p className="text-gray-400">
                  Look for bets that are correlated. If one leg is likely to win, it should increase the chances of other legs winning too.
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">3</div>
                <h3 className="text-xl font-medium mb-2">Manage Expectations</h3>
                <p className="text-gray-400">
                  Use parlays for entertainment, not as your primary betting strategy. Small stakes can still provide excitement without risking too much.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}