import React, { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import AboutUs from 'pages/AboutUs';
import ProductsByCollection from 'pages/Collection';
import ContactUs from 'pages/ContactUs';
import Dashboard from 'pages/HomePage';
import HowItWorks from 'pages/HowItWorks';
import ItemView from 'pages/Product';
import PrivacyPolicy from 'pages/Legal/PrivacyPolicy';
import TermsAndConditions from 'pages/Legal/TermsAndConditions';
import Checkout from 'pages/Checkout';
import NotFound from 'pages/NotFound';
import { ProductContextProvider } from 'context/ProductContext';
import Login from 'pages/Account/Login';
import AllCollections from 'pages/Collections';
import SignUp from 'pages/Account/SignUp';
import ResetPassword from 'pages/Account/ResetPassword';
import ForgotPassword from 'pages/Account/ForgotPassword';
import PurchaseSuccessful from 'pages/PurchaseSuccessful';
import { DrawerProvider } from 'context/DrawerContext';
import ErrorBoundary from 'components/ErrorBoundary';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <DrawerProvider>
            <MainLayout />
          </DrawerProvider>
        }
      >
        <Route
          path="home"
          element={
            <ProductContextProvider>
              <Dashboard />
            </ProductContextProvider>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route path="about" element={<AboutUs />} errorElement={<ErrorBoundary />} />
        <Route path="how-it-works" element={<HowItWorks />} errorElement={<ErrorBoundary />} />
        <Route path="collections" element={<AllCollections />} errorElement={<ErrorBoundary />} />
        <Route
          path="collections/:collection"
          element={<ProductsByCollection />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="collections/:collection/:product"
          element={
            <ProductContextProvider>
              <ItemView />
            </ProductContextProvider>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="checkout"
          element={
            <ProductContextProvider>
              <Checkout />
            </ProductContextProvider>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route path="contact-us" element={<ContactUs />} errorElement={<ErrorBoundary />} />
        <Route path="reset-password" element={<ResetPassword />} errorElement={<ErrorBoundary />} />
        <Route
          path="forgot-password"
          element={<ForgotPassword />}
          errorElement={<ErrorBoundary />}
        />
        <Route path="privacy-policy" element={<PrivacyPolicy />} errorElement={<ErrorBoundary />} />
        <Route
          path="terms-and-conditions"
          element={<TermsAndConditions />}
          errorElement={<ErrorBoundary />}
        />
        <Route path="login" element={<Login />} errorElement={<ErrorBoundary />} />
        <Route path="sign-up" element={<SignUp />} errorElement={<ErrorBoundary />} />
        <Route path="about-us" element={<AboutUs />} errorElement={<ErrorBoundary />} />
        <Route
          path="purchase-successful"
          element={<PurchaseSuccessful />}
          errorElement={<ErrorBoundary />}
        />
        <Route path="*" element={<NotFound />} errorElement={<ErrorBoundary />} />
      </Route>
    </Route>
  )
);
