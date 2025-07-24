import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {
  'aria-label'?: string;
}

export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  className,
  ...props
}: PaginationProps) {
  return <nav aria-label={ariaLabel} className={cn('mx-auto w-full', className)} {...props} />;
}

export function PaginationContent({ className, ...props }: React.ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul className={cn('flex flex-wrap items-center justify-center gap-1', className)} {...props} />
  );
}

export function PaginationItem({ className, ...props }: React.ComponentPropsWithoutRef<'li'>) {
  return <li className={cn('', className)} {...props} />;
}

interface PaginationLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  isActive?: boolean;
}

export function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex h-9 min-w-9 items-center justify-center rounded-md border border-slate-700/30 px-3 py-2 text-sm transition-colors hover:bg-sky-600/10 hover:text-sky-300',
        {
          'bg-sky-600/20 text-sky-300 pointer-events-none': isActive,
          'text-slate-400': !isActive,
        },
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <span>Next</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('flex h-9 min-w-9 items-center justify-center text-slate-400', className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
      <span className="sr-only">More pages</span>
    </span>
  );
}
