import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileBlockMessage from "../../../components/MobileBlockMessage";

const AddPhoneNumberPage = () => {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const formatPhone = (digits) => {
    const cleaned = digits.slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : cleaned;
  };

  const handleInputChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digits);
    setIsValid(digits.length === 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    localStorage.setItem("userPhone", phone);
    console.log("Phone number submitted:", phone);
    navigate('/admin/verify-phone');
  };

  const handleSkip = () => {
    navigate('/admin/success');
  };

  return (
    <>
    <MobileBlockMessage />
    <div className="hidden md:block">
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Add your phone number</h2>
        <p className="text-gray-300">
          We’ll text a security code to your mobile phone to finish setting up your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`flex items-center px-4 py-2 rounded-md border ${isValid ? 'border-green-400' : 'border-gray-600'} bg-gray-800`}>
            <span className="text-white mr-3">🇺🇸 +1</span>
            <input
              type="tel"
              placeholder="Phone number"
              value={formatPhone(phone)}
              onChange={handleInputChange}
              className="bg-transparent flex-1 text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {isValid ? (
            <p className="text-green-400 text-left text-sm ml-1">✓ Valid mobile number</p>
          ) : phone.length > 0 ? (
            <p className="text-red-500 text-left text-sm ml-1">Please enter a valid 10-digit number.</p>
          ) : null}

          <p className="text-sm text-gray-400 leading-relaxed mt-2">
            By <b>selecting Continue</b>, you agree to receive a text message with a security code. Standard rates may apply.
          </p>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full font-bold py-3 rounded-md transition duration-300 ${
              isValid ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-600 text-white cursor-not-allowed'
            }`}
          >
            Continue
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="text-green-400 text-sm hover:underline mt-2"
          >
            Skip this step
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default AddPhoneNumberPage;
