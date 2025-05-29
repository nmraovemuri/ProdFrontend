import React from "react";
import Preloader from "../helper/Preloader";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import Account from "../components/Account";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";


const AccountPage = () => {



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


      {/* Account */}
      <Account />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterOne/>

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default AccountPage;
