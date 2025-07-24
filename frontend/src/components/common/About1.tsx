export default function Example() {
  return (
    <div className="overflow-hidden bg-slate-950">
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-sky-300">My Journey</h2>
            <h3 className="mt-2 text-3xl/8 font-bold tracking-tight text-gray-100 sm:text-4xl">
              Professional Sports Bettor
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure className="relative">
                <img
                  alt="Casino image"
                  src="/images/Casino.png"
                  width={1184}
                  height={1376}
                  className="aspect-[12/7] w-full rounded-lg object-cover shadow-lg lg:aspect-auto"
                />
                <div className="absolute inset-0 bg-slate-400 mix-blend-multiply rounded-lg" />
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto text-base/7 text-gray-300">
              <p className="text-lg/7">
                PicksOffice represents a new dimension of sports betting analysis, created by me, a
                professional sports bettor with over a decade of intensive and demonstrably
                successful experience. I combine deep statistical expertise, state-of-the-art
                algorithmic modeling, and unwavering transparency.
              </p>
              <p className="mt-5">
                My foundation is built on academic excellence in statistics, particularly Bayesian
                statistics, Monte Carlo simulations, and logistic/linear regressions. This
                theoretical foundation enables me to systematically integrate prior knowledge into
                forecasts and continuously refine my models.
              </p>
              <p className="mt-5">
                Technically, I leverage Python (including pandas, NumPy, scikit-learn, TensorFlow)
                and SQL databases to implement comprehensive risk management, modeling, and
                algorithmic analysis. This enables efficient, automated analytical processes for
                developing and validating predictions.
              </p>
              <p className="mt-5">
                My approach to identifying profitable betting opportunities is rigorous and
                systematic, considering over 3,000 variables per game—from team and player
                statistics to injury reports, historical matchups, weather conditions, and market
                data.
              </p>
              <ul role="list" className="mt-5 list-disc space-y-2 pl-6 marker:text-sky-300">
                <li className="pl-2">
                  Proven track record with documented ROI across all sports through public tracking
                  systems
                </li>
                <li className="pl-2">
                  Specialized focus on spread and totals markets with robust historical datasets
                </li>
                <li className="pl-2">
                  Disciplined bankroll management using modified Kelly Criterion with 1-2%
                  allocation per bet
                </li>
              </ul>
              <p className="mt-5">
                I identify value by comparing my model's probability calculations with current
                market odds—what I call "Edge." Significant discrepancies signal potential value
                opportunities that can be exploited for long-term profit.
              </p>

              <p className="mt-5">
                Transparency is fundamental to my approach. Every pick includes detailed writeups
                explaining the underlying analysis, allowing you to understand not just what to bet,
                but why. This reflects my commitment to accountability and educational value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
