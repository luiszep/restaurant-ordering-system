import React, { useState } from 'react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetRequest = (e) => {
        e.preventDefault();
        console.log("Sending password reset request for:", email);
        setMessage("If this email is registered, a reset link will be sent.");
        // Later: Connect to backend for actual reset
    };

    return (
        <div style={{
            textAlign: 'center', padding: '50px', maxWidth: '400px',
            margin: 'auto', border: '2px solid #4b0082', borderRadius: '10px'
        }}>
            <h2>Forgot Password?</h2>
            <p>Enter your email to receive a reset link.</p>
            <form onSubmit={handleResetRequest}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '94%', padding: '10px', margin: '10px 0' }}
                />
                <button type="submit"
                    style={{ width: '100%', padding: '10px', background: '#FFD700', fontWeight: 'bold' }}>
                    Send Reset Link
                </button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default ForgotPasswordPage;
