import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/layout/Newsletter';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { Toaster } from 'sonner';

// Space Grotesk for everything
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'PicksOffice | Expert Sports Betting Picks & Analysis',
  description:
    'Get winning sports betting picks and expert analysis for NFL, NBA, MLB, NHL and more. Maximize your edge with our proven betting strategy.',
  keywords:
    'sports betting, picks, NFL picks, NBA picks, MLB picks, NHL picks, betting analysis, sports predictions, betting tips, sports handicapping',
  authors: [{ name: 'PicksOffice Team' }],
  creator: 'PicksOffice',
  publisher: 'PicksOffice',
  // Next.js App Router verwendet automatisch die favicon.ico, icon.png und apple-icon.png aus dem /app-Verzeichnis
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'PicksOffice',
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://picksoffice.com',
    title: 'PicksOffice | Expert Sports Betting Picks & Analysis',
    description:
      'Get winning sports betting picks and expert analysis for NFL, NBA, MLB, NHL and more. Maximize your edge with our proven betting strategy.',
    siteName: 'PicksOffice',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PicksOffice - Sports Betting Picks & Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PicksOffice | Expert Sports Betting Picks & Analysis',
    description:
      'Get winning sports betting picks and expert analysis for NFL, NBA, MLB, NHL and more.',
    images: ['/images/twitter-image.jpg'],
    creator: '@picksoffice',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://picksoffice.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Picks Office" />
      </head>
      <body className={`${spaceGrotesk.variable} text-gray-100 bg-slate-950`}>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Newsletter />
            <Footer />
            <Toaster richColors position="top-right" theme="dark" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
