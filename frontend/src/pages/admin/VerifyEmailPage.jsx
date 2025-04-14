// File: src/pages/VerifyEmailPage.jsx
// Description: Handles email-based verification during the admin registration process
// Manages state for active codes, attempts, cooldowns, and navigation

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
    const navigate = useNavigate();

    // --- State Management ---
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState({ text: '', color: 'black', showButton: false });

    const [failedAttempts, setFailedAttempts] = useState(0);       // Failed attempts in current stage
    const [totalAttempts, setTotalAttempts] = useState(0);         // Cumulative failed attempts
    const [verifyDisabled, setVerifyDisabled] = useState(false);   // Disables Verify button after 3 strikes

    const [stageRequests, setStageRequests] = useState(0);         // Tracks how many codes sent this stage
    const [cooldownEndTime, setCooldownEndTime] = useState(null);  // When next code can be sent
    const [cooldownRemaining, setCooldownRemaining] = useState(0); // Seconds remaining in cooldown

    const [activeCode, setActiveCode] = useState("000000");        // Current verification code (testing)

    // --- Cooldown Countdown Effect ---
    useEffect(() => {
        if (!cooldownEndTime) return;

        const interval = setInterval(() => {
            const timeLeft = Math.max(0, Math.floor((cooldownEndTime - Date.now()) / 1000));
            setCooldownRemaining(timeLeft);

            if (timeLeft === 0) {
                setCooldownEndTime(null);  // Clear cooldown
                setCooldownRemaining(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldownEndTime]);

    // --- Load Email from LocalStorage ---
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");

        if (!storedEmail) {
            navigate('/admin/register'); // Redirect if no email present
        } else {
            setEmail(storedEmail);
        }
    }, [navigate]);

    // --- Handlers ---

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleVerify = () => {
        const correctCode = activeCode;

        if (code.length !== 6) {
            setMessage({ text: "Please enter a valid 6-digit code.", color: "black" });
            return;
        }

        if (code === correctCode) {
            setFailedAttempts(0);
            setTotalAttempts(0);
            console.log("Verification successful!");
            navigate('/admin/add-phone-number');
            return;
        }

        setFailedAttempts(prev => prev + 1);
        setTotalAttempts(prev => prev + 1);

        if (totalAttempts + 1 >= 9) {
            setMessage({
                text: "Too many code requests. Please check your email and re-enter your information.",
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
                text: "Too many code requests. Please check your email and re-enter your information.",
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

        console.log("Resending code to:", email);

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
            text: `A new code has been sent. Please check your email. (Testing: ${newCode})`,
            color: "black"
        });

        if (stageRequests + 1 >= 2) {
            setCooldownEndTime(Date.now() + 30000); // Apply 30s cooldown
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
            <h2>Verify your email address</h2>
            <p>We emailed a security code to <b>{email}</b></p>
            <p>If you can't find it, check your spam folder.</p>

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

            {/* Show resend option if eligible */}
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

            {/* Cooldown countdown display */}
            {cooldownEndTime && (
                <p style={{ color: 'gray', marginTop: '10px' }}>
                    You can request another code in {cooldownRemaining} seconds.
                </p>
            )}

            {/* General feedback message */}
            {message.text && (
                <p style={{ color: message.color, marginTop: '10px' }}>
                    {message.text}
                </p>
            )}

            {/* Button shown only if user must restart */}
            {message.showButton && (
                <button
                    onClick={() => navigate('/admin/register')}
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
                    Return to Account Creation
                </button>
            )}
        </div>
    );
};

export default VerifyEmailPage;
