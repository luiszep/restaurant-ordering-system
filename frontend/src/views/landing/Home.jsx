import { useEffect } from 'react';
import HowItWorks from './HowItWorks';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import MobileBlockMessage from '../../components/MobileBlockMessage';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <>
    <div className="hidden md:block">
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white relative pt-24"
      >
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="bg-black/90 p-10 md:p-14 rounded-xl backdrop-blur-sm shadow-2xl max-w-2xl">
            <h1 className="text-5xl font-extrabold mb-6">
              The First AI System Built for Restaurants
            </h1>
            <p className="text-xl mb-8">
              Boost efficiency, reduce errors, and elevate the guest experience — no new POS, no hardware swaps, just AI.
            </p>
            <a
              href="#get-started"
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300"
            >
              Try AgoraAI for Free
            </a>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45"></div>
        </div>
      </section>

      {/* Gradient Transition */}
      <div className="h-12 bg-gradient-to-b from-black to-gray-900" />

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="bg-gray-900 text-white py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <HowItWorks />
        </div>
      </section>

      {/* Gradient Transition */}
      <div className="h-12 bg-gradient-to-b from-gray-900 to-black" />

      {/* Final CTA Section */}
      <section
        id="get-started"
        className="py-20 bg-black text-center text-white px-4"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Free in Minutes</h2>
          <p className="text-lg text-gray-300 mb-8">
            No contracts. No risk. Just more efficient service.
          </p>
          <button
            onClick={() => navigate('/admin/register')}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-full font-semibold shadow-md transition duration-300"
          >
            Create Your Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center text-gray-500 text-sm py-6 border-t border-white/10">
      <p>&copy; {new Date().getFullYear()} The Agora Company. All rights reserved.</p>
      </footer>
    </div>

    {/* Mobile Block Message */}
    <MobileBlockMessage /> 
    </>
  );
}
