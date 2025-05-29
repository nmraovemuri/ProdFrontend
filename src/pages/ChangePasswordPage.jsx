import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import ChangePassword from "../components/ChangePassword";
import FooterOne from "../components/FooterOne";




const ChangePasswordPage = () => {



  return (
    <>
      {/* ColorInit */}
      <ColorInit color={false} /> 

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}

      <HeaderOne/>

      {/* Change Password */}
      <ChangePassword/>



      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterOne/>

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default ChangePasswordPage;
