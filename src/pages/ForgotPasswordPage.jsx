import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import ForgotPassword from "../components/ForgotPassword";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";

function ForgotPasswordPage() {
  return (
    <>
    {/* ColorInit */}
          <ColorInit color={false} />
    
          {/* ScrollToTop */}
          <ScrollToTop smooth color="#299E60" />
    
          {/* Preloader */}
          <Preloader />
     
          {/* HeaderOne */} 
          <HeaderOne/>
    
         <ForgotPassword/>
          {/* ShippingTwo */}
          <ShippingOne/>
    
          <FooterOne/>
          <BottomFooter/>
    </>
  )
}

export default ForgotPasswordPage
