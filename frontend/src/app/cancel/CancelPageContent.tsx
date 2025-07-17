'use client';

import { useState } from 'react';
import Link from 'next/link';
import { XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

export default function CancelPageContent() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRetryPayment = () => {
    setIsRedirecting(true);
    // Redirect back to Telegram bot
    window.location.href = 'https://t.me/PicksOfficePro_bot';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="flex justify-center mb-6">
            <XCircleIcon className="h-20 w-20 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Zahlung abgebrochen
          </h1>
          
          <p className="text-lg text-gray-300 mb-8">
            Versuchen Sie es erneut oder kontaktieren Sie den Support.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleRetryPayment}
              disabled={isRedirecting}
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRedirecting ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                  Weiterleitung...
                </>
              ) : (
                <>
                  <ArrowPathIcon className="w-5 h-5 mr-2" />
                  Zahlung erneut versuchen
                </>
              )}
            </button>

            <Link
              href="https://t.me/PicksOfficePro_bot"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              Support kontaktieren
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Probleme bei der Zahlung?
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Unser Support-Team hilft Ihnen gerne im Telegram Bot weiter.
          </p>
        </div>
      </div>
    </div>
  );
}