import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Pages
import Home from './views/landing/Home.jsx';

// Login
import AdminAuthPage from './views/landing/login/AdminAuthPage.jsx';
import ForgotPasswordPage from './views/landing/login/ForgotPasswordPage.jsx';

// Signup Flow
import AdminRegisterPage from './views/landing/signup/AdminRegisterPage.jsx';
import UserAgreementPage from './views/landing/signup/UserAgreementPage.jsx';
import PrivacyNoticePage from './views/landing/signup/PrivacyNoticePage.jsx';
import VerifyEmailPage from './views/landing/signup/VerifyEmailPage.jsx';
import AddPhoneNumberPage from './views/landing/signup/AddPhoneNumberPage.jsx';
import VerifyPhonePage from './views/landing/signup/VerifyPhonePage.jsx';
import SuccessPage from './views/landing/signup/SuccessPage.jsx';

//Admin Dashboard
import AdminDashboardPage from './views/admin/AdminDashboardPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/admin/login" element={<AdminAuthPage />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

        {/* Signup Flow */}
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/user-agreement" element={<UserAgreementPage />} />
        <Route path="/admin/privacy-notice" element={<PrivacyNoticePage />} />
        <Route path="/admin/verify-email" element={<VerifyEmailPage />} />
        <Route path="/admin/add-phone-number" element={<AddPhoneNumberPage />} />
        <Route path="/admin/verify-phone" element={<VerifyPhonePage />} />
        <Route path="/admin/success" element={<SuccessPage />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
}
