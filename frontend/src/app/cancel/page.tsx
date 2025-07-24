import CancelPageContent from './CancelPageContent';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
export const runtime = 'nodejs'; // Use Node.js runtime

export default function CancelPage() {
  return <CancelPageContent />;
}
