import React, { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import AboutUs from 'pages/AboutUs';
import ProductsByCollection from 'pages/Products/ProductsByCollection';
import ContactUs from 'pages/ContactUs';
import Dashboard from 'pages/HomePage';
import HowItWorks from 'pages/HowItWorks';
import ItemView from 'pages/Products/ItemView';
import PrivacyPolicy from 'pages/Legal/PrivacyPolicy';
import TermsAndConditions from 'pages/Legal/TermsAndConditions';
import Checkout from 'pages/Checkout';
import NotFound from 'pages/NotFound';
import { ProductContextProvider } from 'context/ProductContext';
import Login from 'pages/Account/Login';
import AllCollections from 'pages/Products/AllCollections';
import SignUp from 'pages/Account/SignUp';
import ResetPassword from 'pages/Account/ResetPassword';
import ForgotPassword from 'pages/Account/ForgotPassword';
import HomePage from 'layout/HomePage/HomePage';
import PurchaseSuccessful from 'pages/PurchaseSuccessful';
import { DrawerProvider } from 'context/DrawerContext';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path="/"
        element={
          <DrawerProvider>
            <HomePage />
          </DrawerProvider>
        }
      >
        <Route path="home" element={<Dashboard />} />
      </Route>
      <Route
        path="/"
        element={
          <DrawerProvider>
            <MainLayout />
          </DrawerProvider>
        }
      >
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
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="purchase-successful" element={<PurchaseSuccessful />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);
