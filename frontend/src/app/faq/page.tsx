'use client';

import PageLayout from '@/components/layout/PageLayout';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

// FAQ categories
const faqCategories = [
  {
    title: 'About PicksOffice',
    faqs: [
      {
        question: 'What makes PicksOffice different from other handicapping services?',
        answer:
          'PicksOffice combines advanced statistical methodology with cutting-edge algorithmic modeling to deliver high-precision picks. We maintain complete transparency in our record-keeping and focus on long-term profitability rather than short-term results.',
      },
      {
        question: 'How often are new picks published?',
        answer:
          'We typically publish 3-5 picks per week across all sports. Our focus is on quality over quantity, so we only release picks when our models identify significant value in the betting markets. During peak seasons for major sports like NFL, NBA, and MLB, you can expect more frequent selections.',
      },
      {
        question: 'Do you offer a money-back guarantee?',
        answer:
          "Yes, we offer a 30-day satisfaction guarantee for new subscribers. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund. We believe in the quality of our picks and analysis and want you to feel confident in your subscription.",
      },
      {
        question: "What's included in a premium subscription?",
        answer:
          "Premium subscribers receive access to all our picks with detailed analysis, early access to line movement alerts, personalized bankroll management recommendations, access to our members-only community, and priority customer support. You'll also get exclusive educational content to help improve your betting knowledge and skills.",
      },
    ],
  },
  {
    title: 'Betting Strategies',
    faqs: [
      {
        question: 'What bankroll management strategy do you recommend?',
        answer:
          'We recommend a modified Kelly criterion approach for optimal bankroll management. This mathematical formula determines ideal bet sizing based on your edge and bankroll, helping maximize growth while minimizing risk of ruin. For most bettors, we suggest betting between 1-3% of your bankroll on each play, with adjustments based on confidence level and perceived edge.',
      },
      {
        question: 'How do you handle losing streaks?',
        answer:
          "Variance is inevitable in sports betting, regardless of skill level. We manage losing streaks by maintaining strict bankroll management principles, focusing on process rather than short-term results, and continuing to trust the math when we know we have edge. During challenging periods, it's often wise to reduce your bet size until your confidence and results improve.",
      },
      {
        question: 'Should I bet parlays or stick to straight bets?',
        answer:
          'While parlays can be entertaining, we generally recommend focusing on straight bets for serious bettors. Parlays combine the vig (house edge) from multiple bets, making them mathematically disadvantageous in the long run. If you enjoy parlays, consider limiting them to a small portion of your overall betting portfolio and focus primarily on straight bets where value is easier to identify.',
      },
      {
        question: 'How important is line shopping?',
        answer:
          'Line shopping (comparing odds across multiple sportsbooks) is one of the most important habits for a successful sports bettor. Even small differences in odds can significantly impact your long-term profitability. We recommend having accounts at 3-5 sportsbooks and always placing your bets at the book offering the best line. This practice alone can often be the difference between a winning and losing bettor.',
      },
      {
        question: 'Is it better to bet favorites or underdogs?',
        answer:
          'Neither favorites nor underdogs are inherently better betting options - the key is finding value relative to the true probability of each outcome. That said, there is some evidence that the betting public tends to overvalue favorites, particularly in high-profile games, which can create value on underdogs in certain situations. Our approach is always to bet based on identified edge rather than favoring a particular side of the line.',
      },
    ],
  },
  {
    title: 'Sports Betting Basics',
    faqs: [
      {
        question: "What's the difference between American, decimal, and fractional odds?",
        answer:
          'These are different formats for expressing the same betting odds. American odds use positive/negative numbers (e.g., +150, -200), decimal odds show the total return including stake (e.g., 2.50, 1.50), and fractional odds express the profit relative to stake (e.g., 3/2, 1/2). All represent the same probabilities but are displayed differently in various regions. Our odds converter calculator can help you translate between these formats.',
      },
      {
        question: 'What is closing line value (CLV)?',
        answer:
          "Closing line value refers to the value you capture by betting at odds better than where the line eventually closes. For example, if you bet the Lakers at +5.5 and the line moves to +3.5 by game time, you've gained 2 points of closing line value. Consistently achieving positive CLV is one of the strongest indicators of long-term betting success, as the closing line represents the market's most efficient assessment of the true probabilities.",
      },
      {
        question: "What does 'fading the public' mean?",
        answer:
          "Fading the public means betting against the side that most casual bettors are supporting. The theory is that sportsbooks may shade their lines to take advantage of public biases, creating value on the less popular side. While this can be a profitable strategy in specific scenarios, particularly in high-profile games with lopsided betting, it shouldn't be applied blindly. Our models consider public betting percentages as one factor among many when assessing potential value.",
      },
      {
        question: "How do I know if I'm getting a good price on a bet?",
        answer:
          "A good price means you're betting at odds that give you a positive expected value compared to your assessment of the true probability. Key indicators include: getting better odds than our recommended entry point, capturing line movement in your favor, and finding odds that are outliers compared to the market consensus. Using our calculators and line movement trackers can help you identify advantageous betting opportunities.",
      },
    ],
  },
  {
    title: 'Technical Questions',
    faqs: [
      {
        question: 'What data and tools do you use for your analysis?',
        answer:
          'We maintain proprietary databases and models built on both public and private data sources. Our toolkit includes advanced statistical software for regression analysis, machine learning algorithms for pattern recognition, and custom odds calculators for comparing our projections against market lines. We continually refine these tools as new data sources and methodologies become available.',
      },
      {
        question: 'How do you calculate your ROI?',
        answer:
          'We calculate Return on Investment (ROI) by dividing total profit by total amount risked. For example, if you bet $100 on 10 different games (risking $1,000 total) and made $100 profit, your ROI would be 10%. We track ROI separately for each sport and bet type to provide transparency about performance across different markets. All published ROI figures represent closing line odds to ensure accuracy and verifiability.',
      },
      {
        question: 'Do you consider weather in your handicapping?',
        answer:
          'Yes, weather is a significant factor in our modeling for outdoor sports like football and baseball. We incorporate real-time weather forecasts including temperature, precipitation, wind speed and direction, and how these factors specifically affect each venue. Our models quantify these impacts differently based on team playing styles, historical performance in similar conditions, and specific player advantages/disadvantages.',
      },
      {
        question: 'How do you account for injuries in your models?',
        answer:
          "Our models include detailed player value metrics that quantify each player's contribution across various statistical categories. When injuries occur, we adjust our projections based on replacement players, team depth, historical performance without the injured player, and tactical adjustments teams typically make to compensate. For key positions like quarterback in football, we have specific models to capture the substantial impact these injuries can have.",
      },
    ],
  },
  {
    title: 'Account & Billing',
    faqs: [
      {
        question: 'How do I cancel my subscription?',
        answer:
          "You can cancel your subscription at any time from your account settings page. Select 'Subscription' from your profile menu, then click 'Cancel Subscription'. Your access will continue until the end of your current billing period. If you have any issues with cancellation, please contact our support team directly for assistance.",
      },
      {
        question: 'Can I share my account with friends?',
        answer:
          "Account sharing is not permitted. Each subscription is intended for individual use only. We monitor accounts for unusual login patterns that suggest sharing. If sharing is detected, we reserve the right to terminate the account without refund. If you're interested in group rates for multiple users, please contact our support team about our enterprise plans.",
      },
      {
        question: 'Do you offer discounts for longer subscription commitments?',
        answer:
          'Yes, we offer progressive discounts for longer subscription commitments. Quarterly subscriptions receive a 10% discount compared to the monthly rate, and annual subscriptions receive a 20% discount. We occasionally offer special promotions with additional discounts, particularly around the start of major sports seasons.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and select cryptocurrencies including Bitcoin and Ethereum. All transactions are processed securely through industry-standard payment processors with encryption to protect your financial information.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <PageLayout>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-100 sm:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Find answers to common questions about sports betting, our methodology, and how to
              maximize your betting success.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.title} className={categoryIndex > 0 ? 'mt-16' : ''}>
                <h2 className="text-2xl font-semibold text-gray-100 mb-8">{category.title}</h2>
                <dl className="divide-y divide-gray-700/30">
                  {category.faqs.map(faq => (
                    <Disclosure key={faq.question}>
                      {({ open }) => (
                        <div className="py-6 first:pt-0 last:pb-0">
                          <dt>
                            <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-100">
                              <span className="text-base/7 font-semibold">{faq.question}</span>
                              <span className="ml-6 flex h-7 items-center">
                                <PlusSmallIcon
                                  aria-hidden="true"
                                  className={`size-6 ${open ? 'hidden' : 'block'}`}
                                />
                                <MinusSmallIcon
                                  aria-hidden="true"
                                  className={`size-6 ${open ? 'block' : 'hidden'}`}
                                />
                              </span>
                            </DisclosureButton>
                          </dt>
                          <DisclosurePanel as="dd" className="mt-2 pr-12">
                            <p className="text-base/7 text-gray-300">{faq.answer}</p>
                          </DisclosurePanel>
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-gray-100">Still have questions?</h2>
            <p className="mt-6 text-base leading-7 text-gray-300">
              Can't find the answer you're looking for? Please reach out to our customer support
              team.
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="rounded-md bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
