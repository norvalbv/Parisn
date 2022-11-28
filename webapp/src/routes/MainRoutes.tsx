import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import AboutUs from '../pages/AboutUs';
import ProductsByCollection from '../pages/Products/ProductsByCollection';
import ContactUs from '../pages/ContactUs';
import Dashboard from '../pages/Dashboard';
import HowItWorks from '../pages/HowItWorks';
import ItemView from '../pages/Products/ItemView';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import TermsAndConditions from '../pages/Legal/TermsAndConditions';
import Checkout from '../pages/Checkout';
import NotFound from '../pages/NotFound';
import { ProductContextProvider } from '../context/ProductContext';
import Login from '../pages/Account/Login';
import MyAccount from '../pages/Account/MyAccount';
import AllCollections from '../pages/Products/AllCollections';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="home" element={<Dashboard />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="how-it-works" element={<HowItWorks />} />
      <Route path="collections" element={<AllCollections />} />
      <Route path="collections/:category" element={<ProductsByCollection />} />
      <Route
        path="/collections/:category/:product"
        element={
          <ProductContextProvider>
            <ItemView />
          </ProductContextProvider>
        }
      />
      <Route
        path="checkout"
        element={
          <ProductContextProvider>
            <Checkout />
          </ProductContextProvider>
        }
      />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="login" element={<Login />} />
      <Route path="my-account" element={<MyAccount />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
