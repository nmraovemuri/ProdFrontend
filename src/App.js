import React from "react";
import { Outlet } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
    <>
      <RouteScrollToTop />
      <PhosphorIconInit />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeButton={false} />
        <Outlet/>
   </>
  );
}

export default App;
