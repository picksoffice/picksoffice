'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Bet105ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  target?: string;
}

const Bet105Button = forwardRef<HTMLButtonElement, Bet105ButtonProps>(
  ({ href, className = '', target = '_blank', ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center px-5 py-[19px] rounded-lg bg-[#3083dc] hover:bg-[#2471c6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-[58px] text-center';
    const combinedClasses = `${baseClasses} ${className}`;

    // Logo Component
    const LogoContent = () => (
      <div className="h-5 w-auto flex items-center">
        <Image
          src="/images/logos/logo-h-white.svg"
          alt="Bet105 Logo"
          width={100}
          height={20}
          className="h-full w-auto"
        />
      </div>
    );

    // If href is provided, render as link
    if (href) {
      return (
        <Link href={href} target={target} className={combinedClasses} {...(props as any)}>
          <LogoContent />
        </Link>
      );
    }

    // Otherwise render as button
    return (
      <button ref={ref} className={combinedClasses} type="button" {...props}>
        <LogoContent />
      </button>
    );
  }
);

Bet105Button.displayName = 'Bet105Button';

export { Bet105Button };
