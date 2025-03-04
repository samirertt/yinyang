import React from 'react';
import { HeartIcon, HomeIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white mt-auto pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-gray-400">
            At YinYang, we create lifelike AI characters for natural and engaging conversations. Join us in shaping the future of AI communication!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-gray-500 transition-colors">Home</a></li>
              <li><a href="/AboutUs" className="text-gray-400 hover:text-gray-500 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5" />
                <span>info@YinYang.com</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" />
                <span>+90 (522) 555 55 55</span>
              </div>
              <div className="flex items-center gap-2">
                <HomeIcon className="h-5 w-5" />
                <span>Kadir Has University</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
            <div className="mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="/PrivacyPolicy" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
              <a href="/TermsOfService" className="hover:text-gray-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;