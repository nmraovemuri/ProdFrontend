import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import SearchSection from "../components/SearchSection";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";

const SearchPage = () => {

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
     
      {/* searchsection */}
      <SearchSection/>

      {/* ShippingTwo */}
      <ShippingOne/>

      {/* FooterTwo */}
      {/* <FooterTwo /> */}
      <FooterOne/>
      <BottomFooter/>

    </>
  );
};

export default SearchPage;
