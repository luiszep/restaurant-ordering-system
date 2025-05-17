import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServerRequestPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleRequest = (type) => {
    // 🚨 Replace this with backend call later
    console.log(`Request sent: ${type}`);
    setSubmitted(true);

    // Optional: send session ID to backend with request
    // const sessionId = localStorage.getItem('tableSessionId');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6 text-center">
      {!submitted ? (
        <>
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Need Help?</h1>
          <p className="text-gray-700 mb-6">Tap a button to let your server know what you need.</p>

          <div className="space-y-4 w-full max-w-xs">
            <button
              onClick={() => handleRequest('Refill')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
            >
              Request Refill
            </button>
            <button
              onClick={() => handleRequest('Utensils')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
            >
              Need Utensils
            </button>
            <button
              onClick={() => handleRequest('Assistance')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
            >
              Ask a Question
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg text-lg hover:bg-gray-400"
            >
              Go Back
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Request Sent</h2>
          <p className="text-gray-700 mb-6">Your server has been notified. Thank you for your patience!</p>
          <button
            onClick={() => navigate('/menu/your-session-id')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Return to Menu
          </button>
        </>
      )}
    </div>
  );
};

export default ServerRequestPage;
