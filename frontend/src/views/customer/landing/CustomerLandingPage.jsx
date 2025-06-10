import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-international-phone/style.css';

const CustomerLandingPage = () => {
  const { id } = useParams(); // 🧠 restaurant ID from URL
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [name, setName] = useState('');
  const [tableId, setTableId] = useState('');
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [error, setError] = useState('');

  // 🍽 Load restaurant info
  useEffect(() => {
    const stored = localStorage.getItem('adminRestaurants');
    if (stored) {
      const list = JSON.parse(stored);
      const found = list.find((r) => r.id === id);
      setRestaurant(found || null);
    }
  }, [id]);

  const handleSubmit = () => {
    if (!name.trim() || !tableId.trim() || !phone.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isPhoneValid) {
      setError('Please enter a valid phone number.');
      return;
    }

    const sessionData = {
      name: name.trim(),
      tableId: tableId.trim(),
      phone: phone,
      smsOptIn: true,
    };

    localStorage.setItem(`customerSession-${id}`, JSON.stringify(sessionData));
    navigate(`/customer/${id}/menu`);
  };

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-100 text-gray-700">
        <p>Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-4">
      <img
        src={restaurant.logo || '/images/restaurant.png'}
        alt="Restaurant Logo"
        className="w-24 h-24 object-contain rounded-xl shadow-sm mb-4 bg-white"
      />
      <h1 className="text-2xl font-bold mb-6">{restaurant.name}</h1>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-xs px-4 py-2 mb-4 rounded bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      <PhoneInput
        defaultCountry="us"
        value={phone}
        onChange={(value) => {
          setPhone(value);
          setIsPhoneValid(isValidPhoneNumber(value));
        }}
        className="mb-3 w-full max-w-xs"
        inputClassName="!w-full !bg-white !text-gray-800 !border rounded !px-4 !py-2"
        containerClassName="!w-full max-w-xs"
        inputProps={{ name: 'phone', required: true }}
      />

      <input
        type="text"
        placeholder="Table ID"
        value={tableId}
        onChange={(e) => setTableId(e.target.value)}
        className="w-full max-w-xs px-4 py-2 mb-4 rounded bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      <p className="text-sm text-gray-700 mb-4">
        You will receive order updates via SMS.
      </p>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
      >
        View Menu
      </button>
    </div>
  );
};

export default CustomerLandingPage;
