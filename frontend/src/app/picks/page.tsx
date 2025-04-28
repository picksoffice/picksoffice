// src/app/picks/page.tsx
import React from 'react';
import BlogGrid from '@/components/common/BlogGrid';
import { getAllPicks, StrapiResponse, Pick } from '@/lib/api';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Post {
  id: number | string;
  title: string;
  href: string;
  description: string;
  imageUrl?: string;
  date: string;
  datetime: string;
  category: { title: string; href: string };
  author: { name: string; role: string; href: string; imageUrl: string };
  awayTeam?: string;
  homeTeam?: string;
  league?: string;
}

const getWriteupLength = (writeup: string | null | any): number => {
  if (!writeup) return 0;
  if (typeof writeup === 'string') return writeup.length;

  if (Array.isArray(writeup)) {
    return writeup
      .map((block: any) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          return block.children
            .map((child: any) => (child.type === 'text' && child.text ? child.text : ''))
            .join('');
        }
        return '';
      })
      .join('')
      .length;
  }

  return 0;
};

export const metadata = {
  title: 'Latest Picks & Analysis',
  description: 'Expert predictions, betting tips, and game breakdowns',
  openGraph: {
    title: 'Latest Picks & Analysis',
    description: 'Expert predictions, betting tips, and game breakdowns',
    url: 'https://your-site.com/picks',
  },
};

const createPaginationUrl = (page: number) => {
  return `/picks?page=${page}`;
};

export default async function PicksPage({ searchParams }: { searchParams: { page?: string, league?: string } }) {
  let posts: Post[] = [];
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 9;

  try {
    console.log("Fetching picks data...");
    const response = await getAllPicks();
    console.log(`Received picks data: ${response.data ? response.data.length : 0} items`);
    const picks = response.data || [];

    const validPicks = picks.filter((pick) => {
      const contentLength = getWriteupLength(pick.Writeup);
      return contentLength >= 150 && pick.Slug;
    });

    const totalItems = validPicks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPicks = validPicks.slice(startIndex, endIndex);

    posts = paginatedPicks.map((pick) => {
      const getBackgroundImage = (league: string | undefined) => {
        if (!league) return undefined;

        const leagueLower = league.toLowerCase();

        if (leagueLower === 'nba') return `/images/backgrounds/nba_background.png`;
        if (leagueLower === 'nfl') return `/images/backgrounds/nfl_background.png`;
        if (leagueLower === 'mlb') return `/images/backgrounds/mlb_background.png`;
        if (leagueLower === 'nhl') return `/images/backgrounds/nhl_background.png`;
        if (leagueLower === 'ncaab') return `/images/backgrounds/ncaab_background.png`;
        if (leagueLower === 'ncaaf') return `/images/backgrounds/ncaaf_background.png`;
        if (leagueLower === 'wnba') return `/images/backgrounds/wnba_background.png`;

        return undefined;
      };

      return {
        id: pick.Slug,
        title: pick.Home && pick.Away ? `${pick.Home} vs ${pick.Away}` : 'Untitled Match',
        href: `/picks/${pick.Slug}`,
        description: pick.Summary || 'No summary available',
        imageUrl: getBackgroundImage(pick.League),
        date: new Date(pick.Date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        datetime: pick.Date || new Date().toISOString(),
        category: {
          title: pick.League || 'Unknown League',
          href: `#${(pick.League || 'unknown').toLowerCase()}`,
        },
        author: {
          name: pick.Author || 'Unknown Author',
          role: 'Analyst',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        awayTeam: pick.Away,
        homeTeam: pick.Home,
        league: pick.League,
      };
    });

    // Filter by league if specified in the query params
    const league = searchParams.league?.toUpperCase();
    const filteredPosts = league ? posts.filter(post => post.league?.toUpperCase() === league) : posts;

    return (
      <div className="space-y-12">
        <BlogGrid
          title="Latest Picks & Analysis"
          description="Expert predictions, betting tips, and game breakdowns"
          showViewAll={true}
          showFullGrid={true}
          posts={filteredPosts}
          viewAllLink="/all-picks"
        />

        {totalPages > 1 && (
          <Pagination className="py-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={currentPage > 1 ? createPaginationUrl(currentPage - 1) : undefined}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href={createPaginationUrl(1)} isActive={currentPage === 1}>
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink href={createPaginationUrl(currentPage - 1)}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage !== 1 && currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink href={createPaginationUrl(currentPage)} isActive>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink href={createPaginationUrl(currentPage + 1)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href={createPaginationUrl(totalPages)}
                    isActive={currentPage === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href={currentPage < totalPages ? createPaginationUrl(currentPage + 1) : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching picks:', error);
    // Using mock data to ensure the page always displays something useful
    const mockPosts: Post[] = [
      {
        id: 1,
        title: 'NBA Picks - Timberwolves vs Nuggets',
        href: '#',
        description: 'The Wolves are showing incredible defensive prowess in this series and should cover the spread again.',
        imageUrl: '/images/backgrounds/nba_background.png',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        datetime: new Date().toISOString(),
        category: { title: 'NBA', href: '#nba' },
        author: {
          name: 'PicksOffice',
          role: 'Analyst',
          href: '#',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        league: 'NBA'
      }
    ];
    
    return (
      <div className="space-y-12">
        <div className="rounded-md bg-yellow-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">API Connection Issue</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Unable to connect to the picks database. This could happen if the backend server is not running.
                  Showing sample content instead.
                </p>
              </div>
            </div>
          </div>
        </div>
        <BlogGrid
          title="Latest Picks & Analysis"
          description="Expert predictions, betting tips, and game breakdowns"
          showViewAll={false}
          showFullGrid={true}
          posts={mockPosts}
          viewAllLink="/all-picks"
        />
      </div>
    );
  }
}