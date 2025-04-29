import { ReactNode } from 'react';
import PageLayoutClient from './PageLayoutClient';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <PageLayoutClient>{children}</PageLayoutClient>;
}