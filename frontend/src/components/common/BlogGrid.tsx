// src/components/common/BlogGrid.tsx
import React from 'react';
import Link from 'next/link';
import { getTeamLogoUrl } from '@/lib/teamLogos';

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

export interface BlogGridProps {
  title?: string;
  description?: string;
  showViewAll?: boolean;
  showFullGrid?: boolean;
  posts?: Post[];
  viewAllLink?: string;
}

export default function BlogGrid({
  title = 'Latest Picks & Analysis',
  description = 'Expert predictions, betting tips, and game breakdowns',
  showViewAll = true,
  showFullGrid = true,
  posts = [],
  viewAllLink = '/picks',
}: BlogGridProps) {
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1505666287802-931dc83a0fe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80';

  const defaultAuthor = {
    name: 'Unknown Author',
    role: 'Analyst',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <div className="py-8 sm:py-12 relative isolate">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 -z-10 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1108/632] w-[25rem] sm:w-[35rem] md:w-[40rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-15"
        />
      </div>

      <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-2xl text-left sm:text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight sm:text-5xl mb-2">{title}</h1>
          <p className="text-base sm:text-lg text-gray-400">{description}</p>
        </div>

        {showFullGrid ? (
          <div className="grid grid-rows-1 sm:grid-rows-2 gap-y-8 sm:gap-y-16">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between group transition-all-300 hover:transform hover:translate-y-[-4px] hover:shadow-lg rounded-2xl"
                >
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <img
                      alt=""
                      src={post.imageUrl || defaultImageUrl}
                      className="aspect-video w-full h-48 sm:h-56 md:h-64 object-cover transition duration-300 group-hover:scale-105 bg-slate-800/60"
                      loading="lazy"
                    />
                    {post.league && post.awayTeam && getTeamLogoUrl(post.league, post.awayTeam) && (
                      <img
                        alt={`${post.awayTeam} logo`}
                        src={getTeamLogoUrl(post.league, post.awayTeam) || '/images/logos/default.png'}
                        className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 h-32 w-32 md:h-36 md:w-36 object-contain z-10 hover:scale-110 transition-transform"
                      />
                    )}
                    {post.league && post.homeTeam && getTeamLogoUrl(post.league, post.homeTeam) && (
                      <img
                        alt={`${post.homeTeam} logo`}
                        src={getTeamLogoUrl(post.league, post.homeTeam) || '/images/logos/default.png'}
                        className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 h-32 w-32 md:h-36 md:w-36 object-contain z-10 hover:scale-110 transition-transform"
                      />
                    )}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                  </div>

                  <div className="max-w-xl w-full h-full flex flex-col p-3">
                    <div className="mt-4 flex items-center gap-x-4 text-xs opacity-80 group-hover:opacity-100 transition-opacity-300">
                      <time dateTime={post.datetime} className="text-gray-400">
                        {post.date}
                      </time>
                      <span className="inline-flex items-center rounded-md bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-300 ring-1 ring-inset ring-sky-400/20">
                        {post.league || post.category.title}
                      </span>
                    </div>

                    <div className="relative">
                      <h3 className="mt-2 text-lg font-semibold group-hover:text-sky-300 transition-colors-300">
                        <Link href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors-300">
                        {post.description}
                      </p>
                    </div>

                    <div className="relative mt-4 flex items-center gap-x-4 opacity-90 group-hover:opacity-100 transition-opacity-300">
                      <img
                        alt=""
                        src={post.author.imageUrl}
                        className="h-10 w-10 rounded-full bg-gray-800 transition-transform-300 group-hover:scale-105"
                      />
                      <div className="text-sm">
                        <p className="font-semibold group-hover:text-sky-300 transition-colors-300">
                          <Link href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </Link>
                        </p>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors-300">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(3, 6).map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between group transition-all-300 hover:transform hover:translate-y-[-4px] hover:shadow-lg rounded-2xl"
                >
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <img
                      alt=""
                      src={post.imageUrl || defaultImageUrl}
                      className="aspect-video w-full h-48 sm:h-56 md:h-64 object-cover transition duration-300 group-hover:scale-105 bg-slate-800/60"
                      loading="lazy"
                    />
                    {post.league && post.awayTeam && getTeamLogoUrl(post.league, post.awayTeam) && (
                      <img
                        alt={`${post.awayTeam} logo`}
                        src={getTeamLogoUrl(post.league, post.awayTeam) || '/images/logos/default.png'}
                        className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 h-32 w-32 md:h-36 md:w-36 object-contain z-10 hover:scale-110 transition-transform"
                      />
                    )}
                    {post.league && post.homeTeam && getTeamLogoUrl(post.league, post.homeTeam) && (
                      <img
                        alt={`${post.homeTeam} logo`}
                        src={getTeamLogoUrl(post.league, post.homeTeam) || '/images/logos/default.png'}
                        className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 h-32 w-32 md:h-36 md:w-36 object-contain z-10 hover:scale-110 transition-transform"
                      />
                    )}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                  </div>

                  <div className="max-w-xl w-full h-full flex flex-col p-3">
                    <div className="mt-4 flex items-center gap-x-4 text-xs opacity-80 group-hover:opacity-100 transition-opacity-300">
                      <time dateTime={post.datetime} className="text-gray-400">
                        {post.date}
                      </time>
                      <span className="inline-flex items-center rounded-md bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-300 ring-1 ring-inset ring-sky-400/20">
                        {post.league || post.category.title}
                      </span>
                    </div>

                    <div className="relative">
                      <h3 className="mt-2 text-lg font-semibold group-hover:text-sky-300 transition-colors-300">
                        <Link href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors-300">
                        {post.description}
                      </p>
                    </div>

                    <div className="relative mt-4 flex items-center gap-x-4 opacity-90 group-hover:opacity-100 transition-opacity-300">
                      <img
                        alt=""
                        src={post.author.imageUrl}
                        className="h-10 w-10 rounded-full bg-gray-800 transition-transform-300 group-hover:scale-105"
                      />
                      <div className="text-sm">
                        <p className="font-semibold group-hover:text-sky-300 transition-colors-300">
                          <Link href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </Link>
                        </p>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors-300">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-8 md:gap-y-12 md:gap-x-6 lg:gap-x-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="flex flex-col items-start justify-between group transition-all-300 hover:transform hover:translate-y-[-4px] hover:shadow-lg rounded-2xl"
              >
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <img
                    alt=""
                    src={post.imageUrl || defaultImageUrl}
                    className="aspect-video w-full h-48 sm:h-56 object-cover transition duration-300 group-hover:scale-105 bg-slate-800/60"
                    loading="lazy"
                  />
                  {post.league && post.awayTeam && getTeamLogoUrl(post.league, post.awayTeam) && (
                    <img
                      alt={`${post.awayTeam} logo`}
                      src={getTeamLogoUrl(post.league, post.awayTeam) || '/images/logos/default.png'}
                      className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 h-14 md:h-36 w-14 md:w-36 object-contain z-10 hover:scale-110 transition-transform"
                    />
                  )}
                  {post.league && post.homeTeam && getTeamLogoUrl(post.league, post.homeTeam) && (
                    <img
                      alt={`${post.homeTeam} logo`}
                      src={getTeamLogoUrl(post.league, post.homeTeam) || '/images/logos/default.png'}
                      className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 h-14 md:h-36 w-14 md:w-36 object-contain z-10 hover:scale-110 transition-transform"
                    />
                  )}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                </div>

                <div className="max-w-xl w-full h-full flex flex-col p-3">
                  <div className="mt-4 flex items-center gap-x-4 text-xs opacity-80 group-hover:opacity-100 transition-opacity-300">
                    <time dateTime={post.datetime} className="text-gray-400">
                      {post.date}
                    </time>
                    <span className="inline-flex items-center rounded-full bg-sky-300/80 px-3 py-1 text-xs font-medium text-slate-950 backdrop-blur-sm">
                      {post.league || post.category.title}
                    </span>
                  </div>

                  <div className="relative">
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-sky-300 transition-colors-300 line-clamp-2">
                      <Link href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors-300">
                      {post.description}
                    </p>
                  </div>

                  <div className="relative mt-4 flex items-center gap-x-4 opacity-90 group-hover:opacity-100 transition-opacity-300">
                    <img
                      alt=""
                      src={post.author.imageUrl}
                      className="h-10 w-10 rounded-full bg-gray-800 transition-transform-300 group-hover:scale-105"
                    />
                    <div className="text-sm">
                      <p className="font-semibold group-hover:text-sky-300 transition-colors-300">
                        <Link href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </Link>
                      </p>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors-300">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}