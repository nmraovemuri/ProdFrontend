import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import MyAddress from "../components/MyAddress";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";

const MyAddressPage = () => {

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
      {/* <HeaderTwo category={true} /> */}

      <MyAddress/>

      {/* ShippingTwo */}
      <ShippingOne/>

      <FooterOne/>
      <BottomFooter/>

    </>
  );
};

export default MyAddressPage;
