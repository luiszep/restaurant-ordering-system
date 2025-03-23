import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TablePage from './pages/table/TablePage';
import AdminAuthPage from './pages/admin/AdminAuthPage';
import ForgotPasswordPage from './pages/admin/ForgotPasswordPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import Home from './pages/Home';
import UserAgreementPage from './pages/admin/UserAgreementPage';
import PrivacyNoticePage from './pages/admin/PrivacyNoticePage';
import VerifyEmailPage from './pages/admin/VerifyEmailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:tableId" element={<TablePage />} />
        <Route path="/admin/login" element={<AdminAuthPage />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/user-agreement" element={<UserAgreementPage />} />
        <Route path="/admin/privacy-notice" element={<PrivacyNoticePage />} />
        <Route path="/admin/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
