import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileBlockMessage from "../../../components/MobileBlockMessage";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <MobileBlockMessage />
    <div className="hidden md:block">
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold text-green-400">🎉 Congratulations!</h2>
        <p className="text-gray-300">
          Your account has been successfully created.
        </p>
        <p className="text-gray-300">
          You can now log in and access your admin dashboard.
        </p>

        <button
          onClick={() => navigate('/admin/login')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default SuccessPage;
