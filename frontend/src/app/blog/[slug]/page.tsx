// src/app/blog/[slug]/page.tsx
import React from 'react';
import ContentTemplate from '@/components/common/ContentTemplate';
import { fetchAPI, StrapiResponse } from '@/lib/api';
import { notFound } from 'next/navigation';

interface Blog {
  id: number;
  documentId: string;
  Title?: string;
  Titel?: string;
  Slug: string;
  Content: string | null | any;
  Summary: string;
  Author: string;
  PublishedDate: string;
  Category: string;
  Image?: {
    id: number;
    url: string;
  };
}

interface Props {
  params: {
    slug: string;
  };
}

// Konvertiere Rich-Text-Content in String
const convertRichTextToString = (content: string | null | any): string => {
  if (!content) return '';
  if (typeof content === 'string') return content;

  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          return block.children
            .map((child: any) => (child.type === 'text' && child.text ? child.text : ''))
            .join('');
        }
        return '';
      })
      .join('\n');
  }

  return '';
};

export async function generateMetadata({ params }: Props) {
  try {
    const response = await fetchAPI<Blog>('/blogs', `filters[Slug][$eq]=${encodeURIComponent(params.slug)}&publicationState=live&populate=Image`);
    console.log('Blog Detail Metadata API Response:', JSON.stringify(response, null, 2));
    const blogData = response.data[0];

    if (!blogData) {
      return {};
    }

    return {
      title: blogData.Title || blogData.Titel || 'Blog Post',
      description: blogData.Summary || 'No summary available',
      openGraph: {
        title: blogData.Title || blogData.Titel || 'Blog Post',
        description: blogData.Summary || 'No summary available',
        url: `https://your-site.com/blog/${params.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = params;

  try {
    const response = await fetchAPI<Blog>('/blogs', `filters[Slug][$eq]=${encodeURIComponent(slug)}&publicationState=live&populate=Image`);
    console.log('Blog Detail API Response:', JSON.stringify(response, null, 2));
    const blogData = response.data[0];

    if (!blogData) {
      notFound();
    }

    // Konvertiere Content in String für BlogContent
    const contentAsString = convertRichTextToString(blogData.Content);

    return (
      <ContentTemplate
        type="blog"
        attributes={{
          title: blogData.Title || blogData.Titel || 'Untitled Post',
          date: blogData.PublishedDate,
          summary: blogData.Summary,
          content: contentAsString, // String statt Rich-Text-Array
          publishedAt: blogData.PublishedDate,
          tags: [blogData.Category || 'Unknown Category'],
          Author: blogData.Author || 'Unknown Author',
        }}
      />
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetchAPI<Blog>('/blogs', 'publicationState=live');
    const blogs = response.data || [];
    return blogs.map((blog) => ({
      slug: blog.Slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}