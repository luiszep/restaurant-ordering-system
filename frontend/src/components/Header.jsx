import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-green-400 tracking-tight">
          The Agora Company
        </div>

        {/* Navigation */}
        <nav className="space-x-6 text-white font-medium text-sm md:text-base">
          <a href="#home" className="hover:text-green-400 transition">Home</a>
          <a href="#how-it-works" className="hover:text-green-400 transition">How It Works</a>
          <a href="#get-started" className="hover:text-green-400 transition">Get Started</a>
          <button
            onClick={() => navigate('/admin/login')}
            className="hover:text-green-400 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/admin/register')}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-full transition"
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
}
