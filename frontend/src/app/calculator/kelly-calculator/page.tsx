// Remove any direct PageLayout references for successful build
import KellyCalculatorClientWrapper from './page.client';

export default function KellyCalculatorPage() {
  // Simple page that just renders the client wrapper
  return <KellyCalculatorClientWrapper />;
}