// src/app/blog/page.tsx
import React from 'react';
import BlogGrid from '../../components/common/BlogGrid';
import { fetchAPI, StrapiResponse } from '../../lib/api';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';

// …restlicher Code bleibt unverändert…

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
}

const getContentLength = (content: string | null | any): number => {
  if (!content) return 0;
  if (typeof content === 'string') return content.length;

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
      .join('').length;
  }

  return 0;
};

export const metadata = {
  title: 'Latest Blog Posts',
  description: 'Insights, strategies, and news about sports betting',
  openGraph: {
    title: 'Latest Blog Posts',
    description: 'Insights, strategies, and news about sports betting',
    url: 'https://your-site.com/blog',
  },
};

const createPaginationUrl = (page: number) => {
  return `/blog?page=${page}`;
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  let posts: Post[] = [];
  const itemsPerPage = 9;

  try {
    const query =
      'publicationState=live&sort=PublishedDate:desc&pagination[pageSize]=1000&populate=Image';
    const response = await fetchAPI<Blog>('/blogs', {}, query, true); // Set skipAuth to true
    const blogs = response.data || [];

    const totalItems = blogs.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);

    posts = paginatedBlogs.map((blog: Blog) => ({
      id: blog.Slug,
      title: blog.Title || blog.Titel || 'Untitled Post',
      href: `/blog/${blog.Slug}`,
      description: blog.Summary || 'No summary available',
      imageUrl: blog.Image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.Image.url}`
        : undefined,
      date: new Date(blog.PublishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      datetime: blog.PublishedDate || new Date().toISOString(),
      category: {
        title: blog.Category || 'Unknown Category',
        href: `#${(blog.Category || 'unknown').toLowerCase()}`,
      },
      author: {
        name: blog.Author || 'Unknown Author',
        role: 'Analyst',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    }));

    return (
      <div className="space-y-12">
        <BlogGrid
          title="Latest Blog Posts"
          description="Insights, strategies, and news about sports betting"
          showViewAll={false}
          showFullGrid={true}
          posts={posts}
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
    console.error('Error fetching blogs:', error);
    return (
      <div className="space-y-12">
        <BlogGrid
          title="Latest Blog Posts"
          description="Insights, strategies, and news about sports betting"
          showViewAll={false}
          showFullGrid={true}
          posts={[]}
        />
      </div>
    );
  }
}