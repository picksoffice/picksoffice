'use client';

// src/app/page.tsx
import { useEffect, useState } from 'react';
import Hero from '@/components/common/Hero';
import StatsCardHome from '@/components/common/StatsCardHome';
import Model from '@/components/common/Model';
import Pricing from '@/components/common/Pricing';
import FollowOnX from '@/components/common/FollowOnX';
import Testimonials from '@/components/common/Testimonials';
import FAQ from '@/components/common/FAQ';
import BlogGrid from '@/components/common/BlogGrid';
import PageLayout from '@/components/layout/PageLayout';
import { getAllPicks, StrapiResponse, Pick } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

// Schnittstelle für BlogGrid-Posts
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
  awayTeam?: string; // Neu: Für das Auswärtsteam
  homeTeam?: string; // Neu: Für das Heimteam
  league?: string; // Neu: Für die Liga
}

// Hilfsfunktion, um die Zeichenlänge von Writeup zu berechnen
const getWriteupLength = (writeup: string | null | any): number => {
  if (!writeup) return 0;
  if (typeof writeup === 'string') return writeup.length;

  // Für Rich-Text-Blöcke (Array von Blöcken)
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

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Handle social login redirects by capturing JWT from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get('jwt');
    const userParam = urlParams.get('user');
    
    if (jwt && userParam) {
      try {
        // Store the JWT in localStorage
        localStorage.setItem('jwt', jwt);
        
        // Parse and store the user data
        const userData = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Clean up the URL by removing the JWT and user parameters
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        
        // Reload the page to update the auth state
        window.location.reload();
      } catch (error) {
        console.error('Error processing social login redirect:', error);
      }
    }
  }, []);
  
  // Add structured data for SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SportsOrganization',
      name: 'PicksOffice',
      url: 'https://picksoffice.com',
      logo: 'https://picksoffice.com/picksoffice-logo.svg',
      description: 'Expert sports betting picks and analysis',
      sameAs: [
        'https://twitter.com/picksoffice',
        'https://instagram.com/picksoffice',
        'https://facebook.com/picksoffice'
      ],
      potentialAction: {
        '@type': 'ViewAction',
        target: 'https://picksoffice.com/picks'
      }
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  // Load picks for the homepage
  useEffect(() => {
    // Load picks when component mounts
    async function loadPicks() {
      try {
        console.log('Fetching latest picks for homepage...');
        const response = await getAllPicks();
        const picks = response.data || [];

        // Get background image based on league
        const getBackgroundImage = (league: string | undefined) => {
          if (!league) return undefined;
          
          // Convert league to lowercase for case-insensitive matching
          const leagueLower = league.toLowerCase();
          
          // Map league to background image (from public directory)
          if (leagueLower === 'nba') return `/images/backgrounds/nba_background.png`;
          if (leagueLower === 'nfl') return `/images/backgrounds/nfl_background.png`;
          if (leagueLower === 'mlb') return `/images/backgrounds/mlb_background.png`;
          if (leagueLower === 'nhl') return `/images/backgrounds/nhl_background.png`;
          if (leagueLower === 'ncaab') return `/images/backgrounds/ncaab_background.png`;
          if (leagueLower === 'ncaaf') return `/images/backgrounds/ncaaf_background.png`;
          if (leagueLower === 'wnba') return `/images/backgrounds/wnba_background.png`;
          
          // Default background if league doesn't match
          return undefined;
        };

        console.log(`Found ${picks.length} picks, filtering for writeup...`);
        
        // Filter picks with Writeup >= 150 characters and take the most recent 3
        const filteredPosts = picks
          .filter((pick) => pick && pick.Slug && getWriteupLength(pick.Writeup) >= 150)
          .slice(0, 3) // Only the most recent 3 picks
          .map((pick) => ({
            id: pick.documentId || pick.id,
            title: pick.Home && pick.Away ? `${pick.Away} @ ${pick.Home}` : 'Untitled Match',
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
          }));
          
        console.log(`Filtered to ${filteredPosts.length} posts for homepage display`);
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching picks for home page:', error);
        setPosts([]);
      }
    }
    
    loadPicks();
  }, []);

  return (
    <PageLayout>
      <Hero 
        title="You deserve to Bet with an Edge"
        description="PicksOffice combines advanced statistical methodology with cutting-edge algorithmic modeling to deliver high-precision picks."
        primaryButtonText="View Picks"
        primaryButtonLink="/picks"
        secondaryButtonText="Follow on"
        secondaryButtonLink="#"
        showAnnouncement={true}
        announcementText="Free expert betting insights with in-depth analysis for every matchup."
        announcementLink="/picks"
        announcementLinkText="See Latest Picks"
      />
      <StatsCardHome />
      <BlogGrid 
        title="Latest Betting Insights"
        description="Expert predictions and detailed analysis updated daily"
        showViewAll={true}
        showFullGrid={false}
        posts={posts}
        viewAllLink="/picks"
      />
      <Model />
      {/* Pricing component hidden as all features are currently free */}
      {/* <Pricing /> */}
      <FollowOnX />
      <Testimonials />
      <FAQ />
    </PageLayout>
  );
}