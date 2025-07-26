'use client';
import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      {/* Main hero section blob - similar to the Tailwind example */}
      
      {children}
    </>
  );
}