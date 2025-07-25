'use client';

import clsx from 'clsx';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { Link } from './link';

const TableContext = createContext<{
  bleed: boolean;
  dense: boolean;
  grid: boolean;
  striped: boolean;
}>({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
});

export function Table({
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  className,
  children,
  ...props
}: {
  bleed?: boolean;
  dense?: boolean;
  grid?: boolean;
  striped?: boolean;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <TableContext.Provider
      value={{ bleed, dense, grid, striped } as React.ContextType<typeof TableContext>}
    >
      <div className="flow-root">
        <div
          {...props}
          className={clsx(className, '-mx-(--gutter) overflow-x-auto whitespace-nowrap')}
        >
          <div
            className={clsx('inline-block min-w-full align-middle', !bleed && 'sm:px-(--gutter)')}
          >
            <table className="min-w-full text-left text-sm/6 text-white">{children}</table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}

export function TableHead({ className, ...props }: React.ComponentPropsWithoutRef<'thead'>) {
  return <thead {...props} className={clsx(className, 'text-zinc-400')} />;
}

export function TableBody(props: React.ComponentPropsWithoutRef<'tbody'>) {
  return <tbody {...props} />;
}

const TableRowContext = createContext<{ href?: string; target?: string; title?: string }>({
  href: undefined,
  target: undefined,
  title: undefined,
});

export function TableRow({
  href,
  target,
  title,
  className,
  ...props
}: { href?: string; target?: string; title?: string } & React.ComponentPropsWithoutRef<'tr'>) {
  let { striped } = useContext(TableContext);

  return (
    <TableRowContext.Provider
      value={{ href, target, title } as React.ContextType<typeof TableRowContext>}
    >
      <tr
        {...props}
        className={clsx(
          className,
          href &&
            'has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 focus-within:bg-dark-bg/[2.5%]',
          striped && 'even:bg-dark-bg/[2.5%]',
          href && striped && 'hover:bg-dark-bg/5',
          href && !striped && 'hover:bg-dark-bg/[2.5%]'
        )}
      />
    </TableRowContext.Provider>
  );
}

export function TableHeader({ className, ...props }: React.ComponentPropsWithoutRef<'th'>) {
  let { bleed, grid } = useContext(TableContext);

  return (
    <th
      {...props}
      className={clsx(
        className,
        'border-b border-b-white/10 px-4 py-2 font-medium first:pl-8 last:pr-8',
        grid && 'border-l border-l-white/5 first:border-l-0',
        !bleed && 'sm:first:pl-1 sm:last:pr-1'
      )}
    />
  );
}

export function TableCell({ className, children, ...props }: React.ComponentPropsWithoutRef<'td'>) {
  let { bleed, dense, grid, striped } = useContext(TableContext);
  let { href, target, title } = useContext(TableRowContext);
  let [cellRef, setCellRef] = useState<HTMLElement | null>(null);

  return (
    <td
      ref={href ? setCellRef : undefined}
      {...props}
      className={clsx(
        className,
        'relative px-4 first:pl-8 last:pr-8',
        !striped && 'border-b border-white/5',
        grid && 'border-l border-l-white/5 first:border-l-0',
        dense ? 'py-2.5' : 'py-4',
        !bleed && 'sm:first:pl-1 sm:last:pr-1'
      )}
    >
      {href && (
        <Link
          data-row-link
          href={href}
          target={target}
          aria-label={title}
          tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
          className="absolute inset-0 focus:outline-hidden"
        />
      )}
      {children}
    </td>
  );
}
