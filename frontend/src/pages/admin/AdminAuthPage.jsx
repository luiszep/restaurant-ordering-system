import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthPage = () => {
    // State to hold error messages
    const [isLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [isPhone, setIsPhone] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    
    // Define the correct credentials for testing
    const correctEmail = "test@example.com";
    const correctPhone = "1234567890";
    const correctPassword = "Password123";

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        if (/^\d*$/.test(val)) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }
      };
      
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (
            (
                (isPhone && email == correctPhone) ||
                (!isPhone && email == correctEmail)
            ) &&
            password == correctPassword
        ) {
            console.log(isLogin ? "Logging in..." : "Registering...");
            setError("");
            navigate('/admin/dashboard');
        } else {
            console.log("Authentication failed.");
            setError("The entered email/phone number or password is incorrect. Please try again.");
        }
    };

    return (
        <div style={{
            textAlign: 'center', padding: '50px', maxWidth: '400px',
            margin: 'auto', border: '2px solid #4b0082', borderRadius: '10px'
        }}>
            <h2>{isLogin ? "Sign in" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
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
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '94%', padding: '10px', margin: '10px 0' }}
                />
                {isLogin && ( // Show "Forgot Password?" only for login
                    <p style={{ textAlign: 'right', fontSize: '14px', cursor: 'pointer', color: '#4b0082' }}
                       onClick={() => navigate('/admin/forgot-password')}>
                        Forgot password?
                    </p>
                )}
                <button 
                    type="submit"
                    style={{ width: '100%', padding: '10px', background: '#FFD700', fontWeight: 'bold' }}>
                    {isLogin ? "Sign in" : "Register"}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p 
                style={{ cursor: 'pointer', color: '#4b0082', textDecoration: 'underline' }}
                onClick={() => isLogin ? navigate('/admin/register') : navigate('/admin/login')}
            >
                {isLogin ? "Register now" : "Already have an account? Sign in"}
            </p>
        </div>
    );
};

export default AdminAuthPage;
