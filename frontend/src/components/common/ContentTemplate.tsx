// src/components/common/ContentTemplate.tsx
"use client";

import React, { useState } from 'react';
import { formatDate, getResultClass, stakeToStars, formatAmericanOdds, formatOdds } from '@/lib/utils';
import sanitizeHtml from 'sanitize-html';
import { Button } from '@/components/ui/button';
import { Bet105Button } from '@/components/ui/bet105button';
import { ResultBadge } from '@/components/ui/result-badge';
import { getTeamLogoUrl } from '@/lib/teamLogos';

interface ContentAttributes {
  title?: string;
  date?: string;
  Date?: string;
  summary?: string;
  Summary?: string; // Added for compatibility with API
  content?: string;
  publishedAt?: string;
  tags?: string[];
  Away?: string;
  Home?: string;
  League?: string;
  Pick?: string;
  Odds?: number;
  Stake?: number;
  Result?: string;
  Writeup?: string | null | any;
  Author?: string;
  Slug?: string; // Added for URL generation
}

interface ContentTemplateProps {
  type: 'blog' | 'pick';
  attributes: ContentAttributes;
}

function convertRichTextToHtml(writeup: any): string {
  if (!writeup) return '';
  if (typeof writeup === 'string') return writeup;

  if (Array.isArray(writeup)) {
    return writeup
      .map((block: any) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          const text = block.children
            .map((child: any) => (child.type === 'text' && child.text ? child.text : ''))
            .join('');
          return text ? `<p>${text}</p>` : '';
        }
        return '';
      })
      .join('')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br />');
  }

  try {
    return JSON.stringify(writeup);
  } catch (e) {
    console.error('Error stringifying Writeup:', e);
    return '';
  }
}

