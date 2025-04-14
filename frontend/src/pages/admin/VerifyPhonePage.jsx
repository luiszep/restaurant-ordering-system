// File: src/pages/VerifyPhonePage.jsx
// Description: Handles SMS-based phone number verification logic
// Includes attempt tracking, cooldown timers, and mock code resend functionality for dev testing

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyPhonePage = () => {
  const navigate = useNavigate();

  // --- State Variables ---
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState({ text: '', color: 'black', showButton: false });

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [verifyDisabled, setVerifyDisabled] = useState(false);

  const [stageRequests, setStageRequests] = useState(0);
  const [cooldownEndTime, setCooldownEndTime] = useState(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const [activeCode, setActiveCode] = useState("000000");

  // --- Helpers ---

  // Formats raw digits as (123) 456-7890 if valid
  const formatPhoneNumber = (digits) => {
    const cleaned = digits.replace(/\D/g, '').slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : digits;
  };

  // --- Effects ---

  // Countdown effect for cooldownRemaining display
  useEffect(() => {
    if (!cooldownEndTime) return;

    const interval = setInterval(() => {
      const timeLeft = Math.max(0, Math.floor((cooldownEndTime - Date.now()) / 1000));
      setCooldownRemaining(timeLeft);

      if (timeLeft === 0) {
        setCooldownEndTime(null);
        setCooldownRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownEndTime]);

  // Load phone number from localStorage
  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    if (!storedPhone) {
      navigate('/admin/add-phone-number');
    } else {
      setPhone(storedPhone);
    }
  }, [navigate]);

  // --- Handlers ---

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Handles code verification logic
  const handleVerify = () => {
    const correctCode = activeCode;

    if (code.length !== 6) {
      setMessage({ text: "Please enter a valid 6-digit code.", color: "black" });
      return;
    }

    if (code === correctCode) {
      setFailedAttempts(0);
      setTotalAttempts(0);
      console.log("Phone verification successful!");
      navigate('/admin/success');
      return;
    }

    // Failed attempt logic
    setFailedAttempts(prev => prev + 1);
    setTotalAttempts(prev => prev + 1);

    if (totalAttempts + 1 >= 9) {
      setMessage({
        text: "Too many code requests. Please check your phone and re-enter your information.",
        color: "black",
        showButton: true
      });
      setVerifyDisabled(true);
    } else if (failedAttempts + 1 >= 3) {
      setMessage({
        text: "Please request new code and try again. The current code has expired.",
        color: "red"
      });
      setVerifyDisabled(true);
      setStageRequests(0);
    } else {
      setMessage({ text: "Please try again. This code is wrong.", color: "black" });
    }
  };

  // Handles "Get another code" logic
  const handleResendCode = () => {
    if (totalAttempts >= 9) {
      setMessage({
        text: "Too many code requests. Please check your phone and re-enter your information.",
        color: "black",
        showButton: true
      });
      return;
    }

    if (stageRequests >= 3) {
      setMessage({
        text: "You have reached the maximum number of requests for this stage. Please try verifying first.",
        color: "black"
      });
      return;
    }

    if (cooldownEndTime) {
      setMessage({
        text: `Please wait ${cooldownRemaining} seconds before requesting another code.`,
        color: "black"
      });
      return;
    }

    // Proceed to resend
    setStageRequests(prev => prev + 1);
    setFailedAttempts(0);
    setVerifyDisabled(false);

    console.log("Resending code to:", phone);

    // Mock new codes for testing
    let newCode = activeCode;
    if (stageRequests + 1 === 1) {
      newCode = "111111";
    } else if (stageRequests + 1 === 2) {
      newCode = "222222";
    } else if (stageRequests + 1 === 3) {
      newCode = "333333";
    }

    setActiveCode(newCode);
    console.log(`New verification code: ${newCode}`);

    setMessage({
      text: `A new code has been sent via SMS. Please check your phone. (Testing: ${newCode})`,
      color: "black"
    });

    if (stageRequests + 1 >= 2) {
      setCooldownEndTime(Date.now() + 30000); // 30-second cooldown
    }
  };

  // --- Render ---

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      maxWidth: '400px',
      margin: 'auto',
      border: '2px solid #4b0082',
      borderRadius: '10px'
    }}>
      <h2>Verify your phone number</h2>
      <p>We sent a verification code via SMS to <b>{formatPhoneNumber(phone)}</b>.</p>

      <input
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={handleCodeChange}
        maxLength="6"
        style={{
          width: '94%',
          padding: '10px',
          margin: '10px 0',
          textAlign: 'center',
          fontSize: '18px'
        }}
      />

      <button
        onClick={handleVerify}
        style={{
          width: '100%',
          padding: '10px',
          background: verifyDisabled ? 'gray' : (code.length === 6 ? '#4b0082' : 'gray'),
          color: 'white',
          fontWeight: 'bold',
          cursor: verifyDisabled ? 'not-allowed' : (code.length === 6 ? 'pointer' : 'not-allowed')
        }}
        disabled={verifyDisabled || code.length !== 6}
      >
        Verify
      </button>

      {/* Optional resend link */}
      {totalAttempts < 9 && stageRequests < 3 && !cooldownEndTime && (
        <p
          onClick={handleResendCode}
          style={{
            color: '#4b0082',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginTop: '10px'
          }}
        >
          Get another one
        </p>
      )}

      {/* Cooldown display */}
      {cooldownEndTime && (
        <p style={{ color: 'gray', marginTop: '10px' }}>
          You can request another code in {cooldownRemaining} seconds.
        </p>
      )}

      {/* Feedback message */}
      {message.text && (
        <p style={{ color: message.color, marginTop: '10px' }}>
          {message.text}
        </p>
      )}

      {/* Button to return to phone input page */}
      {message.showButton && (
        <button
          onClick={() => navigate('/admin/add-phone-number')}
          style={{
            marginTop: '10px',
            padding: '10px',
            background: '#ff4d4d',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          Return to Add Phone Number
        </button>
      )}
    </div>
  );
};

export default VerifyPhonePage;
