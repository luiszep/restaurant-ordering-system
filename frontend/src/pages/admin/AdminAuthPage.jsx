// --- React Imports ---
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- AdminAuthPage Component ---
const AdminAuthPage = () => {
    // --- State Declarations ---
    const [isLogin] = useState(true);                        // Currently only supporting login (not toggling yet)
    const [email, setEmail] = useState('');                  // Holds user input for email or phone
    const [isPhone, setIsPhone] = useState(false);           // Determines if input is a phone number
    const [password, setPassword] = useState('');            // Holds password input
    const [error, setError] = useState("");                  // Tracks any authentication error

    // --- Hardcoded Test Credentials ---
    const correctEmail = "test@example.com";
    const correctPhone = "1234567890";
    const correctPassword = "Password123";

    // --- React Router Navigation Hook ---
    const navigate = useNavigate();

    // --- Input Handlers ---

    // Updates email or phone field and detects if input is numeric (phone)
    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        if (/^\d*$/.test(val)) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }
    };

    // --- Authentication Logic ---
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validate based on whether input is phone or email
        if (
            (
                (isPhone && email == correctPhone) ||
                (!isPhone && email == correctEmail)
            ) &&
            password == correctPassword
        ) {
            console.log(isLogin ? "Logging in..." : "Registering...");
            setError("");
            navigate('/admin/dashboard'); // Redirect on success
        } else {
            console.log("Authentication failed.");
            setError("The entered email/phone number or password is incorrect. Please try again.");
        }
    };

    // --- UI Rendering ---
    return (
        <div style={{
            textAlign: 'center', padding: '50px', maxWidth: '400px',
            margin: 'auto', border: '2px solid #4b0082', borderRadius: '10px'
        }}>
            <h2>{isLogin ? "Sign in" : "Register"}</h2>

            {/* --- Login Form --- */}
            <form onSubmit={handleSubmit}>
                {/* Email or Phone Input */}
                <input
                    type={isPhone ? "tel" : "email"}
                    placeholder="Email or mobile phone number"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    pattern={isPhone ? "\\d{10,13}" : undefined}
                    minLength={isPhone ? 10 : undefined}
                    maxLength={isPhone ? 13 : undefined}
                    title={isPhone 
                        ? "Please enter a 10-13 digit phone number." 
                        : "Please enter a valid email address."
                    }      
                    style={{ width: '94%', padding: '10px', margin: '10px 0' }}
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '94%', padding: '10px', margin: '10px 0' }}
                />

                {/* Forgot Password Link */}
                {isLogin && (
                    <p 
                        style={{ textAlign: 'right', fontSize: '14px', cursor: 'pointer', color: '#4b0082' }}
                        onClick={() => navigate('/admin/forgot-password')}
                    >
                        Forgot password?
                    </p>
                )}

                {/* Submit Button */}
                <button 
                    type="submit"
                    style={{ width: '100%', padding: '10px', background: '#FFD700', fontWeight: 'bold' }}
                >
                    {isLogin ? "Sign in" : "Register"}
                </button>
            </form>

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Navigation to Other Auth Page */}
            <p 
                style={{ cursor: 'pointer', color: '#4b0082', textDecoration: 'underline' }}
                onClick={() => isLogin ? navigate('/admin/register') : navigate('/admin/login')}
            >
                {isLogin ? "Register now" : "Already have an account? Sign in"}
            </p>
        </div>
    );
};

// --- Export Component ---
export default AdminAuthPage;
