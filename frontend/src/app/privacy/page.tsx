'use client';

import PageLayout from '@/components/layout/PageLayout';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-4xl py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-400">How we handle your personal information</p>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At PicksOffice, we respect your privacy and are committed to protecting your personal
            data. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect several types of information from and about users of our website,
            including:
          </p>
          <ul>
            <li>Personal information such as name, email address, and demographic information</li>
            <li>
              Information about your internet connection, the equipment you use to access our
              website, and usage details
            </li>
            <li>Non-personal information about your betting preferences and interests</li>
          </ul>

          <h2>3. How We Collect Your Information</h2>
          <p>
            We collect information directly from you when you register on our site, place an order,
            subscribe to our newsletter, respond to a survey, or fill out a form. We also
            automatically collect certain information as you navigate through the site, including
            usage details, IP addresses, and browser types.
          </p>

          <h2>4. How We Use Your Information</h2>
          <p>We use the information we collect about you or that you provide to us:</p>
          <ul>
            <li>To provide, maintain, and improve our services</li>
            <li>To process transactions and send related information</li>
            <li>To send promotional communications, such as new features or products</li>
            <li>To respond to your comments, questions, and requests</li>
            <li>
              To monitor and analyze trends, usage, and activities in connection with our services
            </li>
          </ul>

          <h2>5. Disclosure of Your Information</h2>
          <p>
            We may disclose aggregated information about our users without restriction. We may
            disclose personal information:
          </p>
          <ul>
            <li>To comply with any court order, law, or legal process</li>
            <li>To protect the rights, property, or safety of PicksOffice, our users, or others</li>
            <li>With your consent</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from
            accidental loss and from unauthorized access, use, alteration, and disclosure. However,
            the transmission of information via the internet is not completely secure. We cannot
            guarantee the security of your personal information transmitted to our website.
          </p>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our website
            and hold certain information. Cookies are files with small amounts of data which may
            include an anonymous unique identifier. You can instruct your browser to refuse all
            cookies or to indicate when a cookie is being sent.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We have no control over and
            assume no responsibility for the content, privacy policies, or practices of any
            third-party sites or services.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly
            collect personally identifiable information from children under 18. If you are a parent
            or guardian and you are aware that your child has provided us with personal data, please
            contact us.
          </p>

          <h2>10. Changes to Our Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@picksoffice.com.
          </p>

          <p className="text-sm mt-8">Last updated: April 26, 2024</p>
        </div>
      </div>
    </PageLayout>
  );
}
