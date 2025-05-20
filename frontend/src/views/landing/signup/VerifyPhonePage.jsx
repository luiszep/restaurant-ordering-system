import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileBlockMessage from "../../../components/MobileBlockMessage";

const VerifyPhonePage = () => {
  const navigate = useNavigate();

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

  const formatPhoneNumber = (digits) => {
    const cleaned = digits.replace(/\D/g, '').slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : digits;
  };

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

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    if (!storedPhone) {
      navigate('/admin/add-phone-number');
    } else {
      setPhone(storedPhone);
    }
  }, [navigate]);

  const handleCodeChange = (e) => setCode(e.target.value);

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

    setStageRequests(prev => prev + 1);
    setFailedAttempts(0);
    setVerifyDisabled(false);

    console.log("Resending code to:", phone);

    let newCode = activeCode;
    if (stageRequests + 1 === 1) newCode = "111111";
    else if (stageRequests + 1 === 2) newCode = "222222";
    else if (stageRequests + 1 === 3) newCode = "333333";

    setActiveCode(newCode);
    console.log(`New verification code: ${newCode}`);

    setMessage({
      text: `A new code has been sent via SMS. Please check your phone. (Testing: ${newCode})`,
      color: "black"
    });

    if (stageRequests + 1 >= 2) {
      setCooldownEndTime(Date.now() + 30000);
    }
  };

  return (
    <>
    <MobileBlockMessage /> 
    <div className="hidden md:block">
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold">Verify your phone number</h2>
        <p className="text-gray-300">
          We sent a verification code via SMS to <b>{formatPhoneNumber(phone)}</b>.
        </p>

        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={handleCodeChange}
          maxLength="6"
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleVerify}
          disabled={verifyDisabled || code.length !== 6}
          className={`w-full font-bold py-3 rounded-md transition duration-300 ${
            verifyDisabled || code.length !== 6
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          Verify
        </button>

        {totalAttempts < 9 && stageRequests < 3 && !cooldownEndTime && (
          <button
            onClick={handleResendCode}
            className="text-green-400 text-sm hover:underline mt-2"
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
          <p className={`mt-2 text-sm ${message.color === 'red' ? 'text-red-500' : 'text-gray-300'}`}>
            {message.text}
          </p>
        )}

        {message.showButton && (
          <button
            onClick={() => navigate('/admin/add-phone-number')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 mt-4 rounded-md"
          >
            Return to Add Phone Number
          </button>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default VerifyPhonePage;
