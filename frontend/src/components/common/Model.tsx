import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

const features = [
  {
    name: 'Bayesian Statistical Models',
    description:
      'I employ Bayesian statistics to systematically incorporate prior knowledge into probabilistic forecasts, with continuous model updating as new data becomes available.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Monte Carlo Simulations',
    description: 'My approach utilizes thousands of game simulations through Monte Carlo methods to realistically model uncertainty and calculate robust probability intervals for various outcomes.',
    icon: LockClosedIcon,
  },
  {
    name: 'Machine Learning & Data Science',
    description: 'I leverage advanced algorithms like gradient boosting and neural networks to analyze over 3,000 variables per game, with automated data processing via Python and SQL databases.',
    icon: ServerIcon,
  },
]

const codeLanguage = 'python'
const code = `import numpy as np
from scipy.special import expit as sigmoid

teams = {t: 1500 + np.random.randn()*25 for t in ['LAL','BOS','MIL','PHI','MIA','GSW','NYK','DAL','DEN','CHI']}
schedule = [(np.random.choice(list(teams)), np.random.choice(list(teams))) for _ in range(500) if _ % 11 != 0]

def elo_prob(r1, r2): return 1 / (1 + 10 ** ((r2 - r1) / 400))
def simulate_result(a, b): return int(elo_prob(teams[a], teams[b]) + np.random.normal(0, 1) > 0.5)
def update_rating(r, s, expected, k=20): return r + k * (s - expected)

results = []
for a, b in schedule:
    res = simulate_result(a, b)
    ea, eb = elo_prob(teams[a], teams[b]), elo_prob(teams[b], teams[a])
    teams[a], teams[b] = update_rating(teams[a], res, ea), update_rating(teams[b], 1 - res, eb)
    results.append(res)

X = np.array([[teams[a], teams[b], elo_prob(teams[a], teams[b])] for a, b in schedule])
y = np.array(results)
w = np.linalg.pinv(X.T @ X) @ X.T @ y
predict = lambda a, b: sigmoid(np.dot([teams[a], teams[b], elo_prob(teams[a], teams[b])], w))
bets = [(a, b, predict(a, b)) for a, b in schedule if abs(predict(a, b) - 0.5) > 0.2]`

