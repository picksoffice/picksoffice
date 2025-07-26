import { notFound } from 'next/navigation';
import { StrapiResponse, Pick } from '@/types/strapi';
import { fetchAPI } from '@/lib/api';
import ContentTemplate from '@/components/common/ContentTemplate';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: { params: Promise<Props['params']> }) {
  const resolvedParams = await params; // Await params for TS fix
  const { slug } = resolvedParams;

  try {
    const response: StrapiResponse<Pick> = await fetchAPI(
      '/picks',
      {},
      `filters[Slug][$eq]=${encodeURIComponent(slug)}&publicationState=live`
    );

    console.log('Metadata API Response for slug:', slug, JSON.stringify(response, null, 2));

    if (!response.data || response.data.length === 0) {
      return {
        title: 'Pick Not Found',
        description: 'The requested pick could not be found.',
      };
    }

    const pick = response.data[0];
    const attributes = pick.attributes;

    return {
      title: attributes.Title,
      description: attributes.Summary,
      openGraph: {
        title: attributes.Title,
        description: attributes.Summary,
        url: `https://picksoffice.com/picks/${slug}`,
        type: 'article',
        publishedTime: attributes.publishedAt || attributes.Date || new Date().toISOString(),
        authors: [attributes.Author],
        images: [
          {
            url: attributes.Image?.data?.attributes?.url || '/images/default-og.jpg',
            width: 1200,
            height: 630,
            alt: attributes.Title,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error fetching metadata for slug:', slug, error);
    return {
      title: 'Error',
      description: 'An error occurred while fetching the pick.',
    };
  }
}

export default async function PickPage({ params }: { params: Promise<Props['params']> }) {
  const resolvedParams = await params; // Await params for TS fix
  const { slug } = resolvedParams;

  try {
    const response: StrapiResponse<Pick> = await fetchAPI(
      '/picks',
      {},
      `filters[Slug][$eq]=${encodeURIComponent(slug)}&publicationState=live`
    );

    if (!response.data || response.data.length === 0) {
      notFound();
    }

    const pick = response.data[0];

    return <ContentTemplate type="pick" attributes={pick.attributes} />;
  } catch (error) {
    console.error('Error fetching pick for slug:', slug, error);
    notFound();
  }
}
