// File: src/views/landing/signup/VerifyEmailPage.jsx
// Description: Handles email verification with cooldowns, attempts, and validation.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState({ text: '', color: 'black', showButton: false });

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [verifyDisabled, setVerifyDisabled] = useState(false);

  const [stageRequests, setStageRequests] = useState(0);
  const [cooldownEndTime, setCooldownEndTime] = useState(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const [activeCode, setActiveCode] = useState("000000");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      navigate('/admin/register');
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

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

  const handleCodeChange = (e) => setCode(e.target.value);

  const handleVerify = () => {
    if (code.length !== 6) {
      setMessage({ text: "Please enter a valid 6-digit code.", color: "gray" });
      return;
    }

    if (code === activeCode) {
      setMessage({ text: '', color: '' });
      setFailedAttempts(0);
      setTotalAttempts(0);
      navigate('/admin/add-phone-number');
      return;
    }

    setFailedAttempts(prev => prev + 1);
    setTotalAttempts(prev => prev + 1);

    if (totalAttempts + 1 >= 9) {
      setVerifyDisabled(true);
      setMessage({
        text: "Too many attempts. Please return and restart your registration.",
        color: "red",
        showButton: true
      });
    } else if (failedAttempts + 1 >= 3) {
      setVerifyDisabled(true);
      setStageRequests(0);
      setMessage({
        text: "This code has expired. Please request a new one.",
        color: "red"
      });
    } else {
      setMessage({ text: "Incorrect code. Please try again.", color: "red" });
    }
  };

  const handleResendCode = () => {
    if (totalAttempts >= 9) {
      setMessage({
        text: "Too many attempts. Please return and restart your registration.",
        color: "red",
        showButton: true
      });
      return;
    }

    if (stageRequests >= 3) {
      setMessage({
        text: "You've reached the maximum code requests for now. Please verify or wait.",
        color: "red"
      });
      return;
    }

    if (cooldownEndTime) {
      setMessage({
        text: `Please wait ${cooldownRemaining} seconds before requesting again.`,
        color: "gray"
      });
      return;
    }

    setStageRequests(prev => prev + 1);
    setFailedAttempts(0);
    setVerifyDisabled(false);

    let newCode = activeCode;
    if (stageRequests + 1 === 1) newCode = "111111";
    else if (stageRequests + 1 === 2) newCode = "222222";
    else if (stageRequests + 1 === 3) newCode = "333333";

    setActiveCode(newCode);
    console.log(`New verification code sent: ${newCode}`);

    setMessage({
      text: `New code sent. Check your inbox. (Testing: ${newCode})`,
      color: "green"
    });

    if (stageRequests + 1 >= 2) {
      setCooldownEndTime(Date.now() + 30000);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Verify your email address</h2>
        <p className="text-gray-300">
          We emailed a code to <b className="text-white">{email}</b><br />
          If you can’t find it, check your spam folder.
        </p>

        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={handleCodeChange}
          maxLength="6"
          className="w-full p-3 text-center bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
        />

        <button
          onClick={handleVerify}
          disabled={verifyDisabled || code.length !== 6}
          className={`w-full font-bold py-3 rounded-md transition duration-300 ${
            verifyDisabled || code.length !== 6
              ? 'bg-gray-600 text-white cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          Verify
        </button>

        {totalAttempts < 9 && stageRequests < 3 && !cooldownEndTime && (
          <button
            onClick={handleResendCode}
            className="text-green-400 hover:underline text-sm mt-2"
          >
            Get another one
          </button>
        )}

        {cooldownEndTime && (
          <p className="text-gray-400 text-sm mt-2">
            You can request another code in {cooldownRemaining} seconds.
          </p>
        )}

        {message.text && (
          <p className={`mt-4 text-sm text-${message.color === 'red' ? 'red-500' : message.color === 'green' ? 'green-400' : 'gray-300'}`}>
            {message.text}
          </p>
        )}

        {message.showButton && (
          <button
            onClick={() => navigate('/admin/register')}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Return to Account Creation
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
