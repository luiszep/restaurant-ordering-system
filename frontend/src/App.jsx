import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TablePage from './pages/table/TablePage';
import AdminAuthPage from './pages/admin/AdminAuthPage';
import ForgotPasswordPage from './pages/admin/ForgotPasswordPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import Home from './pages/Home';
import UserAgreementPage from './pages/admin/UserAgreementPage';
import PrivacyNoticePage from './pages/admin/PrivacyNoticePage';
import VerifyEmailPage from './pages/admin/VerifyEmailPage';
import AddPhoneNumberPage from './pages/admin/AddPhoneNumberPage';
import VerifyPhonePage from './pages/admin/VerifyPhonePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminTablesPage from './pages/admin/AdminTablesPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';

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
        <Route path="/admin/add-phone-number" element={<AddPhoneNumberPage />} />
        <Route path="/admin/verify-phone" element={<VerifyPhonePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/menu" element={<AdminMenuPage />} />
        <Route path="/admin/tables" element={<AdminTablesPage />} />
        <Route path="/admin/payments" element={<AdminPaymentsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/staff" element={<AdminStaffPage />} />
      </Routes>
    </Router>
  );
}

export default App;
