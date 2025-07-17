import { Suspense } from 'react';
import SuccessPageContent from './SuccessPageContent';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
export const runtime = 'nodejs'; // Use Node.js runtime

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}