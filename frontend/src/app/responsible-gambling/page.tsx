'use client';

import PageLayout from '@/components/layout/PageLayout';

export default function ResponsibleGambling() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-4xl py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Responsible Gambling</h1>
          <p className="text-xl text-gray-400">Our commitment to promoting safe and responsible betting practices</p>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <h2>Our Commitment</h2>
          <p>
            At PicksOffice, we are committed to promoting responsible gambling practices. While we provide sports betting analysis and predictions, we recognize that gambling should always be approached as entertainment, not as a way to make money. We encourage all our users to gamble responsibly and within their means.
          </p>

          <h2>Understanding Responsible Gambling</h2>
          <p>
            Responsible gambling means viewing betting as a form of entertainment rather than a source of income. It involves making informed choices based on knowledge of how gambling works and the associated risks. Key aspects include:
          </p>
          <ul>
            <li>Setting time and money limits before you start gambling</li>
            <li>Only gambling with money you can afford to lose</li>
            <li>Never chasing your losses</li>
            <li>Not gambling when you're upset, angry, or depressed</li>
            <li>Balancing gambling with other activities</li>
          </ul>

          <h2>Signs of Problem Gambling</h2>
          <p>
            Problem gambling is characterized by an inability to control or limit gambling behavior despite negative consequences. Signs that gambling may be becoming a problem include:
          </p>
          <ul>
            <li>Spending more money and time on gambling than you can afford</li>
            <li>Finding it hard to manage or stop your gambling</li>
            <li>Having arguments with family or friends about money and gambling</li>
            <li>Losing interest in your usual activities or hobbies</li>
            <li>Always thinking or talking about gambling</li>
            <li>Lying about your gambling or hiding it from other people</li>
            <li>Chasing losses or gambling to get out of financial trouble</li>
            <li>Gambling until all your money is gone</li>
            <li>Borrowing money, selling possessions, or not paying bills in order to fund gambling</li>
            <li>Neglecting work, education, family, personal needs, or household responsibilities</li>
          </ul>

          <h2>Tools for Responsible Gambling</h2>
          <p>
            Many betting platforms offer tools to help you stay in control of your gambling:
          </p>
          <ul>
            <li><strong>Deposit limits:</strong> Set daily, weekly, or monthly deposit limits</li>
            <li><strong>Time limits:</strong> Set limits on how long you can play</li>
            <li><strong>Loss limits:</strong> Set limits on how much you can lose</li>
            <li><strong>Session reminders:</strong> Receive alerts about how long you've been playing</li>
            <li><strong>Self-exclusion:</strong> Temporarily or permanently block access to your betting account</li>
            <li><strong>Reality checks:</strong> Periodic notifications showing time and money spent</li>
          </ul>

          <h2>Getting Help</h2>
          <p>
            If you or someone you know might have a gambling problem, there are numerous resources available:
          </p>
          <ul>
            <li><strong>National Problem Gambling Helpline:</strong> 1-800-522-4700 (Call or text, available 24/7)</li>
            <li><strong>Gamblers Anonymous:</strong> <a href="http://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer">www.gamblersanonymous.org</a></li>
            <li><strong>National Council on Problem Gambling:</strong> <a href="http://www.ncpgambling.org" target="_blank" rel="noopener noreferrer">www.ncpgambling.org</a></li>
            <li><strong>GamCare:</strong> <a href="http://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer">www.gamcare.org.uk</a></li>
            <li><strong>BeGambleAware:</strong> <a href="http://www.begambleaware.org" target="_blank" rel="noopener noreferrer">www.begambleaware.org</a></li>
          </ul>

          <h2>Our Policy</h2>
          <p>
            At PicksOffice, we take the following steps to promote responsible gambling:
          </p>
          <ul>
            <li>We provide transparent information about our betting analysis methodology</li>
            <li>We emphasize the importance of bankroll management in our content</li>
            <li>We never guarantee wins or promote gambling as a way to make money</li>
            <li>We include responsible gambling information and resources throughout our platform</li>
            <li>We verify user age to prevent underage gambling</li>
            <li>We train our staff to understand and promote responsible gambling practices</li>
          </ul>

          <h2>Final Thoughts</h2>
          <p>
            Remember, gambling should be enjoyable and not cause you or others any harm. If gambling is no longer fun or is affecting your life negatively, it's important to seek help. Always gamble responsibly, and never bet more than you can afford to lose.
          </p>

          <p className="text-sm mt-8">Last updated: April 26, 2024</p>
        </div>
      </div>
    </PageLayout>
  );
}