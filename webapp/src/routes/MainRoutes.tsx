import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import AboutUs from '../pages/AboutUs';
import Catalogue from '../pages/Products/Catalogue';
import ContactUs from '../pages/ContactUs';
import Dashboard from '../pages/Dashboard';
import HowItWorks from '../pages/HowItWorks';
import ItemView from '../pages/Products/ItemView';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import TermsAndConditions from '../pages/Legal/TermsAndConditions';
import Checkout from '../pages/Checkout';
import NotFound from '../pages/NotFound';

const MainRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') navigate('/home');
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="shop-item" element={<ItemView />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
