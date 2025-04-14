// --- React Imports ---
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- AddPhoneNumberPage Component ---
const AddPhoneNumberPage = () => {
  // --- State Declarations ---
  const [phone, setPhone] = useState('');        // Stores raw digits (unformatted)
  const [isValid, setIsValid] = useState(false); // Tracks if phone input is valid (10 digits)
  const navigate = useNavigate();

  // --- Format Phone Number as (123) 456-7890 ---
  const formatPhone = (digits) => {
    const cleaned = digits.slice(0, 10); // Ensure no more than 10 digits
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : cleaned;
  };

  // --- Handle Input Changes ---
  const handleInputChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10); // Strip non-digits and limit to 10
    setPhone(digits);
    setIsValid(digits.length === 10); // Valid only if exactly 10 digits
  };

  // --- Handle Form Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    localStorage.setItem("userPhone", phone); // Store phone number locally
    console.log("Phone number submitted:", phone);
    navigate('/admin/verify-phone');         // Navigate to phone verification page
  };

  // --- Handle Skip Button ---
  const handleSkip = () => {
    navigate('/admin/login'); // Go to login if user skips phone step
  };

  // --- UI Rendering ---
  return (
    <div style={{
      textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '40px',
      border: '2px solid purple', borderRadius: '15px'
    }}>
      <h2>Add your phone number</h2>
      <p>We’ll text a security code to your mobile phone to finish setting up your account.</p>

      {/* Phone Input Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        {/* Phone Input Field with US Flag Prefix */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${isValid ? 'green' : '#ccc'}`,
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '5px'
        }}>
          <span style={{ marginRight: '10px' }}>🇺🇸 +1</span>
          <input
            type="tel"
            placeholder="Phone number"
            value={formatPhone(phone)}
            onChange={handleInputChange}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: 'black'
            }}
          />
        </div>

        {/* Validation Message */}
        {isValid ? (
          <p style={{ color: 'green', textAlign: 'left', fontSize: '14px', margin: '5px 0 10px 2px' }}>
            ✓ Valid mobile number
          </p>
        ) : phone.length > 0 ? (
          <p style={{ color: 'red', textAlign: 'left', fontSize: '14px', margin: '5px 0 10px 2px' }}>
            Please enter a valid 10-digit mobile number.
          </p>
        ) : null}

        {/* Disclaimer */}
        <p style={{ fontSize: '14px', marginTop: '20px', marginBottom: '10px' }}>
          By <b>selecting Continue</b>, you agree to receive a text message with a security code. Standard rates may apply.
        </p>

        {/* Continue Button */}
        <button
          type="submit"
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '12px',
            background: isValid ? '#FFD700' : '#ccc',
            color: 'black',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: isValid ? 'pointer' : 'not-allowed'
          }}
        >
          Continue
        </button>

        {/* Skip Option */}
        <p
          onClick={handleSkip}
          style={{
            marginTop: '15px',
            textDecoration: 'underline',
            color: '#4b0082',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Skip this step
        </p>
      </form>
    </div>
  );
};

// --- Export Component ---
export default AddPhoneNumberPage;
