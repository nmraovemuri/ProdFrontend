import React from "react";
import Preloader from "../helper/Preloader";
import ShopSection from "../components/ShopSection";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";


const ShopPage = () => {

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


      {/* ShopSection */}
      <ShopSection />

      {/* ShippingTwo */}
      <ShippingOne/>

      
      <FooterOne/>

      <BottomFooter/>



    </>
  );
};

export default ShopPage;
