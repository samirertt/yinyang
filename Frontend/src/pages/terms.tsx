import React from 'react';
import { ScaleIcon } from '@heroicons/react/24/outline';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#212121] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <ScaleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-400 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-[#212121] rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-400">
              By accessing or using our services, you agree to be bound by these Terms. 
              If you disagree with any part, you may not access the service.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">User Responsibilities</h2>
            <p className="text-gray-400 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Violate any laws or third-party rights</li>
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Disrupt service functionality</li>
            </ul>
          </section>

          {/* Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Account Management</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>You must provide accurate registration information</li>
              <li>You are responsible for account security</li>
              <li>We reserve right to terminate accounts at our discretion</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Intellectual Property</h2>
            <p className="text-gray-400">
              All content and trademarks remain the exclusive property of our company. 
              You may not use any materials without express written permission.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">User Content</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>You retain ownership of your content</li>
              <li>By posting content, you grant us a non-exclusive license to use it</li>
              <li>You are solely responsible for content you upload</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Termination</h2>
            <p className="text-gray-400">
              We may terminate or suspend access immediately, without prior notice, 
              for any breach of these Terms.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Disclaimers</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Service provided "as is" without warranties</li>
              <li>We do not guarantee uninterrupted service</li>
              <li>We are not responsible for third-party content</li>
            </ul>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Limitation of Liability</h2>
            <p className="text-gray-400">
              In no event shall we be liable for any indirect, incidental, or 
              consequential damages arising from service use.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Governing Law</h2>
            <p className="text-gray-400">
              These Terms shall be governed by the laws of [Your Country/State] 
              without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Changes to Terms</h2>
            <p className="text-gray-400">
              We reserve the right to modify these Terms at any time. Continued use 
              after changes constitutes acceptance.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">Contact Us</h2>
            <p className="text-gray-400">
              For questions about these Terms, contact us at:<br />
              <a href="mailto:legal@yourcompany.com" className="text-green-600 hover:underline">
                legal@YinYang.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;