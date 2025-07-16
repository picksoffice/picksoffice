'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="flex justify-center mb-6">
            <CheckCircleIcon className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Success!
          </h1>
          
          <p className="text-lg text-gray-300 mb-6">
            Ihr Abonnement ist aktiviert. Kehren Sie zum Telegram-Bot zurück.
          </p>

          {sessionId && (
            <div className="mb-6 p-3 bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-400">Session ID:</p>
              <p className="text-xs text-gray-300 font-mono break-all">{sessionId}</p>
            </div>
          )}

          <div className="space-y-4">
            <Link
              href="https://t.me/PicksOfficePro_bot"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              Zurück zum Telegram Bot
            </Link>

            <p className="text-sm text-gray-500">
              Sie werden in {countdown} Sekunden automatisch weitergeleitet...
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          Bei Problemen kontaktieren Sie bitte unseren Support im Telegram Bot.
        </p>
      </div>
    </div>
  );
}