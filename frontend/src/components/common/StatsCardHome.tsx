'use client';

import React from 'react';
import { 
  ChartBarIcon, 
  ComputerDesktopIcon, 
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

const stats = [
  { 
    id: 1, 
    name: 'Win Rate', 
    value: '56%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L12 12.01" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) 
  },
  { 
    id: 2, 
    name: 'ROI', 
    value: '7.5%',
    icon: <ChartBarIcon className="w-6 h-6" />
  },
  { 
    id: 3, 
    name: 'Data Points Per Game', 
    value: '3000+',
    icon: <ComputerDesktopIcon className="w-6 h-6" />
  },
  { 
    id: 4, 
    name: 'Years of Experience', 
    value: '10+',
    icon: <AcademicCapIcon className="w-6 h-6" />
  },
];

export default function StatsCardHome() {
  return (
    <div className="bg-transparent py-16 sm:py-24 relative isolate">
      {/* Stats cards blob - specifically positioned behind the stats cards */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1108/632] w-[40rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-15"
        />
      </div>
      
      {/* Additional blob for trusted by creators section */}
      <div
        aria-hidden="true"
        className="absolute right-[20%] bottom-[20%] -z-10 transform-gpu blur-3xl"
      >
        <div
          className="aspect-[1/1] w-[30rem] rounded-full bg-gradient-to-r from-[#4f46e5] to-[#80caff] opacity-15"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-left sm:text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Numbers Don't Lie
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Proven success through data-driven analysis and years of experience
            </p>
          </div>
          <dl className="mt-10 sm:mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="flex flex-col rounded-2xl bg-slate-800/30 backdrop-blur-sm p-5 sm:p-6 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <dt className="text-xs sm:text-sm font-semibold text-gray-300">
                    {stat.name === 'Data Points Per Game' ? (
                      <>
                        <span className="sm:hidden">Data Points<br />Per Game</span>
                        <span className="hidden sm:inline">Data Points Per Game</span>
                      </>
                    ) : stat.name}
                  </dt>
                  <div className="text-sky-300">
                    {stat.icon}
                  </div>
                </div>
                <dd className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
          
          <div className="mt-8 text-center">
            <a 
              href="/statistics" 
              className="inline-flex items-center text-sky-300 hover:text-blue-300 transition-colors font-medium"
            >
              See All Stats
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-5 h-5 ml-1"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" 
                  clipRule="evenodd" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}