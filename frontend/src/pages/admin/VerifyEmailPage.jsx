import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState({ text: '', color: 'black', showButton: false });
    const [failedAttempts, setFailedAttempts] = useState(0); // Track attempts before requiring new code
    const [totalAttempts, setTotalAttempts] = useState(0); // Track total incorrect attempts (max 9)
    const [verifyDisabled, setVerifyDisabled] = useState(false); // Disable Verify button after 3 wrong attempts
    const [stageRequests, setStageRequests] = useState(0); // Track requests per verification stage
    const [cooldownEndTime, setCooldownEndTime] = useState(null); // Stores when the cooldown ends
    const [cooldownRemaining, setCooldownRemaining] = useState(0); // Tracks countdown in seconds
    const [activeCode, setActiveCode] = useState("000000"); // Tracks the current verification code

    useEffect(() => {
        if (!cooldownEndTime) return;
    
        const interval = setInterval(() => {
            const timeLeft = Math.max(0, Math.floor((cooldownEndTime - Date.now()) / 1000));
            setCooldownRemaining(timeLeft);
    
            if (timeLeft === 0) {
                setCooldownEndTime(null); // Cooldown is over
                setCooldownRemaining(0);
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, [cooldownEndTime]);
    
    // Load the user's email from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (!storedEmail) {
            navigate('/admin/register'); // Redirect to registration if no email is found
        } else {
            setEmail(storedEmail);
        }
    }, [navigate]);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleVerify = () => {
        const correctCode = activeCode; // Use the dynamically updated code
    
        if (code.length !== 6) {
            setMessage({ text: "Please enter a valid 6-digit code.", color: "black" });
            return;
        }

        if (code === correctCode) {
            // Reset everything and move to the next step
            setFailedAttempts(0);
            setTotalAttempts(0);
            console.log("Verification successful!");
            navigate('/admin/add-phone-number'); // Redirect to Seller Hub after successful verification
            return;
        }        
    
        // Increase failed attempts
        setFailedAttempts(prev => prev + 1);
        setTotalAttempts(prev => prev + 1);
    
        if (totalAttempts + 1 >= 9) {
            // Too many failed attempts → force account creation restart
            setMessage({
                text: "Too many code requests. Please check your email and re-enter your information.",
                color: "black",
                showButton: true
            });
            setVerifyDisabled(true); // Disable verify button completely
        } else if (failedAttempts + 1 >= 3) {
            setMessage({
                text: "Please request new code and try again. The current code has expired.",
                color: "red"
            });
            setVerifyDisabled(true); // Disable verify button
            setStageRequests(0); // Reset stageRequests for the next stage
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
    
        setStageRequests(prev => prev + 1); // Increase stage requests
        setFailedAttempts(0); // Reset the 3-attempt counter
        setVerifyDisabled(false); // Re-enable Verify button
    
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
        setMessage({ text: `A new code has been sent. Please check your email. (Testing: ${newCode})`, color: "black" });
    
        if (stageRequests + 1 >= 2) { // After 2 resends, apply cooldown
            setCooldownEndTime(Date.now() + 30000); // 3 minutes from now
        }
    };
       
    return (
        <div style={{
            textAlign: 'center', padding: '50px', maxWidth: '400px',
            margin: 'auto', border: '2px solid #4b0082', borderRadius: '10px'
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
                style={{ width: '100%', padding: '10px', margin: '10px 0', textAlign: 'center', fontSize: '18px' }}
            />

            <button 
                onClick={handleVerify} 
                style={{ 
                    width: '106%', padding: '10px', 
                    background: verifyDisabled ? 'gray' : (code.length === 6 ? '#4b0082' : 'gray'), 
                    color: 'white', fontWeight: 'bold', 
                    cursor: verifyDisabled ? 'not-allowed' : (code.length === 6 ? 'pointer' : 'not-allowed') 
                }}
                disabled={verifyDisabled || code.length !== 6}
            >
                Verify
            </button>

            {totalAttempts < 9 && stageRequests < 3 && !cooldownEndTime && (
                <p onClick={handleResendCode} 
                    style={{ color: '#4b0082', cursor: 'pointer', textDecoration: 'underline', marginTop: '10px' }}>
                      Get another one
                </p>
            )}

            {cooldownEndTime && (
                <p style={{ color: 'gray', marginTop: '10px' }}>
                    You can request another code in {cooldownRemaining} seconds.
                </p>
            )}

            {message.text && (
                <p style={{ color: message.color, marginTop: '10px' }}>
                    {message.text}
                </p>
            )}

            {message.showButton && (
                <button 
                    onClick={() => navigate('/admin/register')} 
                    style={{
                        marginTop: '10px', padding: '10px', background: '#ff4d4d', color: 'white', 
                        fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px'
                    }}
                >
                    Return to Account Creation
                </button>
)}

        </div>
    );
};

export default VerifyEmailPage;