export default function ContentTemplate({ type, attributes }: ContentTemplateProps) {
  console.log('ContentTemplate Attributes:', JSON.stringify(attributes, null, 2));

  return (
    <div className="bg-transparent min-h-screen py-6 sm:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-12">
          <div className="lg:w-2/3">
            {type === 'blog' ? (
              <BlogContent attributes={attributes} />
            ) : (
              <PickContent attributes={attributes} />
            )}
          </div>
          <div className="lg:w-1/3 relative">
            <div className="sticky top-24">
              <Sidebar type={type} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogContent({ attributes }: { attributes: ContentAttributes }) {
  return (
    <article>
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl">
        <img 
          src="https://placehold.co/1200x600/e2e8f0/1e293b?text=Blog+Header+Image" 
          alt="Blog Header" 
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {attributes.tags?.map((tag, index) => (
                <span key={index} className="inline-flex items-center rounded-md bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-300 ring-1 ring-inset ring-sky-400/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              {attributes.title}
            </h1>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-4">
          {attributes.Author && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-sky-300 flex items-center justify-center mr-2">
                <span className="text-slate-950 font-medium text-sm">
                  {attributes.Author.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{attributes.Author}</span>
            </div>
          )}
          <span className="text-sm">
            {formatDate(attributes.date || attributes.publishedAt || '')}
          </span>
        </div>

        <div>
          <a 
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(`${attributes.title || 'New blog post'}\n\n${attributes.summary || attributes.Summary || ''}\n\n`)}&url=${encodeURIComponent(`https://picksoffice.com/blog/${attributes.Slug || ''}`)}&via=picksoffice`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-sky-300 transition-colors"
          >
            <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
            </svg>
            <span className="text-sm">Share</span>
          </a>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none dark:prose-invert mb-16">
        {attributes.summary && (
          <div className="bg-slate-800/75 dark:bg-slate-800/75 border-l-4 border-sky-300 p-4 rounded-r-lg mb-8">
            <p className="text-lg text-gray-100 dark:text-gray-200 italic m-0">
              {attributes.summary}
            </p>
          </div>
        )}
        
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(attributes.content || '') }} />
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-10">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Read More
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <a href="#" className="group transition-all">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-5">
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Previous Article</span>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-sky-300 dark:group-hover:text-sky-300 transition">
                  Previous article title
                </p>
              </div>
            </div>
          </a>
          <a href="#" className="group transition-all">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-5">
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Next Article</span>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-sky-300 dark:group-hover:text-sky-300 transition">
                  Next article title
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </article>
  );
}

function PickContent({ attributes }: { attributes: ContentAttributes }) {
  console.log('PickContent Writeup:', attributes.Writeup, 'Type:', typeof attributes.Writeup);

  const safeDate = attributes.Date && !isNaN(new Date(attributes.Date).getTime())
    ? attributes.Date
    : attributes.publishedAt || '';

  const safeWriteup = convertRichTextToHtml(attributes.Writeup);

  const getBackgroundImage = (league: string | undefined) => {
    if (!league) return "https://placehold.co/1200x600/e2e8f0/1e293b?text=Game+Preview";
    
    const leagueLower = league.toLowerCase();
    
    if (leagueLower === 'nba') return `/images/backgrounds/nba_background.png`;
    if (leagueLower === 'nfl') return `/images/backgrounds/nfl_background.png`;
    if (leagueLower === 'mlb') return `/images/backgrounds/mlb_background.png`;
    if (leagueLower === 'nhl') return `/images/backgrounds/nhl_background.png`;
    if (leagueLower === 'ncaab') return `/images/backgrounds/ncaab_background.png`;
    if (leagueLower === 'ncaaf') return `/images/backgrounds/ncaaf_background.png`;
    if (leagueLower === 'wnba') return `/images/backgrounds/wnba_background.png`;
    
    return "https://placehold.co/1200x600/e2e8f0/1e293b?text=Game+Preview";
  };

  return (
    <article>
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl">
        <img 
          src={getBackgroundImage(attributes.League)} 
          alt={`${attributes.League} Game Preview`}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover bg-slate-800/60"
          loading="lazy"
        />
        {attributes.League && attributes.Away && getTeamLogoUrl(attributes.League, attributes.Away) && (
          <img
            alt={`${attributes.Away} logo`}
            src={getTeamLogoUrl(attributes.League, attributes.Away) || '/images/logos/default.png'}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 h-40 w-40 md:h-80 md:w-80 object-contain z-5 opacity-30 hover:opacity-60 transition-opacity"
          />
        )}
        {attributes.League && attributes.Home && getTeamLogoUrl(attributes.League, attributes.Home) && (
          <img
            alt={`${attributes.Home} logo`}
            src={getTeamLogoUrl(attributes.League, attributes.Home) || '/images/logos/default.png'}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 h-40 w-40 md:h-80 md:w-80 object-contain z-5 opacity-30 hover:opacity-60 transition-opacity"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 md:p-8 relative z-20">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center rounded-md bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-300 ring-1 ring-inset ring-sky-400/20">
                {attributes.League}
              </span>
              {attributes.Result && (
                <span className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium ring-1 ring-inset
                  ${attributes.Result === 'Win' 
                    ? 'bg-green-500/10 text-green-400 ring-green-500/20' 
                    : attributes.Result === 'Loss' 
                    ? 'bg-red-500/10 text-red-400 ring-red-500/20' 
                    : attributes.Result === 'Push'
                    ? 'bg-sky-300/10 text-sky-300 ring-sky-400/20'
                    : 'bg-gray-500/10 text-gray-400 ring-gray-500/20'}`}>
                  {attributes.Result}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              {attributes.Away} @ {attributes.Home}
            </h1>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-6">
          {attributes.Author && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-sky-300 flex items-center justify-center mr-2">
                <span className="text-slate-950 font-medium text-sm">
                  {attributes.Author.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{attributes.Author}</span>
            </div>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {safeDate ? formatDate(safeDate) : 'Date not available'}
          </span>
        </div>
        
        <div>
          <a 
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(`${attributes.Away} @ ${attributes.Home} - ${attributes.Pick} ${attributes.Odds ? formatAmericanOdds(attributes.Odds) : ''}\n\n${attributes.summary || attributes.Summary || ''}\n\n`)}&url=${encodeURIComponent(`https://picksoffice.com/picks/${attributes.Slug || ''}`)}&via=picksoffice`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-sky-300 transition-colors"
          >
            <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
            </svg>
            <span className="text-sm">Share</span>
          </a>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none dark:prose-invert mb-16">
        {attributes.summary && (
          <div className="bg-slate-800/75 dark:bg-slate-800/75 border-l-4 border-sky-300 p-4 rounded-r-lg mb-8">
            <p className="text-lg text-gray-100 dark:text-gray-200 italic m-0">
              {attributes.summary}
            </p>
          </div>
        )}
        
        {(attributes.content || safeWriteup) && (
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(safeWriteup) }} />
        )}
        
        {attributes.Pick && attributes.Odds && attributes.Stake && (
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-stretch gap-3">
            <div className="bg-slate-800/60 px-5 py-[19px] rounded-lg border border-slate-700/50 flex items-center h-[58px] w-full sm:w-auto">
              <span className="text-base font-medium text-white whitespace-nowrap">
                Pick: {attributes.Pick} {formatAmericanOdds(attributes.Odds)} | {attributes.Stake}u
              </span>
            </div>
            <Bet105Button 
              href="https://bet105.com/picksoffice" 
              className="w-full sm:w-auto" 
              aria-label="Bet at Bet105" 
            />
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-10">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          More Picks
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <a href="#" className="group transition-all">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-5">
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Previous Pick</span>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-sky-300 dark:group-hover:text-sky-300 transition">
                  Team X vs Team Y
                </p>
              </div>
            </div>
          </a>
          <a href="#" className="group transition-all">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-5">
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Next Pick</span>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-sky-300 dark:group-hover:text-sky-300 transition">
                  Team A vs Team B
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </article>
  );
}

function Sidebar({ type }: { type: 'blog' | 'pick' }) {
  return (
    <aside className="space-y-8">
      <div className="rounded-xl shadow-md overflow-hidden">
        <a 
          href="https://bet105.com/picksoffice" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <div 
            style={{
              backgroundImage: "url('/images/bet105_300x250.gif')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#000", 
              width: "100%",
              height: "250px"
            }}
            aria-label="Bet105 Advertisement"
          />
        </a>
      </div>

      <div className="mb-8">
        <a 
          href="https://bet105.com/picksoffice" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full h-full mb-6"
        >
          <img 
            src="/images/bet105300x300.gif" 
            alt="Bet105 Promotion" 
            className="w-full rounded-lg shadow-lg"
          />
        </a>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-3 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white dark:bg-gray-800 dark:text-white"
          />
          <Button
            variant="ghost"
            color="blue"
            className="absolute right-1 top-1.5 p-1.5 h-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>
        </div>
      </div>

      {type === 'blog' ? <BlogSidebar /> : <PickSidebar />}
    </aside>
  );
}

function BlogSidebar() {
  return (
    <>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {['Analysis', 'Strategy', 'Sports Betting', 'Form', 'Player Comparisons'].map((category, index) => (
            <Button 
              key={index} 
              href="#" 
              variant="ghost"
              color="blue"
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Popular Articles</h3>
        <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-800">
          {[1, 2, 3].map((item) => (
            <a key={item} href="#" className="group block pt-4 first:pt-0">
              <div className="flex">
                <div className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-sky-300 dark:group-hover:text-sky-300 transition-colors line-clamp-2">
                    Popular article with a longer title {item}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">April 12, 2025</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

interface PickItem {
  id: string;
  bet: string;
  teams: string;
  result: string;
  sport: string;
  date: string;
  odds: number;
  profit: number;
  slug: string;
}

function PickSidebar() {
  const [recentPicks, setRecentPicks] = useState<PickItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function fetchRecentPicks() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/picks?sort=Date:desc&populate=*&pagination[pageSize]=3&pagination[page]=1');
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
          const formattedPicks = data.data.map((pick: any) => ({
            id: pick.id.toString(),
            bet: pick.Pick,
            teams: `${pick.Away} @ ${pick.Home}`,
            result: pick.Result,
            sport: pick.League,
            date: new Date(pick.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            odds: pick.Odds,
            profit: calculateProfit(pick),
            slug: pick.Slug
          }));
          
          setRecentPicks(formattedPicks);
        }
      } catch (error) {
        console.error('Error fetching recent picks:', error);
        setRecentPicks([
          { 
            id: '1', 
            bet: 'Timberwolves -4.5', 
            teams: 'Timberwolves @ Nuggets', 
            result: 'Win', 
            sport: 'NBA', 
            date: 'Apr 22, 2024', 
            odds: 1.91, 
            profit: 0.91, 
            slug: 'timberwolves-nuggets-apr22' 
          },
          { 
            id: '2', 
            bet: 'Knicks ML', 
            teams: 'Knicks @ 76ers', 
            result: 'Loss', 
            sport: 'NBA', 
            date: 'Apr 20, 2024', 
            odds: 2.10, 
            profit: -1, 
            slug: 'knicks-76ers-apr20' 
          },
          { 
            id: '3', 
            bet: 'Pacers +3.5', 
            teams: 'Pacers @ Bucks', 
            result: 'Push', 
            sport: 'NBA', 
            date: 'Apr 18, 2024', 
            odds: 1.95, 
            profit: 0, 
            slug: 'pacers-bucks-apr18' 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentPicks();
  }, []);

  interface ApiPickItem {
    id: any;
    Result?: string;
    Odds?: number;
    Stake?: number;
  }

  function calculateProfit(pick: ApiPickItem): number {
    if (!pick || !pick.Result || !pick.Odds || !pick.Stake) return 0;
    
    if (pick.Result === 'Win') {
      return pick.Stake * (pick.Odds - 1);
    } else if (pick.Result === 'Loss') {
      return -pick.Stake;
    } else if (pick.Result === 'Push') {
      return 0;
    } else {
      return 0;
    }
  }

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals);
  };

  const formatAmericanOdds = (decimalOdds: number): string => {
    if (!decimalOdds || isNaN(decimalOdds)) return '+100';
    
    if (decimalOdds >= 2) {
      const americanOdds = (decimalOdds - 1) * 100;
      return `+${Math.round(americanOdds)}`;
    } else {
      const americanOdds = -100 / (decimalOdds - 1);
      return `${Math.round(americanOdds)}`;
    }
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sports</h3>
        <div className="flex flex-wrap gap-2">
          {['NFL', 'NBA', 'MLB', 'NHL', 'NCAA'].map((sport, index) => (
            <Button 
              key={index} 
              href="#" 
              variant="ghost"
              color="blue"
              size="sm"
              className="rounded-full"
            >
              {sport}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm shadow-lg border border-white/10 ring-1 ring-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Recent Picks</h3>
          <Button 
            href="/picks" 
            variant="tertiary" 
            color="blue" 
            size="sm"
            className="inline-flex items-center text-sky-300 hover:text-indigo-300"
          >
            View All
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Button>
        </div>
        
        <div className="overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-pulse text-sky-300">Loading picks...</div>
            </div>
          ) : recentPicks.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-700">
              <tbody className="divide-y divide-gray-800">
                {recentPicks.map((pick) => (
                  <tr key={pick.id} className="hover:bg-slate-800/20">
                    <td className="py-3 pl-1 pr-3">
                      <a href={`/picks/${pick.slug}`}>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <p className="font-medium">{pick.bet}</p>
                            <p className="text-xs text-gray-400">{formatAmericanOdds(pick.odds)}</p>
                          </div>
                          <p className="text-xs text-gray-400">{pick.sport} - {pick.date}</p>
                        </div>
                      </a>
                    </td>
                    <td className="py-3 pl-3 pr-1 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <span className={`text-sm font-medium ${
                          pick.profit > 0 ? 'text-emerald-400' : 
                          pick.profit < 0 ? 'text-red-400' : 
                          'text-gray-400'
                        }`}>
                          {pick.result === 'Pending' ? '' : 
                            (pick.profit > 0 ? '+' : '') + `${formatNumber(pick.profit)}u`}
                        </span>
                        <ResultBadge result={pick.result} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-400">
              No picks available
            </div>
          )}
        </div>
      </div>
    </>
  );
}