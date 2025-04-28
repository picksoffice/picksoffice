'use client';

import React from 'react';
import Link from 'next/link';

interface HeroProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showAnnouncement?: boolean;
  announcementText?: string;
  announcementLink?: string;
  announcementLinkText?: string;
}

export default function Hero({
  title,
  description,
  primaryButtonText = 'Get started',
  primaryButtonLink = '/picks',
  secondaryButtonText = 'Learn more',
  secondaryButtonLink = '/about',
  showAnnouncement = false,
  announcementText = '',
  announcementLink = '',
  announcementLinkText = 'Read more',
}: HeroProps) {
  // Splitte den Titel, um "Edge" zu isolieren
  const titleParts = title.split('Edge');
  const beforeEdge = titleParts[0];
  const afterEdge = titleParts[1] || '';

  return (
    <div className="relative isolate px-6 pt-10 lg:px-8 bg-transparent overflow-hidden">
      {/* Hero headline blob - specifically positioned behind the hero text */}
      <div
        aria-hidden="true" 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-[1108/632] w-[45rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-15"
        />
      </div>
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-28">
        {showAnnouncement && (
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-300 ring-1 ring-gray-400/20 hover:ring-gray-400/30">
              {announcementText}{' '}
              <Link href={announcementLink} className="font-semibold text-sky-300">
                <span aria-hidden="true" className="absolute inset-0" />
                {announcementLinkText} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}
        <div className={title === "You deserve to Bet with an Edge" ? "text-center" : "text-left sm:text-center"}>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            {beforeEdge}
            <span className="bg-gradient-to-r from-indigo-200 to-sky-400 bg-clip-text text-transparent">
              Edge
            </span>
            {afterEdge}
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">{description}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6 sm:justify-center">
            {primaryButtonText && (
              <Link
                href={primaryButtonLink}
                className="rounded-md bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 transition-colors"
              >
                {primaryButtonText}
              </Link>
            )}
            {secondaryButtonText && (
              <Link href={secondaryButtonLink} className="text-sm font-semibold text-white flex items-center">
                {secondaryButtonText === 'Follow on' ? (
                  <>
                    {secondaryButtonText}
                    <svg className="h-3.5 w-3.5 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                    </svg>
                  </>
                ) : (
                  <>
                    {secondaryButtonText} <span aria-hidden="true">→</span>
                  </>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}