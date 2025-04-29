import PageLayout from '../../../components/layout/PageLayoutClient'; // Ändere den Import
import KellyCalculatorClientWrapper from './page.client';

export default function KellyCalculatorPage() {
  return (
    <PageLayout>
      <KellyCalculatorClientWrapper />
    </PageLayout>
  );
}