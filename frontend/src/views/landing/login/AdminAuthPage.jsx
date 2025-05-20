import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthPage = () => {
  const [isLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctEmail = "test@example.com";
  const correctPhone = "1234567890";
  const correctPassword = "Password123";

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setIsPhone(/^\d*$/.test(val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const isValidUser =
      ((isPhone && email === correctPhone) || (!isPhone && email === correctEmail)) &&
      password === correctPassword;

    if (isValidUser) {
      console.log("Logging in...");
      navigate('/admin/dashboard');
    } else {
      console.log("Authentication failed.");
      setError("The entered email/phone number or password is incorrect. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={isPhone ? "tel" : "email"}
            placeholder="Email or mobile phone number"
            value={email}
            onChange={handleEmailChange}
            required
            pattern={isPhone ? "\\d{10,13}" : undefined}
            minLength={isPhone ? 10 : undefined}
            maxLength={isPhone ? 13 : undefined}
            title={
              isPhone
                ? "Please enter a 10-13 digit phone number."
                : "Please enter a valid email address."
            }
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate('/admin/forgot-password')}
                className="text-green-400 text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition duration-300"
          >
            {isLogin ? "Sign in" : "Register"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() =>
              isLogin ? navigate('/admin/register') : navigate('/admin/login')
            }
            className="ml-2 text-green-400 hover:underline"
          >
            {isLogin ? "Register now" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminAuthPage;
