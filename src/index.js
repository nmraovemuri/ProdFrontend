import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'select2/dist/js/select2.min.js';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePageOne from "./pages/HomePageOne";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import SearchPage from "./pages/SearchPage";
import { CartProvider } from "./components/CartContext";
import MyProfilePage from "./pages/MyProfilePage";
import MyAddressPage from "./pages/MyAddressPage";
import OrderslistPage from "./pages/OrderslistPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Faq from "./components/Faq";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import RefundPolicy from "./components/RefundPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/",
        element: <HomePageOne></HomePageOne>,
      },
      {
        path: "/shop/:category/:subcategory/:id",
        element: <ShopPage></ShopPage>,
      },
      {
        path: "/search/:serachstring",
        element: <SearchPage/>,
      },
      {
        path: "/product-details/:id/:unit_id",
        element: <ProductDetailsPageOne></ProductDetailsPageOne>,
      },
      {
        path: "/cart",
        element: <CartPage/>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage/>,
      },
      {
        path: "/account",
        element: <AccountPage/>,
      },
      {
        path: "/my-profile",
        element: <MyProfilePage/>,
      },
      {
        path: "/my-address",
        element: <MyAddressPage/>,
      },
      {
        path: "/orderlist",
        element: <OrderslistPage/>,
      },
      {
        path: "/changepassword",
        element: <ChangePasswordPage/>,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPasswordPage/>,
      },
      {
        path: "/customer_reset_password/:customer_id",
        element: <ResetPasswordPage/>,
      },
      {
        path: "/faq",
        element: <Faq/>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy/>,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions/>,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy/>,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CartProvider>
       <RouterProvider router={router} />
    </CartProvider>
    </Provider>,
);

reportWebVitals();
