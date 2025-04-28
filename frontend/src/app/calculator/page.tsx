import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

const calculatorTools = [
  {
    id: 'odds-converter',
    title: 'Odds Converter',
    description: 'Convert odds between American, Decimal, Fractional, and Implied Probability formats with our easy-to-use calculator.',
    href: '/calculator/odds-converter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    )
  },
  {
    id: 'closing-line-calculator',
    title: 'Closing Line Value Calculator',
    description: 'Calculate your closing line value to measure your ability to beat the market and predict long-term profitability.',
    href: '/calculator/closing-line-calculator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    )
  },
  {
    id: 'parlay-calculator',
    title: 'Parlay Calculator',
    description: 'Calculate potential payouts for parlay bets with multiple selections using different odds formats.',
    href: '/calculator/parlay-calculator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    )
  },
  {
    id: 'kelly-calculator',
    title: 'Kelly Criterion Calculator',
    description: 'Optimize your bet sizing with the Kelly Criterion formula to maximize long-term growth rate of your bankroll.',
    href: '/calculator/kelly-calculator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    )
  },
  {
    id: 'hedging-calculator',
    title: 'Hedging Calculator',
    description: 'Calculate how to hedge your existing bet to guarantee a profit or minimize potential losses.',
    href: '/calculator/hedging-calculator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    )
  },
  {
    id: 'expected-value-calculator',
    title: 'Expected Value Calculator',
    description: 'Calculate the expected value of your bets to determine if they have positive long-term value.',
    href: '/calculator/expected-value-calculator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    )
  }
];


export default function CalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Betting Calculators</h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              Our free betting calculators help you make informed decisions and optimize your sports betting strategy. 
              Convert odds between different formats, calculate potential payouts, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {calculatorTools.map((tool) => (
              <Link 
                key={tool.id}
                href={tool.href}
                className="flex flex-col rounded-2xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-white">{tool.title}</h2>
                  <div className="text-sky-300">
                    {tool.icon}
                  </div>
                </div>
                <p className="text-sm text-gray-400 flex-grow">{tool.description}</p>
                <div className="mt-4 flex items-center text-sky-300 text-sm font-medium">
                  Use Calculator
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Use Our Betting Calculators?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <h3 className="text-xl font-medium mb-2 text-white">Make Informed Decisions</h3>
                <p className="text-gray-400">
                  Convert odds between different formats to better understand the true probability and value of your bets.
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <h3 className="text-xl font-medium mb-2 text-white">Optimize Your Strategy</h3>
                <p className="text-gray-400">
                  Use tools like the Kelly Calculator to determine optimal bet sizes based on your edge and bankroll.
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-6 shadow-lg border border-white/10">
                <h3 className="text-xl font-medium mb-2 text-white">Track Your Performance</h3>
                <p className="text-gray-400">
                  Measure your betting success with CLV Calculator to see if you are consistently beating the closing line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}