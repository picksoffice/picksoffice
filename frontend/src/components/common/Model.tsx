import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const features = [
  {
    name: 'Bayesian Statistical Models',
    description:
      'I employ Bayesian statistics to systematically incorporate prior knowledge into probabilistic forecasts, with continuous model updating as new data becomes available.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Monte Carlo Simulations',
    description:
      'My approach utilizes thousands of game simulations through Monte Carlo methods to realistically model uncertainty and calculate robust probability intervals for various outcomes.',
    icon: LockClosedIcon,
  },
  {
    name: 'Machine Learning & Data Science',
    description:
      'I leverage advanced algorithms like gradient boosting and neural networks to analyze over 3,000 variables per game, with automated data processing via Python and SQL databases.',
    icon: ServerIcon,
  },
];

const codeLanguage = 'typescript'; // Changed to TS
const code = `import * as math from 'mathjs';

// Example TS code for ELO probability
function eloProb(r1: number, r2: number): number {
  return 1 / (1 + Math.pow(10, (r2 - r1) / 400));
}

// Simulate result
function simulateResult(a: number, b: number): number {
  return eloProb(a, b) + math.random(-1, 1) > 0.5 ? 1 : 0;
}

// Update rating
function updateRating(r: number, s: number, expected: number, k = 20): number {
  return r + k * (s - expected);
}

// Usage example
const teams = { LAL: 1500, BOS: 1600 };
const res = simulateResult(teams.LAL, teams.BOS);
console.log(res);`;

const tabs = [
  { name: 'picksoffice_betting_model.ts', isActive: true },
  { name: 'predictions.ts', isActive: false },
];

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg {...props}>
      {/* SVG content – add if needed, e.g. */}
      <circle cx="12" cy="12" r="10" fill="red" />
    </svg>
  );
}

export default function Model() {
  return (
    <div>
      <h2>Sports Analytics</h2>
      <h3>Predictive Modeling</h3>
      <p>
        My sophisticated methodology combines advanced statistics, data science, and machine
        learning to identify the most valuable betting opportunities. Each pick comes with a
        detailed writeup explaining my analysis and reasoning.
      </p>
      {features.map(feature => (
        <Fragment key={feature.name}>
          <feature.icon />
          <h4>{feature.name}</h4>
          <p>{feature.description}</p>
        </Fragment>
      ))}
      <div>{/* Main container with glass effect */}</div>
      <div>{/* Top highlight line */}</div>
      <div>{/* Bottom highlight line */}</div>
      <div>{/* Traffic lights */}</div>
      <div>
        {/* Tabs */}
        {tabs.map(tab => (
          <div key={tab.name}>{tab.name}</div>
        ))}
      </div>
      <div>
        {/* Code block */}
        <div>{/* Line numbers */}</div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
