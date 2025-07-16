'use client'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
import { ActionNetworkButton } from '@/components/ui/action-network-button'
import Image from 'next/image'

export default function FollowOnX() {
  return (
    <div className="bg-transparen">

      <div className="relative pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex mb-4">
              <span className="font-semibold text-sky-300 text-lg">Join the Community</span>
            </div>
            <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">
              Stay Connected with Daily Insights
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
              Follow me on social media for free picks, betting analysis, and insights that won't be published anywhere else. Join a community of serious sports bettors focused on long-term profitability through data-driven approaches.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 transition-colors flex items-center"
              >
                Follow on
                <svg className="h-4 w-4 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </a>
              <ActionNetworkButton 
                href="https://www.actionnetwork.com" 
                isExternal={true}
              />
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow relative">
            <div className="flex justify-center items-center mx-auto">
              <div className="relative w-full max-w-[366px] max-h-[729px]">
                {/* Soft gradient background blob */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[105%] rounded-full opacity-30 blur-2xl z-0" 
                  style={{
                    background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(79,70,229,0.1) 45%, rgba(15,23,42,0) 70%)'
                  }}
                  aria-hidden="true"
                ></div>
                
                {/* Mobile specific additional glow - visible only on small screens */}
                <div 
                  className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[50%] rounded-full opacity-20 blur-xl z-0 sm:hidden" 
                  style={{
                    background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(79,70,229,0.1) 60%, rgba(15,23,42,0) 75%)'
                  }}
                  aria-hidden="true"
                ></div>
                
                {/* Desktop enhancer - visible only on larger screens */}
                <div 
                  className="absolute left-1/2 bottom-[15%] -translate-x-1/2 w-[80%] h-[40%] rounded-full opacity-15 blur-xl z-0 hidden md:block" 
                  style={{
                    background: 'radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, rgba(79,70,229,0.05) 50%, rgba(15,23,42,0) 70%)'
                  }}
                  aria-hidden="true"
                ></div>
                
                {/* The iPhone mockup image */}
                <div className="relative z-10">
                  <Image 
                    src="/images/mockup/picksoffice-iphone-app-mockup.webp" 
                    alt="PicksOffice mobile app on iPhone showing sports betting dashboard" 
                    className="mx-auto drop-shadow-xl object-contain relative z-10"
                    width={366}
                    height={729}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 366px"
                    priority={true}
                    quality={95}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
