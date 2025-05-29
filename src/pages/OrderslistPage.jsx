import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import OrderList from "../components/OrderList";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";

function OrderslistPage() {
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
    
          <OrderList/>
    
          {/* ShippingTwo */}
          <ShippingOne/>
    
          {/* FooterTwo */}
          {/* <FooterTwo /> */}
          <FooterOne/>
          <BottomFooter/>
    </>
  )
}

export default OrderslistPage
