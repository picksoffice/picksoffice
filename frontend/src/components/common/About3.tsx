import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

export default function Example() {
  return (
    <div className="bg-slate-950 px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-300">
        <p className="text-base/7 font-semibold text-indigo-600">Expert Analysis</p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
          The Professional Edge in Sports Betting
        </h1>
        <p className="mt-6 text-xl/8">
          What separates professional sports bettors from recreational players isn't luck—it's a
          systematic approach to finding value, managing risk, and maintaining discipline through
          variance. My methodology combines advanced analytics with deep sports knowledge to
          identify opportunities the market has mispriced.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            After more than a decade in sports analytics, I've refined a proven system for
            consistently finding value across major sports leagues. My approach isn't about picking
            winners—it's about identifying situations where odds don't accurately reflect true
            probabilities. This edge, applied consistently with proper bankroll management, drives
            long-term profitability.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-300">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-100">
                  Advanced Modeling Techniques.
                </strong>{' '}
                My custom analytics frameworks integrate both public and proprietary data sources to
                generate win probabilities that consistently outperform market expectations. These
                models employ sophisticated algorithms including Monte Carlo simulations and are
                continually refined.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-100">
                  Strategic Bankroll Management.
                </strong>{' '}
                Professional betting requires sophisticated capital allocation. I use a modified
                Kelly Criterion approach to optimize stake sizes (typically 1-2% of bankroll) based
                on edge magnitude and confidence levels, balancing growth with sustainability.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-100">
                  Market Inefficiency Targeting.
                </strong>{' '}
                My approach focuses on identifying specific market scenarios where public biases,
                overreactions to recent results, or misunderstood statistics create exploitable
                pricing discrepancies that translate to profitable opportunities.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Many bettors focus exclusively on handicapping, but market analysis and timing are
            equally important. Understanding how odds move, which sportsbooks release the sharpest
            lines, and when to place wagers can significantly impact long-term ROI. My use of
            real-time data feeds enables precise calculation of Closing Line Value (CLV)—a key
            metric for success.
          </p>
          <h2 className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-gray-100">
            Data-Driven Methodology with Detailed Writeups
          </h2>
          <p className="mt-6">
            For every game, I analyze over 3,000 variables ranging from team and player statistics
            to injury reports, historical matchups, weather conditions, and market data. Each pick
            comes with a comprehensive writeup explaining my reasoning and analysis. This detailed
            approach provides both transparency and educational value, helping you understand the
            methodology behind each recommendation.
          </p>
          <figure className="mt-10 border-l border-indigo-600 pl-9">
            <blockquote className="font-semibold text-gray-100">
              <p>
                "The difference between winning and losing in sports betting isn't about picking
                more winners—it's about consistently finding value where the market has mispriced
                probabilities. Professional betting is mathematical expectation applied to sports,
                not prediction or speculation."
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-6 flex-none rounded-full bg-gray-700"
              />
              <div className="text-sm/6 text-gray-300">
                <strong className="font-semibold text-gray-100">Sports Betting Professional</strong>{' '}
                – 10+ Years Experience
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            The sports betting landscape is constantly evolving, with new data sources, betting
            markets, and regulatory environments emerging regularly. Staying ahead requires
            continuous learning and adaptation. My success comes from maintaining a growth mindset
            and constantly refining my models and methods to exploit new market inefficiencies as
            they develop.
          </p>
        </div>
        <figure className="mt-16">
          <img
            alt="Professional sports analysis"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
            className="aspect-video rounded-xl bg-gray-800 object-cover"
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-300">
            <InformationCircleIcon
              aria-hidden="true"
              className="mt-0.5 size-5 flex-none text-indigo-400"
            />
            Professional sports betting requires continuous analysis and adaptation
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-100">
            Transparency and Long-Term Perspective
          </h2>
          <p className="mt-6">
            Unlike many in this industry, I maintain complete transparency with my betting record.
            Every pick is documented with odds, stake size, and detailed reasoning through
            comprehensive writeups. This accountability is essential—it allows you to verify my
            claims and understand my methodology. True professionals have nothing to hide about
            their performance over meaningful sample sizes.
          </p>
          <p className="mt-8">
            I approach sports betting as a long-term investment, not a get-rich-quick scheme.
            Variance is inevitable in the short term, even with the best methodology. My focus is on
            process over results, understanding that a sound analytical approach applied
            consistently will yield profits over time. This patient, disciplined approach separates
            successful long-term players from the masses.
          </p>
        </div>
      </div>
    </div>
  );
}