const tabs = [
  { name: 'picksoffice_betting_model.py', isActive: true },
  { name: 'predictions.py', isActive: false },
]

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export default function Model() {
  return (
    <div className="overflow-hidden bg-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8 px-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start relative">
          <div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-sky-300">Sports Analytics</h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
                Predictive Modeling
              </p>
              <p className="mt-6 text-lg/8 text-gray-300">
                My sophisticated methodology combines advanced statistics, data science, and machine learning to identify the most valuable betting opportunities. Each pick comes with a detailed writeup explaining my analysis and reasoning.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-100">
                      <feature.icon className="absolute left-1 top-1 size-5 text-sky-300" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="pr-0 pl-4 lg:px-0 relative overflow-hidden">
            <div className="relative isolate overflow-hidden pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:px-6 sm:pt-16 lg:mx-0 lg:max-w-none">
              
              {/* Main container with glass effect */}
              <div className="relative rounded-l-2xl rounded-r-none bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur-sm w-[calc(100%+100vw)] mr-[-100vw] sm:rounded-r-2xl sm:w-full sm:mr-0">
                {/* Top highlight line */}
                <div className="absolute -top-px right-11 left-20 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                {/* Bottom highlight line */}
                <div className="absolute right-20 -bottom-px left-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300 to-sky-300/0" />
                
                <div className="pt-4 pl-4">
                  {/* Traffic lights */}
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  
                  {/* Tabs */}
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={`flex h-6 rounded-full ${
                          tab.isActive
                            ? 'bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300'
                            : 'text-slate-500'
                        }`}
                      >
                        <div
                          className={`flex items-center rounded-full px-2.5 ${
                            tab.isActive && 'bg-slate-800'
                          }`}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Code block */}
                  <div className="mt-6 flex items-start px-1 text-sm">
                    {/* Line numbers */}
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    
                    {/* Code content */}
                    <pre className="overflow-x-auto pl-4 text-sky-300 pb-6 text-xs">
                      <code>
                        <span className="text-sky-300">import</span>
                        <span className="text-slate-300"> numpy </span>
                        <span className="text-sky-300">as</span>
                        <span className="text-slate-300"> np</span>
                        <br />
                        <span className="text-sky-300">from</span>
                        <span className="text-slate-300"> scipy.special </span>
                        <span className="text-sky-300">import</span>
                        <span className="text-slate-300"> expit </span>
                        <span className="text-sky-300">as</span>
                        <span className="text-slate-300"> sigmoid</span>
                        <br />
                        <br />
                        <span className="text-slate-300">teams = {`{`}t: 1500 + np.random.randn()*25 </span>
                        <span className="text-sky-300">for</span>
                        <span className="text-slate-300"> t </span>
                        <span className="text-sky-300">in</span>
                        <span className="text-emerald-300"> ['LAL','BOS','MIL','PHI','MIA','GSW','NYK','DAL','DEN','CHI']</span>
                        <span className="text-slate-300">{`}`}</span>
                        <br />
                        <span className="text-slate-300">schedule = [(np.random.choice(list(teams)), np.random.choice(list(teams))) </span>
                        <span className="text-sky-300">for</span>
                        <span className="text-slate-300"> _ </span>
                        <span className="text-sky-300">in</span>
                        <span className="text-slate-300"> range(500) </span>
                        <span className="text-sky-300">if</span>
                        <span className="text-slate-300"> _ % 11 != 0]</span>
                        <br />
                        <br />
                        <span className="text-sky-300">def</span>
                        <span className="text-yellow-300"> elo_prob</span>
                        <span className="text-slate-300">(r1, r2): </span>
                        <span className="text-sky-300">return</span>
                        <span className="text-slate-300"> 1 / (1 + 10 ** ((r2 - r1) / 400))</span>
                        <br />
                        <span className="text-sky-300">def</span>
                        <span className="text-yellow-300"> simulate_result</span>
                        <span className="text-slate-300">(a, b): </span>
                        <span className="text-sky-300">return</span>
                        <span className="text-slate-300"> </span>
                        <span className="text-purple-300">int</span>
                        <span className="text-slate-300">(elo_prob(teams[a], teams[b]) + np.random.normal(0, 1) > 0.5)</span>
                        <br />
                        <span className="text-sky-300">def</span>
                        <span className="text-yellow-300"> update_rating</span>
                        <span className="text-slate-300">(r, s, expected, k=20): </span>
                        <span className="text-sky-300">return</span>
                        <span className="text-slate-300"> r + k * (s - expected)</span>
                        <br />
                        <br />
                        <span className="text-slate-300">results = []</span>
                        <br />
                        <span className="text-sky-300">for</span>
                        <span className="text-slate-300"> a, b </span>
                        <span className="text-sky-300">in</span>
                        <span className="text-slate-300"> schedule:</span>
                        <br />
                        <span className="text-slate-300">    res = simulate_result(a, b)</span>
                        <br />
                        <span className="text-slate-300">    ea, eb = elo_prob(teams[a], teams[b]), elo_prob(teams[b], teams[a])</span>
                        <br />
                        <span className="text-slate-300">    teams[a], teams[b] = update_rating(teams[a], res, ea), update_rating(teams[b], 1 - res, eb)</span>
                        <br />
                        <span className="text-slate-300">    results.append(res)</span>
                        <br />
                        <br />
                        <span className="text-slate-300">X = np.array([[teams[a], teams[b], elo_prob(teams[a], teams[b])] </span>
                        <span className="text-sky-300">for</span>
                        <span className="text-slate-300"> a, b </span>
                        <span className="text-sky-300">in</span>
                        <span className="text-slate-300"> schedule])</span>
                        <br />
                        <span className="text-slate-300">y = np.array(results)</span>
                        <br />
                        <span className="text-slate-300">w = np.linalg.pinv(X.T @ X) @ X.T @ y</span>
                        <br />
                        <span className="text-slate-300">predict = </span>
                        <span className="text-sky-300">lambda</span>
                        <span className="text-slate-300"> a, b: sigmoid(np.dot([teams[a], teams[b], elo_prob(teams[a], teams[b])], w))</span>
                        <br />
                        <span className="text-slate-300">bets = [(a, b, predict(a, b)) </span>
                        <span className="text-sky-300">for</span>
                        <span className="text-slate-300"> a, b </span>
                        <span className="text-sky-300">in</span>
                        <span className="text-slate-300"> schedule </span>
                        <span className="text-sky-300">if</span>
                        <span className="text-slate-300"> abs(predict(a, b) - 0.5) > 0.2]</span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}