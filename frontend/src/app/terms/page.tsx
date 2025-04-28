'use client';

import PageLayout from '@/components/layout/PageLayout';

export default function TermsOfService() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-4xl py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-400">Please read these terms carefully before using our services</p>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using PicksOffice services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            PicksOffice provides sports betting analysis, predictions, and educational content. Our services are for informational and entertainment purposes only. We do not directly facilitate gambling or betting activities.
          </p>

          <h2>3. User Registration</h2>
          <p>
            Some features of our services may require registration. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate and complete.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. You also agree not to attempt to gain unauthorized access to any parts of the services or computer systems or networks connected to the services.
          </p>

          <h2>5. Content and Intellectual Property</h2>
          <p>
            All content provided on PicksOffice, including text, graphics, logos, images, and software, is the property of PicksOffice or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of PicksOffice.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            PicksOffice provides betting analyses and predictions based on statistical models and expert opinions, but we cannot guarantee the accuracy of our predictions. Sports betting inherently involves risk, and users participate at their own discretion. PicksOffice is not liable for any financial losses incurred from following our recommendations.
          </p>

          <h2>7. Disclaimers</h2>
          <p>
            The information provided by PicksOffice is for educational and entertainment purposes only. While we strive for accuracy, we make no warranties about the completeness, reliability, or accuracy of this information. Any action you take based on the information you find on our website is strictly at your own risk.
          </p>

          <h2>8. Age Restrictions</h2>
          <p>
            PicksOffice services are not intended for individuals under the legal gambling age in their respective jurisdictions. By using our services, you confirm that you are of legal age to participate in sports betting activities in your jurisdiction.
          </p>

          <h2>9. Modifications to Terms</h2>
          <p>
            PicksOffice reserves the right to modify these Terms of Service at any time. We will provide notice of any significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which PicksOffice operates, without regard to its conflict of law provisions.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at support@picksoffice.com.
          </p>

          <p className="text-sm mt-8">Last updated: April 26, 2024</p>
        </div>
      </div>
    </PageLayout>
  );
}