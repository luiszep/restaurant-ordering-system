import React from 'react';

const UserAgreementPage = () => {
  return (
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-green-500 rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-400">User Agreement</h1>

        <p>
          This User Agreement (“Agreement”) governs your use of the AgoraAI platform and services as an administrative or business user.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">1. Acceptance of Terms</h2>
        <p className="text-gray-300">
          By creating an account or using AgoraAI, you agree to abide by these terms. If you do not agree, you may not access or use the platform.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">2. Account Responsibility</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-1">
          <li>You are responsible for keeping your login credentials secure.</li>
          <li>You must provide accurate and complete registration information.</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-300 mt-4">3. Permitted Use</h2>
        <p className="text-gray-300">
          You may only use AgoraAI for managing restaurant operations under your business account. You may not reverse-engineer, exploit, or misuse the platform.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">4. Data Use</h2>
        <p className="text-gray-300">
          You acknowledge and agree that AgoraAI may collect and store usage information and business inputs to improve platform performance, as detailed in our <a href="/admin/privacy-notice" className="text-green-400 underline">Privacy Notice</a>.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">5. Termination</h2>
        <p className="text-gray-300">
          We reserve the right to suspend or terminate your account at our discretion for misuse, non-compliance, or suspicious activity.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">6. Limitation of Liability</h2>
        <p className="text-gray-300">
          AgoraAI is provided “as-is” without warranties of any kind. We are not liable for any indirect or incidental damages related to your use of the platform.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">7. Modifications</h2>
        <p className="text-gray-300">
          We may update this Agreement periodically. Continued use of the platform after changes constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-semibold text-green-300 mt-4">8. Contact</h2>
        <p className="text-gray-300">
          For any questions about this Agreement, contact us.
        </p>
      </div>
    </div>
  );
};

export default UserAgreementPage;
