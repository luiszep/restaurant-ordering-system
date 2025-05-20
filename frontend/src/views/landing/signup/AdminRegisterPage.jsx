import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    businessEmail: '',
    businessPassword: '',
    country: '',
  });

  const [businessEmailExists, setBusinessEmailExists] = useState(false);
  const navigate = useNavigate();

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem('adminRegisterData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // Input change handler with autosave
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    localStorage.setItem('adminRegisterData', JSON.stringify(updatedForm));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setBusinessEmailExists(false);

    if (formData.businessEmail === "test@example.com") {
      setBusinessEmailExists(true);
      return;
    }

    console.log("Registering business:", formData);
    localStorage.setItem("userEmail", formData.businessEmail);
    localStorage.removeItem("adminRegisterData");
    navigate('/admin/verify-email');
  };

  return (
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="businessName"
            placeholder="Business name"
            value={formData.businessName}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="businessEmail"
            placeholder="Business email"
            value={formData.businessEmail}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {businessEmailExists && (
            <p className="text-red-500 text-sm text-left -mt-2">
              This email address is already linked to an existing account.
            </p>
          )}

          <input
            type="password"
            name="businessPassword"
            placeholder="Password"
            value={formData.businessPassword}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Where is your business registered?</option>
            <option value="USA">United States</option>
            <option value="Other">Other</option>
          </select>

          <p className="text-xs text-gray-300 -mt-2">
            If your business isn't registered, select your country of residence.
          </p>

          <p className="text-xs text-gray-400 mt-2 text-left">
            By selecting <b className="text-white">Create account</b>, you agree to our{" "}
            <a
              href="/admin/user-agreement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline"
            >
              User Agreement
            </a>{" "}
            and acknowledge reading our{" "}
            <a
              href="/admin/privacy-notice"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline"
            >
              User Privacy Notice
            </a>.
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Create account
          </button>
        </form>

        <p className="text-sm text-center text-gray-300">
          Already have an account?{" "}
          <button
            onClick={() => navigate('/admin/login')}
            className="text-green-400 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
