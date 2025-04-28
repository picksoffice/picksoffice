/**
 * Unified Button System for PicksOffice
 * 
 * This is a comprehensive button component that can be used throughout the application
 * to maintain visual consistency while providing flexibility for different contexts.
 */
import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { Link } from './link'
import clsx from 'clsx'

// Button size variants - consistent across all screen sizes
const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-xs rounded-md',
  md: 'px-3.5 py-2 text-sm rounded-md',
  lg: 'px-4 py-2.5 text-base rounded-md',
  xl: 'px-5 py-3 text-base rounded-md',
  icon: {
    sm: 'p-1.5 rounded-full',
    md: 'p-2 rounded-full',
    lg: 'p-2.5 rounded-full',
  }
}

// Button variant styles
const variantStyles = {
  // Primary buttons - Filled background with slate-950 text - mobile-ready
  primary: {
    indigo: 'bg-sky-300 text-slate-950 hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 shadow-sm border border-transparent disabled:opacity-50 transition-colors',
    blue: 'bg-sky-300 text-slate-950 hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 shadow-sm border border-transparent disabled:opacity-50 transition-colors',
    green: 'bg-sky-300 text-slate-950 hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 shadow-sm border border-transparent disabled:opacity-50 transition-colors',
    red: 'bg-sky-300 text-slate-950 hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 shadow-sm border border-transparent disabled:opacity-50 transition-colors',
  },
  
  // Secondary buttons - Outline with colored text - mobile-ready
  secondary: {
    indigo: 'bg-transparent text-sky-400 hover:bg-sky-50 active:bg-sky-50 dark:hover:bg-sky-950/20 dark:active:bg-sky-950/20 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 border border-sky-400/30 disabled:opacity-50 transition-colors',
    blue: 'bg-transparent text-sky-400 hover:bg-sky-50 active:bg-sky-50 dark:hover:bg-sky-950/20 dark:active:bg-sky-950/20 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 border border-sky-400/30 disabled:opacity-50 transition-colors',
    green: 'bg-transparent text-green-600 hover:bg-green-50 active:bg-green-50 dark:hover:bg-green-950/20 dark:active:bg-green-950/20 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 border border-green-600/30 disabled:opacity-50 transition-colors',
    red: 'bg-transparent text-red-600 hover:bg-red-50 active:bg-red-50 dark:hover:bg-red-950/20 dark:active:bg-red-950/20 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 border border-red-600/30 disabled:opacity-50 transition-colors',
  },
  
  // Tertiary buttons - No background, no border, just text - mobile-ready
  tertiary: {
    indigo: 'text-sky-400 hover:text-sky-500 active:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 dark:active:text-sky-300 hover:underline active:underline touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
    blue: 'text-sky-400 hover:text-sky-500 active:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 dark:active:text-sky-300 hover:underline active:underline touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
    green: 'text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-400 dark:hover:text-green-300 dark:active:text-green-300 hover:underline active:underline touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
    red: 'text-red-600 hover:text-red-500 active:text-red-500 dark:text-red-400 dark:hover:text-red-300 dark:active:text-red-300 hover:underline active:underline touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
  },
  
  // Ghost buttons - Transparent with hover effect - mobile-ready
  ghost: {
    indigo: 'text-sky-400 hover:bg-sky-100/30 active:bg-sky-100/30 dark:text-sky-400 dark:hover:bg-sky-950/20 dark:active:bg-sky-950/20 touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
    blue: 'text-sky-400 hover:bg-sky-100/30 active:bg-sky-100/30 dark:text-sky-400 dark:hover:bg-sky-950/20 dark:active:bg-sky-950/20 touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
    green: 'text-green-600 hover:bg-green-100/30 active:bg-green-100/30 dark:text-green-400 dark:hover:bg-green-950/20 dark:active:bg-green-950/20 touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
    red: 'text-red-600 hover:bg-red-100/30 active:bg-red-100/30 dark:text-red-400 dark:hover:bg-red-950/20 dark:active:bg-red-950/20 touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
    gray: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 active:bg-gray-100/50 dark:hover:bg-gray-800/50 dark:active:bg-gray-800/50 touch-action-manipulation focus-visible:outline-none disabled:opacity-50 transition-colors',
  }
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'
type ButtonColor = 'indigo' | 'blue' | 'green' | 'red' | 'gray'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
type IconButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconSize?: IconButtonSize;
  isIconOnly?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
  href?: string;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Button component with consistent styling and multiple variants
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  variant = 'primary',
  color = 'indigo',
  size = 'md',
  iconSize = 'md',
  isIconOnly = false,
  isLoading = false,
  asChild = false,
  href,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}, ref) {
  // Handle gray color specially since it's only available for the ghost variant
  const finalColor = variant === 'ghost' && color === 'gray' ? color : 
                    (color === 'gray' ? 'indigo' : color);
  
  // Determine the size class based on whether it's an icon button
  const sizeClass = isIconOnly 
    ? sizeStyles.icon[iconSize as IconButtonSize] 
    : sizeStyles[size];
  
  // Combine all the classes
  const buttonClasses = clsx(
    // Base styles
    'font-semibold inline-flex items-center justify-center transition-colors focus:outline-none tap-highlight-transparent',
    // Size styles
    sizeClass,
    // Variant and color styles
    variantStyles[variant][finalColor],
    // Full width
    fullWidth && 'w-full',
    // Disabled state
    disabled && 'cursor-not-allowed',
    // Loading state
    isLoading && 'opacity-80 cursor-wait',
    // Custom classes
    className
  );

  // Loading indicator
  const LoadingIndicator = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {isLoading && <LoadingIndicator />}
        {children}
      </Link>
    );
  }

  // Render as Headless UI Button to enable proper accessibility
  return (
    <Headless.Button
      type="button"
      className={buttonClasses}
      disabled={disabled || isLoading}
      ref={ref}
      {...props}
    >
      {isLoading && <LoadingIndicator />}
      {children}
    </Headless.Button>
  );
});

/**
 * IconButton - A convenience component for icon-only buttons
 */
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'isIconOnly'> & { 'aria-label': string }>(
  function IconButton(props, ref) {
    return <Button {...props} isIconOnly ref={ref} />;
  }
);