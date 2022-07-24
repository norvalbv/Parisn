import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import AboutUs from '../pages/AboutUs';
import Catalogue from '../pages/Catalogue';
import ContactUs from '../pages/ContactUs';
import Dashboard from '../pages/Dashboard';
import HowItWorks from '../pages/HowItWorks';
import ItemView from '../pages/ItemView';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import TermsAndConditions from '../pages/Legal/TermsAndConditions';

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
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
