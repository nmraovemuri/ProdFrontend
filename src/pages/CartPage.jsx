import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import BottomFooter from "../components/BottomFooter";
import CartSection from "../components/CartSection";
import ShippingOne from "../components/ShippingOne";
import ScrollToTop from "react-scroll-to-top";

import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import Breadcrumb from "../components/Breadcrumb";




const CartPage = () => {



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

      <Breadcrumb title={"Cart"}/>

      {/* CartSection */}
      <CartSection /> 

     

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterOne/>

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default CartPage;
