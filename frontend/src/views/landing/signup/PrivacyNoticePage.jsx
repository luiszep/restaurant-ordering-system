import React from 'react';
import MobileBlockMessage from "../../../components/MobileBlockMessage";

const PrivacyNoticePage = () => {
  return (
    <>
    <MobileBlockMessage />
    <div className="hidden md:block">
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-green-500 rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-400">Privacy Notice</h1>
        
        <p>
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>

        <p>
          This Privacy Notice explains how AgoraAI (“we”, “our”, “the Platform”) collects, uses, and protects personal and business information provided by users of our restaurant management system.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li>Business registration details (name, email, country)</li>
          <li>User account details including email and phone number</li>
          <li>Device and usage data (e.g., IP address, session activity)</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-300 mt-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li>To create and manage your account</li>
          <li>To communicate important service updates</li>
          <li>To verify identity for security purposes</li>
          <li>To improve platform performance and support</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-300 mt-4">3. Sharing of Information</h2>
        <p className="text-gray-300">
          We do <strong>not</strong> sell or rent your information. We may share it with:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li>Service providers who support the platform (e.g., email/SMS verification)</li>
          <li>Government authorities where required by law</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-300 mt-4">4. Data Security</h2>
        <p className="text-gray-300">
          We implement industry-standard safeguards to protect your data, including encryption and access controls.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">5. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li>Access or correct your data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of certain communications</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-300 mt-4">6. Updates to This Policy</h2>
        <p className="text-gray-300">
          We may occasionally update this Privacy Notice. Any changes will be posted on this page with a revised effective date.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">7. Contact Us</h2>
        <p className="text-gray-300">
          If you have questions or concerns about this policy, please contact us.
        </p>
      </div>
    </div>
    </div>
    </>
  );
};

export default PrivacyNoticePage;
