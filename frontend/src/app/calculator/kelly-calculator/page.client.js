'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

// Use dynamic import to avoid hydration mismatch
const KellyCalculatorClient = dynamic(() => import('./KellyCalculatorClient'), {
  ssr: false, // Disable server-side rendering
  loading: () => (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-700/50 rounded w-1/3 mb-6"></div>
        <div className="h-4 bg-slate-700/50 rounded w-2/3 mb-10"></div>
        <div className="h-[400px] bg-slate-800/30 rounded-2xl"></div>
      </div>
    </div>
  ),
});

export default function KellyCalculatorClientWrapper() {
  return (
    <ErrorBoundary>
      <KellyCalculatorClient />
    </ErrorBoundary>
  );
}