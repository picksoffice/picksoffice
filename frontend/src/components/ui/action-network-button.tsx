'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const actionNetworkButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#00c358] text-white hover:bg-[#00b34e] focus-visible:outline-[#00c358]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ActionNetworkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionNetworkButtonVariants> {
  href?: string
  isExternal?: boolean
}

const ActionNetworkButton = forwardRef<HTMLButtonElement, ActionNetworkButtonProps>(
  ({ className, variant, size, href, isExternal = false, ...props }, ref) => {
    const checkIcon = (
      <svg 
        className="h-4 w-4 ml-2" 
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path 
          fill="currentColor" 
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </svg>
    )

    const content = (
      <>
        Action Network
        {checkIcon}
      </>
    )

    if (href) {
      return (
        <a
          href={href}
          className={cn(actionNetworkButtonVariants({ variant, size }), className)}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        className={cn(actionNetworkButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    )
  }
)

ActionNetworkButton.displayName = 'ActionNetworkButton'

export { ActionNetworkButton, actionNetworkButtonVariants }