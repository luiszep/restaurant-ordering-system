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
import SuccessPage from './pages/admin/SuccessPage';

import AdminDashboardLayout from './pages/admin/AdminDashboard/AdminDashboardLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminTablesPage from './pages/admin/AdminTablesPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';

import CustomerMenuPage from './pages/customer/CustomerMenuPage';
import CustomerCartPage from './pages/customer/CustomerCartPage';
import CustomerOrderSummaryPage from './pages/customer/CustomerOrderSummaryPage';
import CustomerTraditionalPaymentPage from './pages/customer/CustomerTraditionalPaymentPage';
import CustomerOnlinePaymentPage from './pages/customer/CustomerOnlinePaymentPage';
import CustomerPaymentSuccessPage from './pages/customer/CustomerPaymentSuccessPage';
import CustomerPaymentFailedPage from './pages/customer/CustomerPaymentFailedPage';
import CustomerReceiptPage from './pages/customer/CustomerReceiptPage';
import SessionExpiredPage from './pages/customer/SessionExpiredPage';
import ServerRequestPage from './pages/customer/ServerRequestPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public & Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/table/:tableId" element={<TablePage />} />
        <Route path="/menu/:sessionId" element={<CustomerMenuPage />} />
        <Route path="/cart" element={<CustomerCartPage />} />
        <Route path="/order-summary" element={<CustomerOrderSummaryPage />} />
        <Route path="/pay-traditional" element={<CustomerTraditionalPaymentPage />} />
        <Route path="/pay-online" element={<CustomerOnlinePaymentPage />} />
        <Route path="/payment-success" element={<CustomerPaymentSuccessPage />} />
        <Route path="/payment-failed" element={<CustomerPaymentFailedPage />} />
        <Route path="/receipt" element={<CustomerReceiptPage />} />
        <Route path="/session-expired" element={<SessionExpiredPage />} />
        <Route path="/request-help" element={<ServerRequestPage />} />

        {/* Admin Onboarding / Auth */}
        <Route path="/admin/login" element={<AdminAuthPage />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/user-agreement" element={<UserAgreementPage />} />
        <Route path="/admin/privacy-notice" element={<PrivacyNoticePage />} />
        <Route path="/admin/verify-email" element={<VerifyEmailPage />} />
        <Route path="/admin/add-phone-number" element={<AddPhoneNumberPage />} />
        <Route path="/admin/verify-phone" element={<VerifyPhonePage />} />
        <Route path="/admin/success" element={<SuccessPage />} />

        {/* Admin Dashboard Routes (Nested under Layout) */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="menu" element={<AdminMenuPage />} />
          <Route path="tables" element={<AdminTablesPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="staff" element={<AdminStaffPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
