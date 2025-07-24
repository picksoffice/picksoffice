'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';

type OddsFormat = 'american' | 'decimal' | 'fractional' | 'impliedProbability';

// Helper functions for odds conversion
const americanToDecimal = (american: number): number => {
  if (american > 0) {
    return Number((american / 100 + 1).toFixed(2));
  } else {
    return Number((-100 / american + 1).toFixed(2));
  }
};

const decimalToAmerican = (decimal: number): number => {
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100);
  } else {
    return Math.round(-100 / (decimal - 1));
  }
};

const decimalToFractional = (decimal: number): string => {
  const decimalValue = decimal - 1;
  if (decimalValue === parseInt(decimalValue.toString())) {
    return `${decimalValue}/1`;
  }

  // Use a precision of 2 decimal places for the calculation
  const precision = 100;
  let numerator = Math.round(decimalValue * precision);
  let denominator = precision;

  // Simplify the fraction
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(numerator, denominator);

  numerator = numerator / divisor;
  denominator = denominator / divisor;

  return `${numerator}/${denominator}`;
};

const fractionalToDecimal = (fractional: string): number => {
  const parts = fractional.split('/');
  if (parts.length !== 2) return 0;

  const numerator = parseFloat(parts[0]);
  const denominator = parseFloat(parts[1]);

  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    return 0;
  }

  return Number((numerator / denominator + 1).toFixed(2));
};

const decimalToImpliedProbability = (decimal: number): number => {
  return Number(((1 / decimal) * 100).toFixed(2));
};

const impliedProbabilityToDecimal = (probability: number): number => {
  return Number((100 / probability).toFixed(2));
};

