import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#212121] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <ShieldCheckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-400 mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-[#212121] rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Introduction</h2>
            <p className="text-gray-400">
              We are committed to protecting your privacy. This policy explains how we collect,
              use, and safeguard your personal information when you use our services.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Data Collection</h2>
            <p className="text-gray-400 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Contact information (email, name)</li>
              <li>Usage data and analytics</li>
              <li>Technical information (IP address, device type)</li>
              <li>Any information you voluntarily provide</li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Data Usage</h2>
            <p className="text-gray-400">
              We use collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Communicate with users</li>
              <li>Ensure service security</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Data Protection</h2>
            <p className="text-gray-400">
              We implement appropriate security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Encryption technologies</li>
              <li>Regular security audits</li>
              <li>Access controls</li>
              <li>Secure data storage</li>
            </ul>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Your Rights</h2>
            <p className="text-gray-400">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Access your personal data</li>
              <li>Request data correction</li>
              <li>Delete your account</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Cookies</h2>
            <p className="text-gray-400">
              We use cookies to enhance user experience. You can manage cookie preferences
              through your browser settings.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Policy Changes</h2>
            <p className="text-gray-400">
              We may update this policy periodically. Significant changes will be notified
              through our website or email.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Contact Us</h2>
            <p className="text-gray-400">
              For privacy-related inquiries, contact us at:<br />
              <a href="mailto:privacy@yourcompany.com" className="text-gray-400 hover:underline">
                privacy@YinYang.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;