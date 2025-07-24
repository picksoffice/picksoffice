import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What makes you different from other sports handicappers?',
    answer:
      'Unlike most handicappers who focus solely on picks, I employ a comprehensive approach to sports betting as a professional investor. I maintain complete transparency with documented long-term results, use advanced statistical modeling rather than intuition, and emphasize process over results. My picks reflect the same methodology I use for my personal betting portfolio.',
  },
  {
    question: 'How do you manage your bankroll?',
    answer:
      'I use a modified Kelly criterion approach for optimal bankroll management. This mathematical formula determines ideal bet sizing based on your edge and bankroll, helping maximize growth while minimizing risk of ruin. My typical bet is 1-3% of my bankroll, with variations based on the specific edge and confidence level for each opportunity.',
  },
  {
    question: 'Which sports and bet types do you focus on?',
    answer:
      'I specialize in MLB, NBA, and NFL markets, with particular expertise in MLB player props, NBA first-half lines, and NFL team totals. These markets often present the greatest inefficiencies and opportunities for edge. I avoid parlays and exotic bets that typically carry excessive vig and focus instead on straight bets where mathematical edge is easier to calculate and verify.',
  },
  {
    question: 'How do you handle losing streaks?',
    answer:
      'Variance is inevitable in sports betting, regardless of skill level. I manage losing streaks by maintaining strict bankroll management principles, focusing on process rather than short-term results, and continuing to trust the math when I know I have edge. I also reduce volume during particularly challenging periods to preserve capital until conditions improve.',
  },
  {
    question: 'What data and tools do you use for your analysis?',
    answer:
      'I maintain proprietary databases and models built on both public and private data sources. My toolkit includes advanced statistical software for regression analysis, machine learning algorithms for pattern recognition, and custom odds calculators for comparing my projections against market lines. I continually refine these tools as new data sources and methodologies become available.',
  },
];

export default function Example() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
            Common Questions About My Approach
          </h2>
          <dl className="mt-16 divide-y divide-gray-700/30">
            {faqs.map(faq => (
              <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-100">
                    <span className="text-base/7 font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-data-[open]:hidden"
                      />
                      <MinusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-[&:not([data-open])]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-300">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
