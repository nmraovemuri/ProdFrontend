import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BannerOne from "../components/BannerOne";
import FeatureOne from "../components/FeatureOne";
import FlashSalesOne from "../components/FlashSalesOne";
import BrandOne from "../components/BrandOne";
import NewArrivalOne from "../components/NewArrivalOne";
import ShippingOne from "../components/ShippingOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";

import TopProductSalesOne from "../components/TopProductSalesOne";
import TopProductSalesTwo from "../components/TopProductSalesTwo";

const HomePageOne = () => {

  return (

    <>

      {/* Preloader */}
      <Preloader />

      {/* ScrollToTop */}

      <ScrollToTop smooth color="#299E60" />


      {/* ColorInit */}
      <ColorInit color={false} />

      {/* HeaderOne */}
      <HeaderOne />

      {/* BannerOne */}
      <BannerOne />

      {/* FeatureOne */}

      <FeatureOne />

     

      {/* FlashSalesOne */}
      <FlashSalesOne />


      {/* 50%sales */}
       <TopProductSalesOne /> 

       {/* 30%sales */}
       <TopProductSalesTwo /> 

    

      {/* BrandOne */}
      <BrandOne />

      {/* NewArrivalOne */}
      <NewArrivalOne />

      {/* ShippingOne */}
      <ShippingOne />


      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />


    </> 
  );
};

export default HomePageOne;
