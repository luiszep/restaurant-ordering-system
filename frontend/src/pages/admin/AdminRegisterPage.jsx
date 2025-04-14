// File: src/pages/AdminRegisterPage.jsx
// Description: Admin registration form with autosave, basic validation, 
// and redirect to email verification after successful submission.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegisterPage = () => {
  // --- Form state for all input fields ---
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    businessEmail: '',
    businessPassword: '',
    country: '',
  });

  // --- Load previously saved draft from localStorage on mount ---
  useEffect(() => {
    const saved = localStorage.getItem('adminRegisterData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);
  
  // --- Tracks if email is already taken ---
  const [businessEmailExists, setBusinessEmailExists] = useState(false);
  const navigate = useNavigate();

  // --- Handle input changes and autosave to localStorage ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formData,
      [name]: value
    };
    setFormData(updatedForm);
    localStorage.setItem('adminRegisterData', JSON.stringify(updatedForm)); // ← autosave
  };  

  // --- Submit form and simulate verification step ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setBusinessEmailExists(false);

    // Simulated duplicate email check
    if (formData.businessEmail === "test@example.com") {
      setBusinessEmailExists(true);
      return;
    }

    console.log("Registering business:", formData);

    // Store email and redirect to verification page
    localStorage.setItem("userEmail", formData.businessEmail);
    localStorage.removeItem("adminRegisterData"); // ← clear saved draft
    navigate('/admin/verify-email');
  };

  // --- JSX Output ---
  return (
    <div style={{
      textAlign: 'center', padding: '50px', maxWidth: '400px',
      margin: 'auto', border: '2px solid #4b0082', borderRadius: '10px'
    }}>
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          style={{ width: '94%', padding: '10px', margin: '5px 0' }}
        />

        {/* Last Name */}
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          style={{ width: '94%', padding: '10px', margin: '5px 0' }}
        />

        {/* Business Name */}
        <input
          type="text"
          placeholder="Business name"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          required
          style={{ width: '94%', padding: '10px', margin: '5px 0' }}
        />

        {/* Business Email */}
        <input
          type="email"
          placeholder="Business email"
          name="businessEmail"
          value={formData.businessEmail}
          onChange={handleInputChange}
          required
          style={{ width: '94%', padding: '10px', margin: '5px 0' }}
        />

        {/* Duplicate Email Warning */}
        {businessEmailExists && (
          <p style={{
            color: 'red',
            fontSize: '13px',
            textAlign: 'left',
            margin: '2px 0 5px 2px'
          }}>
            This email address is already linked to an existing account.
          </p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          name="businessPassword"
          value={formData.businessPassword}
          onChange={handleInputChange}
          required
          style={{ width: '94%', padding: '10px', margin: '5px 0' }}
        />

        {/* Country Select Dropdown */}
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            margin: '5px 0',
            color: formData.country ? 'black' : 'gray'
          }}
        >
          <option value="">Where is your business registered?</option>
          <option value="USA">United States</option>
          <option value="Other">Other</option>
        </select>

        <p style={{ fontSize: '12px', color: 'black', textAlign: 'left', marginLeft: '5px', marginTop: '-2px' }}>
          If your business isn't registered, select your country of residence.
        </p>

        {/* Agreements Notice */}
        <p style={{ fontSize: '12px', margin: '10px 0' }}>
          By selecting <b>Create account</b>, you agree to our
          <a 
            href="/admin/user-agreement" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: '#4b0082', margin: '0 5px' }}
          >
            User Agreement
          </a>
          and acknowledge reading our
          <a 
            href="/admin/privacy-notice" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: '#4b0082', margin: '0 5px' }}
          >
            User Privacy Notice
          </a>  
          <span style={{ color: 'black' }}></span>
        </p>

        {/* Submit Button */}
        <button type="submit"
          style={{ width: '100%', padding: '10px', background: '#FFD700', fontWeight: 'bold' }}>
          Create account
        </button>
      </form>

      {/* Link to Login Page */}
      <p style={{ marginTop: '15px' }}>
        Already have an account? <span
          style={{ textDecoration: 'underline', cursor: 'pointer', color: '#4b0082' }}
          onClick={() => navigate('/admin/login')}>
          Sign in
        </span>
      </p>
    </div>
  );
};

export default AdminRegisterPage;
