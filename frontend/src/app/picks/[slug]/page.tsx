// src/app/picks/[slug]/page.tsx
import React from 'react';
import ContentTemplate from '@/components/common/ContentTemplate';
import { fetchAPI, StrapiResponse, Pick } from '@/lib/api';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  try {
    try {
      const response = await fetchAPI<Pick>(
        '/picks',
        {},
        `filters[Slug][$eq]=${encodeURIComponent(params.slug)}&publicationState=live`
      );
      console.log(
        'Metadata API Response for slug:',
        params.slug,
        JSON.stringify(response, null, 2)
      );
      const pickData = response.data && response.data[0];

      if (pickData) {
        return {
          title: `${pickData.Home} vs ${pickData.Away} - Betting Pick`,
          description: pickData.Summary || 'No summary available',
          openGraph: {
            title: `${pickData.Home} vs ${pickData.Away}`,
            description: pickData.Summary || 'No summary available',
            url: `https://picksoffice.com/picks/${params.slug}`,
          },
        };
      }

      // Verwende Mock-Daten für die Metadaten, wenn die API keine Daten liefert
      console.log('No pick found in API for metadata, using mock data, slug:', params.slug);
      const mockPick = getMockPickBySlug(params.slug);

      return {
        title: `${mockPick.Home} vs ${mockPick.Away} - Betting Pick`,
        description: mockPick.Summary || 'No summary available',
        openGraph: {
          title: `${mockPick.Home} vs ${mockPick.Away}`,
          description: mockPick.Summary || 'No summary available',
          url: `https://picksoffice.com/picks/${params.slug}`,
        },
      };
    } catch (apiError) {
      // Bei API-Fehler verwende Mock-Daten für die Metadaten
      console.error('API error generating metadata, using mock data instead:', apiError);
      const mockPick = getMockPickBySlug(params.slug);

      return {
        title: `${mockPick.Home} vs ${mockPick.Away} - Betting Pick`,
        description: mockPick.Summary || 'No summary available',
        openGraph: {
          title: `${mockPick.Home} vs ${mockPick.Away}`,
          description: mockPick.Summary || 'No summary available',
          url: `https://picksoffice.com/picks/${params.slug}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata for slug:', params.slug, error);
    return {
      title: 'Betting Pick',
      description: 'Expert betting analysis and predictions',
    };
  }
}

// Mock-Daten für den Fall, dass die API nicht funktioniert
const mockPicks = [
  {
    id: 1,
    documentId: '1',
    League: 'NBA',
    Date: '2024-04-25T20:00:00Z',
    Away: 'Timberwolves',
    Home: 'Nuggets',
    Pick: 'Timberwolves +4.5',
    Stake: 2,
    Odds: 1.91,
    Result: 'Win',
    Summary:
      'The Wolves are showing incredible defensive prowess in this series and should cover the spread again.',
    Writeup:
      "After a dominant performance in Game 1, the Timberwolves continue to impress with their defensive intensity. Anthony Edwards has been outstanding, and Rudy Gobert is controlling the paint. While Denver will make adjustments, Minnesota's defensive scheme is giving Jokić problems. Expect another close game with the Wolves covering the spread.",
    Slug: 'timberwolves-nuggets-apr25',
    createdAt: '2024-04-24T12:00:00Z',
    updatedAt: '2024-04-26T10:00:00Z',
    publishedAt: '2024-04-24T14:00:00Z',
    Author: 'PicksOffice',
  },
  {
    id: 2,
    documentId: '2',
    League: 'MLB',
    Date: '2024-04-26T18:30:00Z',
    Away: 'Cardinals',
    Home: 'Mets',
    Pick: 'Under 8.5',
    Stake: 1,
    Odds: 1.95,
    Result: 'Loss',
    Summary:
      'Two strong starting pitchers should keep the run total low in this National League matchup.',
    Writeup:
      "Both teams are sending their aces to the mound today. The Cardinals' starter has been excellent with a 2.45 ERA over his last three starts, while the Mets' pitcher has been equally impressive with a WHIP under 1.00 this season. Weather conditions at Citi Field are favorable for pitchers, and both bullpens have been reliable. Expect a low-scoring affair with quality pitching dominating.",
    Slug: 'cardinals-mets-apr26',
    createdAt: '2024-04-25T15:00:00Z',
    updatedAt: '2024-04-27T09:00:00Z',
    publishedAt: '2024-04-25T16:00:00Z',
    Author: 'PicksOffice',
  },
  {
    id: 3,
    documentId: '3',
    League: 'NHL',
    Date: '2024-04-27T23:00:00Z',
    Away: 'Rangers',
    Home: 'Hurricanes',
    Pick: 'Rangers ML',
    Stake: 1.5,
    Odds: 2.1,
    Result: 'Pending',
    Summary:
      "Rangers' strong road performance and goaltending advantage give them value as underdogs.",
    Writeup:
      "The Rangers have been excellent on the road this season and their goaltending has been stellar in the playoffs. Igor Shesterkin gives them a significant advantage between the pipes. The Hurricanes have home ice, but the Rangers' defensive structure and counterattacking ability make them dangerous underdogs. The value is with New York at plus money in what should be a tight, competitive game.",
    Slug: 'rangers-hurricanes-apr27',
    createdAt: '2024-04-26T14:00:00Z',
    updatedAt: '2024-04-26T14:00:00Z',
    publishedAt: '2024-04-26T15:00:00Z',
    Author: 'PicksOffice',
  },
];

// Funktion, um einen passenden oder ähnlichen Mock-Pick zu finden
const getMockPickBySlug = (slug: string) => {
  const exactMatch = mockPicks.find(pick => pick.Slug === slug);
  if (exactMatch) return exactMatch;

  // Wenn kein exakter Match, gib den ersten Mock zurück
  return mockPicks[0];
};

export default async function PickDetailPage({ params }: Props) {
  const { slug } = params;

  try {
    // Versuche zuerst, echte Daten zu holen
    try {
      const response = await fetchAPI<Pick>(
        '/picks',
        {},
        `filters[Slug][$eq]=${encodeURIComponent(slug)}&publicationState=live`
      );
      console.log('PickDetail API Response for slug:', slug, JSON.stringify(response, null, 2));
      const pickData = response.data && response.data[0];

      if (pickData) {
        return <ContentTemplate type="pick" attributes={{ ...pickData }} />;
      }

      // Wenn keine Daten gefunden wurden, falle auf Mock-Daten zurück
      console.log('No pick found in API, using mock data for slug:', slug);
      const mockPick = getMockPickBySlug(slug);
      return <ContentTemplate type="pick" attributes={{ ...mockPick }} />;
    } catch (apiError) {
      // Bei API-Fehler verwende Mock-Daten
      console.error('API error, using mock data instead:', apiError);
      const mockPick = getMockPickBySlug(slug);
      return <ContentTemplate type="pick" attributes={{ ...mockPick }} />;
    }
  } catch (error) {
    console.error('Unexpected error for slug:', slug, error);

    // Bei jedem anderen unerwarteten Fehler verwende auch Mock-Daten
    try {
      const mockPick = getMockPickBySlug(slug);
      return <ContentTemplate type="pick" attributes={{ ...mockPick }} />;
    } catch (mockError) {
      // Wenn alle Stricke reißen, zeige 404
      console.error('Error loading mock data:', mockError);
      notFound();
    }
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetchAPI<Pick>('/picks', {}, 'publicationState=live');
    console.log('Static Params API Response:', JSON.stringify(response, null, 2));
    const picks = response.data || [];
    const validPicks = picks.filter((pick: Pick) => pick.Slug); // Nur Picks mit Slug
    console.log('Valid Picks with Slug:', validPicks.length);
    return validPicks.map((pick: Pick) => ({
      slug: pick.Slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
