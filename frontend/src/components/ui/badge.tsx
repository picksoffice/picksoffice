import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { TouchTarget } from './button'
import { Link } from './link'

const colors = {
  red: 'bg-red-500/15 text-red-700 group-data-hover:bg-red-500/25 bg-red-500/10 text-red-400 group-data-hover:bg-red-500/20',
  orange:
    'bg-orange-500/15 text-orange-700 group-data-hover:bg-orange-500/25 bg-orange-500/10 text-orange-400 group-data-hover:bg-orange-500/20',
  amber:
    'bg-amber-400/20 text-amber-700 group-data-hover:bg-amber-400/30 bg-amber-400/10 text-amber-400 group-data-hover:bg-amber-400/15',
  yellow:
    'bg-yellow-400/20 text-yellow-700 group-data-hover:bg-yellow-400/30 bg-yellow-400/10 text-yellow-300 group-data-hover:bg-yellow-400/15',
  lime: 'bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 bg-lime-400/10 text-lime-300 group-data-hover:bg-lime-400/15',
  green:
    'bg-green-500/15 text-green-700 group-data-hover:bg-green-500/25 bg-green-500/10 text-green-400 group-data-hover:bg-green-500/20',
  emerald:
    'bg-emerald-500/15 text-emerald-700 group-data-hover:bg-emerald-500/25 bg-emerald-500/10 text-emerald-400 group-data-hover:bg-emerald-500/20',
  teal: 'bg-teal-500/15 text-teal-700 group-data-hover:bg-teal-500/25 bg-teal-500/10 text-teal-300 group-data-hover:bg-teal-500/20',
  cyan: 'bg-cyan-400/20 text-cyan-700 group-data-hover:bg-cyan-400/30 bg-cyan-400/10 text-cyan-300 group-data-hover:bg-cyan-400/15',
  sky: 'bg-sky-300/15 text-sky-700 group-data-hover:bg-sky-300/25 bg-sky-300/10 text-sky-300 group-data-hover:bg-sky-300/20',
  blue: 'bg-blue-500/15 text-blue-700 group-data-hover:bg-blue-500/25 text-sky-300 group-data-hover:bg-blue-500/25',
  indigo:
    'bg-indigo-500/15 text-indigo-700 group-data-hover:bg-indigo-500/25 text-sky-300 group-data-hover:bg-indigo-500/20',
  violet:
    'bg-violet-500/15 text-violet-700 group-data-hover:bg-violet-500/25 text-violet-400 group-data-hover:bg-violet-500/20',
  purple:
    'bg-purple-500/15 text-purple-700 group-data-hover:bg-purple-500/25 text-purple-400 group-data-hover:bg-purple-500/20',
  fuchsia:
    'bg-fuchsia-400/15 text-fuchsia-700 group-data-hover:bg-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-400 group-data-hover:bg-fuchsia-400/20',
  pink: 'bg-pink-400/15 text-pink-700 group-data-hover:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-hover:bg-pink-400/20',
  rose: 'bg-rose-400/15 text-rose-700 group-data-hover:bg-rose-400/25 bg-rose-400/10 text-rose-400 group-data-hover:bg-rose-400/20',
  zinc: 'bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 bg-dark-bg/5 text-zinc-400 group-data-hover:bg-dark-bg/10',
}

type BadgeProps = { color?: keyof typeof colors }

export function Badge({ color = 'zinc', className, ...props }: BadgeProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
        colors[color]
      )}
    />
  )
}

export const BadgeButton = forwardRef(function BadgeButton(
  {
    color = 'zinc',
    className,
    children,
    ...props
  }: BadgeProps & { className?: string; children: React.ReactNode } & (
      | Omit<Headless.ButtonProps, 'as' | 'className'>
      | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
    ),
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    'group relative inline-flex rounded-md focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500'
  )

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Headless.Button>
  )
})
