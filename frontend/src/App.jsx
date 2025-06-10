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

// Admin Dashboard
import AdminDashboardPage from './views/admin/dashboard/AdminDashboardPage.jsx';

// Restaurant Subdashboard Layout + Pages
import RestaurantDashboardLayout from './views/admin/restaurantDashboard/RestaurantDashboardLayout';
import KDSPage from './views/admin/kds';
import OrdersPage from './views/admin/orders';
import MenuPage from './views/admin/menu/MenuPage';
import TransactionsPage from './views/admin/transactions';
import ReportsPage from './views/admin/reports';
import TimerPage from './views/admin/timer';
import TablesPage from './views/admin/tables';
import PromotionsPage from './views/admin/promotions';
import SettingsPage from './views/admin/settings';

// Customer Pages
import CustomerLandingPage from './views/customer/landing/CustomerLandingPage';
import CustomerMenuPage from './views/customer/menu/CustomerMenuPage';
import CustomerHostessPage from './views/customer/landing/CustomerHostessPage.jsx';

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

        {/* Admin Dashboard Home */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Restaurant Subdashboard Layout with Nested Routes */}
        <Route path="/admin/restaurant/:id" element={<RestaurantDashboardLayout />}>
          <Route index element={<KDSPage />} />
          <Route path="kds" element={<KDSPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="timer" element={<TimerPage />} />
          <Route path="tables" element={<TablesPage />} />
          <Route path="promotions" element={<PromotionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Customer Pages */}     
        <Route path="/customer/:id/hostess" element={<CustomerHostessPage />} />
        <Route path="/customer/:id/landing" element={<CustomerLandingPage />} />
        <Route path="/customer/:id/menu" element={<CustomerMenuPage />} />
      </Routes>
    </Router>
  );
}
