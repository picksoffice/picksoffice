import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

// Define the betting glossary with a key for each letter of the alphabet
const bettingGlossary = {
  'A': [
    {
      term: 'Against the Spread (ATS)',
      definition: 'Betting on a team to perform better than the point spread set by oddsmakers. For example, if the Patriots are -7 against the Jets, they must win by more than 7 points for a Patriots ATS bet to win.'
    },
    {
      term: 'Arbitrage',
      definition: 'A betting strategy where a bettor places wagers on all possible outcomes of an event at odds that guarantee a profit regardless of the result. This opportunity arises when different sportsbooks offer different odds on the same event.'
    },
    {
      term: 'Action',
      definition: 'Any type of wager placed on a sporting event. If a bettor has "action" on a game, it means they have money at stake on the outcome.'
    }
  ],
  'B': [
    {
      term: 'Bankroll Management',
      definition: 'A methodology for managing your betting funds to maximize long-term profits and minimize the risk of ruin. Proper bankroll management involves setting bet sizes as a percentage of your total funds based on the perceived edge and confidence level.'
    },
    {
      term: 'Backdoor Cover',
      definition: 'When a team covers the spread in the final moments of a game, often in a meaningless way that doesn\'t affect the actual winner. For example, a team scoring a touchdown in the final seconds to lose by 5 instead of 12 when they were +7 underdogs.'
    },
    {
      term: 'Bok',
      definition: 'Short for bookmaker or sportsbook. The entity that accepts wagers on sporting events and creates the odds or point spreads for those events.'
    }
  ],
  'C': [
    {
      term: 'Closing Line',
      definition: 'The final betting line offered by a sportsbook right before a game begins. The ability to consistently beat the closing line is considered a strong indicator of a bettor\'s long-term profitability.'
    },
    {
      term: 'Closing Line Value (CLV)',
      definition: 'The difference between the odds at which a bettor placed their wager and the closing line. Positive CLV occurs when a bettor gets better odds than were available at close, indicating they identified value before the market corrected.'
    },
    {
      term: 'Contrarian Betting',
      definition: 'A strategy of betting against public opinion or the popular side. This approach is based on the premise that the public often overvalues favorites and popular teams, creating value on the opposing side.'
    }
  ],
  'D': [
    {
      term: 'Dime Line',
      definition: 'A betting line with a 10-cent difference between the favorite and underdog in a money line bet, such as -150/+140. This represents the bookmaker\'s commission or "vig."'
    },
    {
      term: 'Diminishing Returns',
      definition: 'The concept that as bet size increases relative to bankroll, the expected value decreases due to increased variance and risk of ruin. This principle is central to optimal bankroll management strategies.'
    },
    {
      term: 'Dog (Underdog)',
      definition: 'A team or competitor expected to lose a particular game or match. Underdogs are represented with a plus sign (+) in point spread and moneyline odds.'
    }
  ],
  'E': [
    {
      term: 'Expected Value (EV)',
      definition: 'A calculation that determines the average outcome of a bet if it were placed many times. Positive expected value (+EV) indicates a profitable bet over the long run. For example, betting $100 at +110 odds on a true 50/50 proposition has an EV of +$5.'
    },
    {
      term: 'Edge',
      definition: 'The mathematical advantage a bettor has on a particular wager. An edge exists when the probability of an outcome occurring is greater than what the odds imply. Finding and exploiting edges is the primary goal of professional sports bettors.'
    },
    {
      term: 'Exotic Bet',
      definition: 'A wager on an unusual aspect of a game or on multiple events, such as props, parlays, teasers, or futures. These bets typically offer higher payouts but come with increased difficulty.'
    }
  ],
  'F': [
    {
      term: 'Fade',
      definition: 'To bet against a particular team, outcome, or public consensus. "Fading the public" is a common strategy among sophisticated bettors who capitalize on public biases.'
    },
    {
      term: 'Flat Betting',
      definition: 'A betting strategy where the same amount is wagered on each bet regardless of confidence level or perceived edge. While less optimal than proportional betting, flat betting provides simplicity and reduced variance.'
    },
    {
      term: 'Futures Bet',
      definition: 'A wager placed on an event that will be decided in the future, such as betting on a team to win the championship before the season begins. These bets typically offer high payouts due to the difficulty of prediction.'
    }
  ],
  'G': [
    {
      term: 'Gaussian Distribution',
      definition: 'Also known as the normal distribution or bell curve, this statistical concept is fundamental to sports modeling. Many performance metrics in sports approximate a normal distribution, which helps bettors calculate probabilities.'
    },
    {
      term: 'Grading',
      definition: 'The process of determining whether a bet wins or loses based on the final outcome of an event. Some bets may be graded as a push if the result exactly matches the spread or total.'
    },
    {
      term: 'Ghost Game',
      definition: 'A fabricated or non-existent sporting event created by scammers to defraud bettors. Legitimate sportsbooks only offer lines on verified events from recognized leagues and competitions.'
    }
  ],
  'H': [
    {
      term: 'Hedging',
      definition: 'Placing a bet on the opposite side of an original wager to guarantee a profit or minimize loss. This strategy is often used with futures bets or when line movement creates arbitrage opportunities.'
    },
    {
      term: 'Hook',
      definition: 'The half-point in a point spread (e.g., 7.5 instead of 7). The hook eliminates the possibility of a push and is often critical in close games where a team might win by exactly the whole number.'
    },
    {
      term: 'Handle',
      definition: 'The total amount of money wagered on a particular event or at a sportsbook. The handle is different from the book\'s revenue, as most of it is returned to winning bettors.'
    }
  ],
  'I': [
    {
      term: 'Implied Probability',
      definition: 'The probability of an outcome occurring as suggested by the odds. For example, odds of +200 imply a 33.3% probability (100/(200+100)). Finding discrepancies between implied and actual probabilities is key to profitable betting.'
    },
    {
      term: 'In-Play Betting',
      definition: 'Also known as live betting, this refers to placing wagers while an event is in progress. Odds fluctuate in real-time based on the current state of the game, creating opportunities for bettors with strong situational analysis skills.'
    },
    {
      term: 'Inflated Line',
      definition: 'A point spread or total that has been moved beyond what the true line should be, often due to heavy public betting on one side. Sharp bettors look for inflated lines as opportunities to find value.'
    }
  ],
  'J': [
    {
      term: 'Juice',
      definition: 'Also known as vig or vigorish, juice is the commission a sportsbook charges for accepting a bet. Standard juice is -110 on spread bets, meaning bettors must risk $110 to win $100. Reducing juice increases a bettor\'s expected ROI.'
    },
    {
      term: 'Joint Probability',
      definition: 'The likelihood of two or more independent events occurring simultaneously. This calculation is essential for determining the true odds of parlay bets. For example, the joint probability of two 50% propositions occurring is 25%.'
    },
    {
      term: 'Junk Line',
      definition: 'A betting line that appears to have little thought or analysis behind it, often seen in obscure markets or early openers. Sharp bettors target these lines before the market corrects them.'
    }
  ],
  'K': [
    {
      term: 'Kelly Criterion',
      definition: 'A mathematical formula used to determine the optimal bet size based on the perceived edge and odds. The Kelly formula is: (bp - q) / b, where b = odds - 1, p = probability of winning, and q = probability of losing. Many professional bettors use a fractional Kelly approach to reduce variance.'
    },
    {
      term: 'Key Numbers',
      definition: 'The most common margins of victory in a sport, particularly important in football where games often end with point differentials of 3, 7, 10, 14, etc. Understanding key numbers is crucial for spread betting and buying points.'
    },
    {
      term: 'Kiosk',
      definition: 'A self-service betting terminal in physical sportsbooks that allows bettors to place wagers without interacting with staff. These machines have become increasingly common as sports betting expands across the United States.'
    }
  ],
  'L': [
    {
      term: 'Line Movement',
      definition: 'The shifting of odds or point spreads from their opening number to the closing line. Line movement can be caused by betting volume, injury news, or sharp action. Tracking line movement provides insights into market sentiment and professional betting patterns.'
    },
    {
      term: 'Lock',
      definition: 'A bet perceived to have an extremely high probability of winning. However, experienced bettors understand that there is no such thing as a guaranteed win in sports betting due to inherent variance and unpredictability.'
    },
    {
      term: 'Lay the Points',
      definition: 'Betting on the favorite in a point spread wager, requiring the favorite to win by more than the spread. The opposite of "taking the points" with the underdog.'
    }
  ],
  'M': [
    {
      term: 'Monte Carlo Simulation',
      definition: 'A computational algorithm that uses repeated random sampling to obtain numerical results for complex probability problems. In sports betting, Monte Carlo simulations can model game outcomes thousands of times to establish confidence intervals and true probabilities.'
    },
    {
      term: 'Middle',
      definition: 'A betting strategy where a bettor places wagers on both sides of a line that has moved, creating a situation where both bets can win if the final result falls between the two numbers. For example, betting Lions +3.5 early and then Bears -2.5 after line movement.'
    },
    {
      term: 'Money Line',
      definition: 'A bet on which team will win outright, regardless of the point spread. American odds format shows favorites with a negative number (amount needed to bet to win $100) and underdogs with a positive number (amount won on a $100 bet).'
    }
  ],
  'N': [
    {
      term: 'No Action',
      definition: 'When a bet is canceled and the stake is returned to the bettor. This can occur when a game is postponed, a player doesn\'t participate in a prop bet, or other conditions specified by the sportsbook aren\'t met.'
    },
    {
      term: 'Negative Expected Value (-EV)',
      definition: 'A bet that will lose money over the long run, even if it might win in a single instance. All sportsbook bets have a built-in -EV due to the vig, but some are more unfavorable than others, such as most parlays and teasers.'
    },
    {
      term: 'Neuro-Dynamic Programming',
      definition: 'An advanced machine learning approach that combines neural networks with dynamic programming, often used in sophisticated sports betting models to recognize patterns in complex, high-dimensional data with non-linear relationships.'
    }
  ],
  'O': [
    {
      term: 'Odds',
      definition: 'The numerical expression of the probability of an event occurring. In sports betting, odds can be expressed in American (-110, +240), decimal (1.91, 3.40), or fractional (10/11, 12/5) formats. Odds determine the payout for winning bets.'
    },
    {
      term: 'Over/Under (Total)',
      definition: 'A bet on whether the combined score of both teams will be higher (over) or lower (under) than a number set by oddsmakers. This is one of the most common bet types across all sports.'
    },
    {
      term: 'Opportunity Cost',
      definition: 'The loss of potential gain from alternative betting opportunities when one specific option is chosen. Professional bettors consider opportunity cost when allocating their bankroll to various wagers.'
    }
  ],
  'P': [
    {
      term: 'Parlay',
      definition: 'A single bet that links together multiple wagers, requiring all selections to win for the bet to pay out. Parlays offer higher potential returns but at significantly increased risk, making them generally -EV propositions despite their popularity.'
    },
    {
      term: 'Point Spread',
      definition: 'A handicap assigned by oddsmakers to create a margin between the favorite and underdog, essentially giving the underdog a head start. Bettors can wager on whether the favorite will "cover" (win by more than the spread) or the underdog will "cover" (lose by less than the spread or win outright).'
    },
    {
      term: 'Poisson Distribution',
      definition: 'A probability distribution that expresses the likelihood of a given number of events occurring within a fixed time interval. In sports betting, Poisson models are particularly useful for predicting goal and point totals in soccer, hockey, and basketball.'
    }
  ],
  'Q': [
    {
      term: 'Quinella',
      definition: 'A horse racing bet where the bettor must select the first and second place finishers in a race, but not necessarily in the correct order. Understanding these specialized bet types is helpful when applying betting principles across different markets.'
    },
    {
      term: 'Quick Line',
      definition: 'The first betting line released for a game, often before comprehensive analysis has been done. These early lines may offer value to knowledgeable bettors before the market adjusts.'
    },
    {
      term: 'Quantitative Analysis',
      definition: 'The use of mathematical and statistical modeling to evaluate betting opportunities. This approach relies on data rather than subjective opinions and is the foundation of most successful professional betting operations.'
    }
  ],
  'R': [
    {
      term: 'Regression to the Mean',
      definition: 'The statistical tendency for extreme outcomes to move closer to average over time. This concept is crucial in sports betting for identifying unsustainable performance outliers, such as unusually high shooting percentages or turnover rates.'
    },
    {
      term: 'Return on Investment (ROI)',
      definition: 'The percentage measure of profitability calculated by dividing net profit by the total amount wagered. For example, if you bet $10,000 and make a profit of $500, your ROI is 5%. Professional bettors typically target ROIs of 2-10% over large sample sizes.'
    },
    {
      term: 'Run Line',
      definition: 'The baseball equivalent of a point spread, typically set at 1.5 runs. Betting the favorite on the run line means they must win by 2 or more runs, while betting the underdog means they can lose by 1 run or win outright.'
    }
  ],
  'S': [
    {
      term: 'Sharp Money',
      definition: 'Wagers placed by professional or highly skilled bettors. Sportsbooks closely monitor sharp money as it often indicates the "correct" side of a bet and can trigger significant line movements despite relatively small betting volume.'
    },
    {
      term: 'Steam',
      definition: 'A sudden, significant line movement across multiple sportsbooks, typically caused by coordinated betting from professional syndicates. "Chasing steam" refers to the strategy of following these line movements to capitalize on sharp action.'
    },
    {
      term: 'Synthetic Hold',
      definition: 'The theoretical profit margin a sportsbook should earn on a particular market based on the odds offered. Understanding synthetic hold helps bettors identify which markets have the highest and lowest house advantages.'
    }
  ],
  'T': [
    {
      term: 'Teaser',
      definition: 'A type of parlay bet that allows the bettor to adjust the point spread or total in their favor in exchange for reduced odds. Common teaser adjustments are 6, 6.5, or 7 points in football and 4, 4.5, or 5 points in basketball.'
    },
    {
      term: 'True Odds',
      definition: 'The actual probability of an outcome occurring, as opposed to the implied probability from betting odds. Finding discrepancies between true odds and implied odds is the fundamental goal of advantage betting.'
    },
    {
      term: 'Trend-Based Betting',
      definition: 'An approach that relies on historical patterns to predict future outcomes. While some trends have predictive value, many are coincidental or lack statistical significance, making trend-based betting generally less reliable than mathematical modeling.'
    }
  ],
  'U': [
    {
      term: 'Underlay',
      definition: 'A bet where the odds are worse than the true probability justifies. For example, betting on a team at -200 (66.7% implied probability) when their true win probability is only 60% represents an underlay and a -EV proposition.'
    },
    {
      term: 'Unders System',
      definition: 'A betting strategy focused on wagering on the under in total betting markets, often based on the statistical tendency for scoring to decline in specific situations such as cold weather, playoff games, or divisional matchups.'
    },
    {
      term: 'Unit',
      definition: 'A standardized betting amount representing a consistent percentage of a bettor\'s bankroll (typically 1-5%). Using units rather than dollar amounts allows for consistent risk management and more meaningful performance tracking.'
    }
  ],
  'V': [
    {
      term: 'Value',
      definition: 'The concept that a bet offers positive expected returns based on a discrepancy between the implied probability of the odds and the true probability of the outcome. Finding value is the cornerstone of profitable sports betting.'
    },
    {
      term: 'Variance',
      definition: 'The mathematical measure of how individual results can differ from the expected average outcome. High variance means results can swing dramatically in the short term, requiring larger sample sizes and bankrolls to realize theoretical advantages.'
    },
    {
      term: 'Vigorish (Vig)',
      definition: 'The commission charged by a sportsbook on bets, also known as juice or margin. Standard vig on point spread bets is -110 on both sides, creating an implied probability of 52.38% for a market with a true probability of 50%, representing a 4.76% house edge.'
    }
  ],
  'W': [
    {
      term: 'Welps',
      definition: 'Bets that look analytically sound but lose due to unexpected circumstances or bad luck. Recognizing welps is important for maintaining discipline and not abandoning sound strategies after short-term negative variance.'
    },
    {
      term: 'Wong Teaser',
      definition: 'A teaser strategy popularized by Stanford Wong that focuses on crossing key numbers in football, particularly teasing favorites down from -7.5 to -1.5 or underdogs up from +1.5 to +7.5. When executed properly, Wong teasers can offer positive expected value.'
    },
    {
      term: 'Wise Guy',
      definition: 'A term for a sharp or professional bettor known for making informed wagers based on statistical analysis rather than emotion or fan loyalty. Sportsbooks monitor wise guy action closely as an indicator of where the line should move.'
    }
  ],
  'X': [
    {
      term: 'XFL Lines',
      definition: 'Betting markets for alternative or new leagues like the XFL often present value opportunities due to bookmakers\' limited information and lower betting limits. Professional bettors often target these inefficient markets to capitalize on mispriced odds.'
    },
    {
      term: 'Xtra Points (Alternative Lines)',
      definition: 'Additional betting lines offered beyond the standard point spread or total, such as alternate spreads and totals. These markets often carry higher vig but can present value in certain situations or as part of a larger betting strategy.'
    },
    {
      term: 'X-Factor Analysis',
      definition: 'The consideration of intangible elements that traditional statistics might not capture, such as motivation, travel fatigue, weather impacts, or coaching tendencies. While difficult to quantify, these factors can significantly influence game outcomes.'
    }
  ],
  'Y': [
    {
      term: 'Yield',
      definition: 'Another term for Return on Investment (ROI), representing the percentage return on money wagered. A yield of 5% means that for every $100 wagered, the bettor makes a $5 profit on average over the long run.'
    },
    {
      term: 'Yo-Yo Lines',
      definition: 'Betting lines that move back and forth repeatedly before a game starts, often indicating disagreement between sharp money and public money or uncertainty regarding key information like injuries.'
    },
    {
      term: 'Young Money',
      definition: 'A term referring to new or inexperienced bettors who typically bet based on emotion rather than analysis. Professional bettors often profit by identifying and betting against markets heavily influenced by young money.'
    }
  ],
  'Z': [
    {
      term: 'Zero-Sum Game',
      definition: 'A situation where one participant\'s gain is exactly balanced by another participant\'s loss. While sports betting might appear to be a zero-sum game, the presence of vigorish makes it negative-sum for bettors collectively unless they can beat the closing line consistently.'
    },
    {
      term: 'Zig-Zag Theory',
      definition: 'A playoff betting strategy, particularly in basketball, that suggests betting on teams that lost their previous game, based on the theory that they will be more motivated and make adjustments. The efficacy of this approach has declined as markets have become more efficient.'
    },
    {
      term: 'Zone Rating',
      definition: 'A defensive metric in baseball that measures a player\'s effectiveness in fielding balls hit to their position\'s typical area of responsibility. Understanding advanced metrics like zone rating is crucial for accurately evaluating team strength in statistical betting models.'
    }
  ]
};

export default function BettingABC() {
  return (
    <PageLayout>
      <div className="py-12 px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="lg:text-center mb-12">
          <h2 className="text-base font-semibold text-sky-300">Betting Knowledge</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The A-Z of Sports Betting
          </p>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            This comprehensive glossary covers essential terms and concepts every sports bettor should understand. From bankroll management principles to statistical methodologies, mastering these concepts will help you develop a more analytical and profitable approach to sports betting.
          </p>
        </div>

        <div>
          {Object.entries(bettingGlossary).map(([letter, terms]) => (
            <div key={letter} className="mb-10" id={letter}>
              <h3 className="text-3xl font-bold text-white border-b pb-2 mb-4 border-gray-700">
                {letter}
              </h3>
              <dl className="space-y-6">
                {terms.map((item, index) => (
                  <div key={index} className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10 ring-1 ring-white/10">
                    <dt className="text-xl font-bold text-white mb-2">{item.term}</dt>
                    <dd className="text-gray-300">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* Alphabet Jump Navigation */}
        <div className="sticky bottom-4 left-0 right-0 mx-auto max-w-4xl bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg z-50 mt-8">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(bettingGlossary).map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-sky-700 text-white font-semibold transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}