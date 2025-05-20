import React from 'react';

const MobileBlockMessage = () => {
  return (
    <div className="block md:hidden min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="text-center text-green-400 mb-4">
          <h2 className="text-3xl font-extrabold">AgoraAI</h2>
          <p className="text-base text-gray-300 mt-1">by The Agora Company</p>
        </div>
        <h1 className="text-3xl font-extrabold mb-4 text-green-400">
          The First AI System Built for Restaurants
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Boost efficiency, reduce errors, and elevate the guest experience — no POS, no hardware swaps, just AI.
        </p>
        <p className="text-green-400 font-medium">
          Check us out on a PC device for more information.
        </p>
      </div>
    </div>
  );
};

export default MobileBlockMessage;
