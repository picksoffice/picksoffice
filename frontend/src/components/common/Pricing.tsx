'use client';

import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Day',
    id: 'tier-day',
    href: '#',
    price: '$1.99',
    description: 'Perfect for testing our picks.',
    features: [
      'All picks for 24 hours',
      'Full analysis and writeups',
      'Historical stats access',
      'Basic betting tools',
    ],
    mostPopular: false,
  },
  {
    name: 'Week',
    id: 'tier-week',
    href: '#',
    price: '$14.99',
    description: 'Ideal for short-term strategies.',
    features: [
      'All picks for 7 days',
      'Full analysis and writeups',
      'Historical stats access',
      'Complete betting tools',
    ],
    mostPopular: false,
  },
  {
    name: 'Month',
    id: 'tier-month',
    href: '#',
    price: '$59.99',
    description: 'Best value for serious bettors.',
    features: [
      'All picks for 30 days',
      'Premium analysis and writeups',
      'Advanced statistics dashboard',
      'Complete betting tools',
    ],
    mostPopular: true,
  },
  {
    name: 'Custom',
    id: 'tier-custom',
    href: '#',
    price: '$1.99 - $59.99',
    description: 'Flexible plan for your needs.',
    features: [
      'Choose exactly how many days',
      'All premium features included',
      'Advanced statistics dashboard',
      'Pay only for what you need',
    ],
    mostPopular: false,
    isCustom: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  const [customDays, setCustomDays] = useState(15);
  const [customPrice, setCustomPrice] = useState('$29.99');

  useEffect(() => {
    // Calculate price based on days selected
    const pricePerDay = 1.99;
    const price = (customDays * pricePerDay).toFixed(2);
    // Apply discount for longer periods
    let discountedPrice = price;
    if (customDays >= 10) discountedPrice = (price * 0.9).toFixed(2);
    if (customDays >= 20) discountedPrice = (price * 0.8).toFixed(2);
    if (customDays >= 28) discountedPrice = 59.99;

    setCustomPrice(`$${discountedPrice}`);
  }, [customDays]);

  return (
    <div className="py-16 sm:py-24 bg-transparent" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-sky-400">Pricing</h2>
          <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Find Your Betting Edge
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-medium text-gray-300 sm:text-lg/7">
          Choose a plan that fits your betting strategy. All plans include access to our expert
          picks and analysis.
        </p>

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map(tier => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? 'ring-2 ring-sky-500 bg-slate-800/40 backdrop-blur-sm'
                  : 'ring-1 ring-gray-700 bg-slate-800/20 backdrop-blur-sm',
                'rounded-xl p-6 relative'
              )}
            >
              <div className="flex items-center gap-2">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-sky-400' : 'text-white',
                    'text-lg font-semibold'
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular && (
                  <span className="bg-sky-600 text-white text-xs px-2 py-0.5 rounded-md">
                    MOST POPULAR
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-400 h-10">{tier.description}</p>
              <p className="mt-4 flex items-baseline gap-x-1">
                <span className="text-3xl font-semibold tracking-tight text-white">
                  {tier.isCustom ? customPrice : tier.price}
                </span>
              </p>

              {tier.isCustom && (
                <div className="mt-4">
                  <label
                    htmlFor="custom-days"
                    className="block text-xs font-medium text-gray-300 mb-1.5"
                  >
                    Select days: {customDays}
                  </label>
                  <input
                    id="custom-days"
                    type="range"
                    min="1"
                    max="30"
                    value={customDays}
                    onChange={e => setCustomDays(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>30</span>
                  </div>
                </div>
              )}

              <a
                href="https://bet105.com/picksoffice"
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-sky-600 text-white shadow-sm hover:bg-sky-500'
                    : 'text-sky-400 ring-1 ring-inset ring-sky-500/30 hover:ring-sky-400',
                  'mt-5 block rounded-md px-3 py-1.5 text-center text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all'
                )}
              >
                Get access
              </a>
              <ul role="list" className="mt-6 space-y-2.5 text-sm text-gray-300">
                {tier.features.map(feature => (
                  <li key={feature} className="flex gap-x-2">
                    <CheckIcon className="h-5 w-4 flex-none text-sky-400" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
