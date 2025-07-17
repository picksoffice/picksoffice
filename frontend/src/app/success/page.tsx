import { Suspense } from 'react';
import SuccessPageContent from './SuccessPageContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}