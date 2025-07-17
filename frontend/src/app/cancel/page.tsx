import CancelPageContent from './CancelPageContent';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function CancelPage() {
  return <CancelPageContent />;
}