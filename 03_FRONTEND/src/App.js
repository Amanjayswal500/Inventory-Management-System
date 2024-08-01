// App.js
import React from 'react';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';

// Internal Component Imports
import SignIn from './components/unprotected/SignIn';
import Reset from './components/unprotected/Reset';
import Confirm from './components/unprotected/Confirm';
import SignUp from './components/unprotected/SignUp';
import Dashboard from './components/protected/Dashboard';
import AdminDashboard from './components/protected/AdminDashboard';
import ForgotPassword from './components/unprotected/ForgotPassword';
import EmailNotification from './components/unprotected/EmailNotification';
import Faq from './components/protected/Faq';
import NotFound from './components/unprotected/NotFound';
import RegConfig from './components/unprotected/RegConfig';
import Search from './components/protected/Search';
import ProductList from './components/protected/ProductList';
import TransactionHistory from './components/protected/TransactionHistory';
import ProductDetail from './components/protected/ProductDetail';
import Checkout from './components/protected/Checkout';
import OrderSummary from './components/protected/OrderSummary';
import ManageProduct from './components/protected/ManageProduct';
import Reports from './components/protected/Reports';
import PrivateRoute from './components/protected/PrivateRoute';
import PublicRoute from './components/unprotected/PublicRoute';
import AdminRoute
 from './components/protected/AdminRoute';
import Footer from './components/protected/Footer';
import Aboutus from './components/protected/Aboutus';
import Privacypolicy from './components/protected/Privacypolicy';
import TermsCondition from './components/protected/TermsCondition';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    {/* Public Routes */}
    <Route element={<PublicRoute />}>
      <Route index element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reg_config" element={<RegConfig />} />
      <Route path="/confirm-email" element={<Confirm />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/email_notification" element={<EmailNotification />} />
        <Route path="/reset" element={<Reset />} />
    </Route>

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search_product" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/history" element={<TransactionHistory />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/product_list" element={<ProductList />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Privacypolicy" element={<Privacypolicy />} />
        <Route path="/TermsCondition" element={<TermsCondition />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/admin_product" element={<ManageProduct />} />
      </Route>

      {/* Wildcard Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <div>
      <ConditionalFooter/>
    </div>
    </BrowserRouter>
  );
};

const ConditionalFooter=()=>{
  const location=useLocation();
  const showFooter=['/order-summary','/admin_product','/history','/checkout','/reports','/Faq'].includes(location.pathname);
  return showFooter ? <Footer/>: null ;
}

export default App;
