'use client';

import React, { useEffect, useState } from 'react';
import { ChartBarIcon, ComputerDesktopIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface Stat {
  id: number;
  name: string;
  value: string;
  icon: JSX.Element;
}

interface StatsResponse {
  overallStats: {
    winRate: string;
    roi: string;
  };
}

const defaultStats: Stat[] = [
  { id: 1, name: 'Win Rate', value: '0%', icon: <ChartBarIcon className="w-6 h-6" /> },
  { id: 2, name: 'ROI', value: '0%', icon: <ChartBarIcon className="w-6 h-6" /> },
  { id: 3, name: 'Data Points Per Game', value: '3000+', icon: <ComputerDesktopIcon className="w-6 h-6" /> },
  { id: 4, name: 'Years of Experience', value: '10+', icon: <AcademicCapIcon className="w-6 h-6" /> },
];

export default function StatsCardHome() {
  const [stats, setStats] = useState<Stat[]>(defaultStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fallback-Werte für die Startseite, falls die API nicht erreichbar ist
        const defaultWinRate = 56;
        const defaultROI = 7.5;

        setStats([
          { id: 1, name: 'Win Rate', value: `${defaultWinRate}%`, icon: <ChartBarIcon className="w-6 h-6" /> },
          { id: 2, name: 'ROI', value: `${defaultROI}%`, icon: <ChartBarIcon className="w-6 h-6" /> },
          { id: 3, name: 'Data Points Per Game', value: '3000+', icon: <ComputerDesktopIcon className="w-6 h-6" /> },
          { id: 4, name: 'Years of Experience', value: '10+', icon: <AcademicCapIcon className="w-6 h-6" /> },
        ]);
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://picksoffice.onrender.com'}/api/picks/all-for-stats?mode=calculated`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
          }
        );

        if (response.ok) {
          const data: StatsResponse = await response.json();
          // Nur aktualisieren, wenn gültige Werte zurückgegeben werden
          if (data.overallStats && data.overallStats.winRate && data.overallStats.roi) {
            setStats([
              { id: 1, name: 'Win Rate', value: `${data.overallStats.winRate}%`, icon: <ChartBarIcon className="w-6 h-6" /> },
              { id: 2, name: 'ROI', value: `${data.overallStats.roi}%`, icon: <ChartBarIcon className="w-6 h-6" /> },
              { id: 3, name: 'Data Points Per Game', value: '3000+', icon: <ComputerDesktopIcon className="w-6 h-6" /> },
              { id: 4, name: 'Years of Experience', value: '10+', icon: <AcademicCapIcon className="w-6 h-6" /> },
            ]);
          }
        } else {
          console.error('Failed to fetch stats:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Bei Fehler werden bereits die Default-Werte oben gesetzt
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-transparent py-16 sm:py-24 relative isolate">
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
                  <div className="text-sky-300">{stat.icon}</div>
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