export default function OddsConverter() {
  const [oddsFormat, setOddsFormat] = useState<OddsFormat>('american');
  const [inputValue, setInputValue] = useState<string>('');
  const [americanOdds, setAmericanOdds] = useState<number | undefined>(undefined);
  const [decimalOdds, setDecimalOdds] = useState<number | undefined>(undefined);
  const [fractionalOdds, setFractionalOdds] = useState<string | undefined>(undefined);
  const [impliedProbability, setImpliedProbability] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  // Handle calculations when inputValue or oddsFormat changes
  useEffect(() => {
    if (!inputValue) {
      setAmericanOdds(undefined);
      setDecimalOdds(undefined);
      setFractionalOdds(undefined);
      setImpliedProbability(undefined);
      return;
    }

    try {
      let decimal: number;

      switch (oddsFormat) {
        case 'american':
          const american = parseFloat(inputValue);
          if (isNaN(american)) {
            throw new Error('Invalid American odds');
          }
          decimal = americanToDecimal(american);
          setAmericanOdds(american);
          break;

        case 'decimal':
          decimal = parseFloat(inputValue);
          if (isNaN(decimal) || decimal < 1) {
            throw new Error('Decimal odds must be 1.00 or greater');
          }
          setDecimalOdds(decimal);
          break;

        case 'fractional':
          decimal = fractionalToDecimal(inputValue);
          if (decimal === 0) {
            throw new Error('Invalid fractional odds format (use format like 5/1)');
          }
          setFractionalOdds(inputValue);
          break;

        case 'impliedProbability':
          const probability = parseFloat(inputValue);
          if (isNaN(probability) || probability <= 0 || probability > 100) {
            throw new Error('Implied probability must be between 0 and 100');
          }
          decimal = impliedProbabilityToDecimal(probability);
          setImpliedProbability(probability);
          break;
      }

      // Now set all values based on decimal odds
      if (oddsFormat !== 'american') {
        setAmericanOdds(decimalToAmerican(decimal));
      }
      if (oddsFormat !== 'decimal') {
        setDecimalOdds(decimal);
      }
      if (oddsFormat !== 'fractional') {
        setFractionalOdds(decimalToFractional(decimal));
      }
      if (oddsFormat !== 'impliedProbability') {
        setImpliedProbability(decimalToImpliedProbability(decimal));
      }
    } catch (err) {
      setError((err as Error).message);

      // Clear other values when there's an error
      if (oddsFormat !== 'american') setAmericanOdds(undefined);
      if (oddsFormat !== 'decimal') setDecimalOdds(undefined);
      if (oddsFormat !== 'fractional') setFractionalOdds(undefined);
      if (oddsFormat !== 'impliedProbability') setImpliedProbability(undefined);
    }
  }, [inputValue, oddsFormat]);

  const getInputPlaceholder = () => {
    switch (oddsFormat) {
      case 'american':
        return 'e.g., -110, +150';
      case 'decimal':
        return 'e.g., 1.91, 2.50';
      case 'fractional':
        return 'e.g., 10/11, 3/2';
      case 'impliedProbability':
        return 'e.g., 52.38, 40';
      default:
        return '';
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
              <h1 className="text-4xl font-bold tracking-tight">Odds Converter</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Convert odds between American, Decimal, Fractional, and Implied Probability formats to
              better understand potential payouts and probabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-6">Convert Odds</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Odds Format
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                    <button
                      type="button"
                      onClick={() => setOddsFormat('fractional')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        oddsFormat === 'fractional'
                          ? 'bg-sky-800 text-white'
                          : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      Fractional
                    </button>
                    <button
                      type="button"
                      onClick={() => setOddsFormat('impliedProbability')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        oddsFormat === 'impliedProbability'
                          ? 'bg-sky-800 text-white'
                          : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      Implied %
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="odds-input"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Enter{' '}
                    {oddsFormat === 'american'
                      ? 'American'
                      : oddsFormat === 'decimal'
                        ? 'Decimal'
                        : oddsFormat === 'fractional'
                          ? 'Fractional'
                          : 'Implied Probability'}{' '}
                    Odds
                  </label>
                  <input
                    id="odds-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={getInputPlaceholder()}
                    className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                  />
                  {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="text-sm text-gray-400 mb-1">American Odds</div>
                    <div className="text-xl font-semibold">
                      {americanOdds !== undefined
                        ? americanOdds > 0
                          ? `+${americanOdds}`
                          : americanOdds
                        : '—'}
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="text-sm text-gray-400 mb-1">Decimal Odds</div>
                    <div className="text-xl font-semibold">
                      {decimalOdds !== undefined ? decimalOdds : '—'}
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="text-sm text-gray-400 mb-1">Fractional Odds</div>
                    <div className="text-xl font-semibold">
                      {fractionalOdds !== undefined ? fractionalOdds : '—'}
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="text-sm text-gray-400 mb-1">Implied Probability</div>
                    <div className="text-xl font-semibold">
                      {impliedProbability !== undefined ? `${impliedProbability}%` : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold mb-4">Understanding Odds Formats</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sky-300">American Odds</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Displayed with + or - sign. +150 means a $100 bet wins $150. -150 means you
                      need to bet $150 to win $100.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sky-300">Decimal Odds</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Popular in Europe and Canada. The number represents the total return
                      (including stake) for each unit bet.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sky-300">Fractional Odds</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Common in the UK. Displayed as a fraction (e.g., 5/1). Represents profit
                      relative to stake.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sky-300">Implied Probability</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      The chance of winning as implied by the odds. Useful for comparing value
                      across different markets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">How to Use the Odds Converter</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Select Odds Format</h3>
                <p className="text-gray-400">
                  Choose the format of the odds you want to convert from: American, Decimal,
                  Fractional, or Implied Probability.
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Enter Odds Value</h3>
                <p className="text-gray-400">
                  Type in the odds value using the correct format. For American odds, include the +
                  or - sign.
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 text-white mb-4">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">View Conversions</h3>
                <p className="text-gray-400">
                  Instantly see the odds converted to all other formats to compare and make informed
                  decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
