'use client';

import React, { ReactNode } from 'react';

interface PageLayoutClientProps {
  children: ReactNode;
}

export default function PageLayoutClient({ children }: PageLayoutClientProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col">
      {/* Main hero section blob - similar to the Tailwind example */}
      <div className="relative flex-1 bg-gradient-to-r from-sky-900 to-indigo-900 opacity-20">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
