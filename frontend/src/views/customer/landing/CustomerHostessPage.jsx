import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-international-phone/style.css';
import { Listbox } from '@headlessui/react';

const CustomerHostessPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const guestOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    const stored = localStorage.getItem('adminRestaurants');
    if (stored) {
      const list = JSON.parse(stored);
      const found = list.find((r) => r.id === id);
      setRestaurant(found || null);
    }
  }, [id]);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isPhoneValid) {
      setError('Please enter a valid phone number.');
      return;
    }

    const session = {
      name: name.trim(),
      phone: phone,
      smsOptIn: true,
      guests,
    };

    localStorage.setItem(`customerHostessSession-${id}`, JSON.stringify(session));
    setSubmitted(true);
  };

  if (!restaurant) {
    return <div className="flex justify-center items-center h-screen bg-blue-100 text-gray-700">Restaurant not found.</div>;
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-gray-800 px-4">
        <h1 className="text-xl font-semibold mb-2">Thank you, {name}!</h1>
        <p className="text-sm text-gray-600">You’ll receive a text message when your table is ready.</p>
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

      {/* Name input */}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-xs px-4 py-2 mb-4 rounded bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      {/* Guests dropdown */}
      <div className="w-full max-w-xs mb-4">
        <Listbox value={guests} onChange={setGuests}>
          <div className="relative">
            <Listbox.Button className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm">
              Party of {guests}
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {guestOptions.map((guestCount) => (
                <Listbox.Option
                  key={guestCount}
                  value={guestCount}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-3 ${
                      active ? 'bg-pink-100 text-pink-800' : 'text-gray-800'
                    }`
                  }
                >
                  Party of {guestCount}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

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

      <p className="text-sm text-gray-700 mb-4">
        You will receive waitlist updates via SMS.
      </p>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
      >
        Join Waitlist
      </button>
    </div>
  );
};

export default CustomerHostessPage;
