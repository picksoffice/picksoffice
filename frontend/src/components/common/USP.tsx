import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Data-Driven Approach',
    description:
      'My picks are backed by proprietary statistical models, not gut feelings. I analyze thousands of data points to find genuine edges where market odds do not accurately reflect true probabilities. Each recommendation comes with a detailed writeup explaining my analysis.',
    href: '/about',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Complete Transparency',
    description:
      'I maintain full transparency with detailed records of all selections. You can verify my 56% win rate and 7.5% ROI across all major sports leagues. Every pick is documented with odds, stake size, and comprehensive reasoning to ensure full accountability.',
    href: '/statistics',
    icon: LockClosedIcon,
  },
  {
    name: 'Long-Term Profitability',
    description:
      'Sports betting is an investment, not gambling, when approached correctly. My methodology focuses on process over results, understanding that a sound analytical system applied consistently yields profits over time. I use disciplined bankroll management for sustainable growth.',
    href: '/betting-abc',
    icon: ArrowPathIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-transparent
   py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-sky-300">The PicksOffice Difference</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl lg:text-balance">
            Why My Approach Delivers Results
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            What separates my betting analysis from others is a relentless focus on finding true value through rigorous statistical modeling and a long-term investment mindset. I don't chase wins - I chase mathematical edge.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-100">
                  <feature.icon aria-hidden="true" className="size-5 flex-none text-sky-300" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm/6 font-semibold text-sky-300">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
