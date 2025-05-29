import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import MyProfile from "../components/MyProfile";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";

const MyProfilePage = () => {

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

      <MyProfile/>

      {/* ShippingTwo */}
      <ShippingOne/>

      
      <FooterOne/>

      <BottomFooter/>
    </>
  );
};

export default MyProfilePage;
