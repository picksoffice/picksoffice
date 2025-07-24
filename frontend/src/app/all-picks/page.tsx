import React from 'react';
import PicksTable from '@/components/common/PicksTable';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Completely disable caching
export const revalidate = 0; // Do not cache this page

async function getAllPicks() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
    const url = `${API_URL}/picks?sort=Date:desc&populate=*&pagination[pageSize]=20&pagination[page]=1`;

    console.log('Trying direct fetch to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('getAllPicks direct fetch response:', data);

    return data;
  } catch (error) {
    console.error('Error fetching picks:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 20, pageCount: 0, total: 0 } } };
  }
}

export default async function AllPicksPage() {
  const picksResponse = await getAllPicks();

  // Daten direkt verwenden, ohne Mapping
  const picks = picksResponse?.data || [];
  const pagination = picksResponse?.meta?.pagination || {
    page: 1,
    pageSize: 20,
    pageCount: 0,
    total: 0,
  };

  return (
    <div className="min-h-screen pb-20 relative isolate">
      {/* Main blob */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 -z-10 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1108/632] w-[40rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-15"
        />
      </div>

      {/* Secondary blob */}
      <div
        aria-hidden="true"
        className="absolute right-[20%] bottom-[20%] -z-10 transform-gpu blur-3xl"
      >
        <div className="aspect-[1/1] w-[30rem] rounded-full bg-gradient-to-r from-[#4f46e5] to-[#80caff] opacity-15" />
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Historical Picks Archive</h1>
          <p className="text-lg text-gray-400">
            Complete history of all past betting picks with results
          </p>
        </div>

        <div>
          {picks.length > 0 ? (
            <PicksTable picks={picks} pagination={pagination} />
          ) : (
            <p className="text-gray-300 p-4">Keine Picks gefunden.</p>
          )}
        </div>
      </div>
    </div>
  );
}
