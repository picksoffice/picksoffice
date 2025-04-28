'use client';

import React from 'react';

export default function GradientBlobs() {
  return (
    <>
      {/* Main hero section blob - similar to the Tailwind example */}
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-40 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(20%)] xl:left-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        />
      </div>
      
      {/* Stats cards section blob - for middle section */}
      <div
        aria-hidden="true"
        className="absolute right-[10%] top-[35%] -z-10 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1108/632] w-[50rem] bg-gradient-to-r from-[#4f46e5] to-[#80caff] opacity-25"
        />
      </div>
      
      {/* Lower section large blob - for picks preview/testimonials */}
      <div
        aria-hidden="true"
        className="absolute left-[5%] top-[65%] -z-10 transform-gpu blur-2xl"
      >
        <svg width="700" height="700" viewBox="0 0 200 200" className="w-[35rem] h-[35rem]">
          <path 
            fill="url(#blob1-gradient)" 
            d="M37,-48.8C51.2,-55.7,68.5,-52.6,68.9,-42.8C69.4,-33,53,-16.5,43.9,-5.3C34.7,5.9,32.8,11.9,29.2,16.3C25.7,20.7,20.5,23.6,15.3,23.6C10.2,23.7,5.1,20.9,-3.7,27.3C-12.5,33.7,-25,49.3,-35.7,52.4C-46.4,55.6,-55.4,46.4,-63.5,35.6C-71.6,24.8,-78.9,12.4,-74.1,2.8C-69.3,-6.9,-52.5,-13.7,-40.7,-18.2C-29,-22.8,-22.3,-24.9,-16.4,-22.8C-10.4,-20.7,-5.2,-14.3,3.1,-19.6C11.3,-24.9,22.7,-41.9,37,-48.8Z" 
            transform="translate(100 100)" 
          />
          <defs>
            <linearGradient id="blob1-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#80caff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Bottom right corner blob */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 -z-10 transform-gpu blur-3xl"
      >
        <svg width="500" height="500" viewBox="0 0 200 200" className="w-[25rem] h-[25rem]">
          <path 
            fill="url(#blob2-gradient)" 
            d="M44.9,-76.1C59.5,-69.2,73.4,-59.1,81.3,-45.3C89.2,-31.6,91.2,-14.2,89.6,2.9C88,20,82.9,36.9,73.3,50.5C63.8,64.1,49.8,74.5,34.7,78.8C19.5,83.1,3.1,81.3,-11.8,76.3C-26.7,71.2,-40.2,62.9,-49.4,51.3C-58.7,39.8,-63.8,25,-69.9,9.3C-76,-6.4,-83.2,-23,-79.6,-36.3C-76.1,-49.5,-61.9,-59.5,-46.6,-66C-31.3,-72.4,-15.7,-75.5,0.1,-75.7C15.9,-75.9,30.3,-83.1,44.9,-76.1Z" 
            transform="translate(100 100)" 
          />
          <defs>
            <linearGradient id="blob2-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#80caff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Top left corner blob */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 -z-10 transform-gpu blur-2xl"
      >
        <div
          className="aspect-[1/1] w-[20rem] rounded-full bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-15"
        />
      </div>
      
      {/* Center/bottom accent - small subtle blob */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-3/4 -translate-x-1/2 -z-10 transform-gpu blur-2xl"
      >
        <div
          className="aspect-[2/1] w-[30rem] rounded-[50%] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-10"
        />
      </div>
    </>
  );
}