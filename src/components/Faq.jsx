import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const Faq = () => {
  const [openPanel, setOpenPanel] = useState(null);

  const handleToggle = (panel) => {
    if (openPanel === panel) {
      setOpenPanel(null); // Close the panel if it was already open
    } else {
      setOpenPanel(panel); // Open the new panel
    }
  };

  return (
    <>
      <HeaderOne />
      {/* <section className="bg-dark inner-header">
        <div className="container">
          <div className="row">
            <img className="img-fluid" src="assets/img/slider/1.1.jpg" alt="Header" />
            {/* Uncomment the following section if you want the title */}
            {/* <div className="col-md-12 text-center">
              <h1 className="mt-0 mb-3 text-white">FAQ's</h1>
              <div className="breadcrumbs">
                <p className="mb-0 text-white">
                  <Link className="text-white" to="/home">Home</Link> / <span className="text-success">FAQ's</span>
                </p>
              </div>
            </div> */}
          {/* </div>
        </div>
      </section> */} 
      <section style={{ padding: '20px 0', backgroundColor: '#fff1e6',marginBottom: '30px' }}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-10 text-center">
        <img
          className="img-fluid"
          src="assets/img/slider/1.1.jpg"
          alt="Header"
          style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        />
      </div>
    </div>
  </div>
</section>


      <section className="faq-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center wow zoomIn">
                <h1 className="mt-0 mb-3"style={{fontSize: '2.5rem', color: '#0d102d',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif", }}>Frequently Asked Questions</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                {/* ORDER PLACEMENT */}
                <div className="panel panel-default">
                  <h5 style={{ color: '#370617',fontSize: '1.25rem',marginBottom: '.5rem', fontWeight: '500',lineHeight: '1.2',fontFamily: "'Maven Pro', sans-serif",fontWeight: 'bold' }}>ORDER PLACEMENT</h5>
                  <hr />
                  <div className="panel-heading" role="tab" id="headingOne">
                    <h4 className="panel-title">
                      <button
                        role="button"
                        className="fa fa-plus"
                        onClick={() => handleToggle('collapseOne')}
                      >
                        {openPanel === 'collapseOne' ? '-' : '+'} How can I track my order?
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseOne' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333' }}>
                        At every step of the way, you will be receiving information on the progress of your order.
                      </p>
                    </div>
                  )}
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwo">
                    <h4 className="panel-title">
                      <button
                        className="collapsed"
                        onClick={() => handleToggle('collapseTwo')}
                      >
                        {openPanel === 'collapseTwo' ? '-' : '+'} How do I place orders with Aswikamart?
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseTwo' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333',fontSize: '1.25rem' }}>
                        In 4 simple steps, you can place your orders with us.<br />
                        • Browse through our categories.<br />
                        • Add products to the shopping bag.<br />
                        • Register with your email, address, and contact details.<br />
                        • Confirm and Pay for the orders.
                      </p>
                    </div>
                  )}
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingThree">
                    <h4 className="panel-title">
                      <button
                        className="collapsed"
                        onClick={() => handleToggle('collapseThree')}
                      >
                        {openPanel === 'collapseThree' ? '-' : '+'} Why is the registration necessary?
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseThree' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333' }}>
                        We recommend you register with us with your contact details as that makes it easier to keep track of all your activities on Aswikamart. It also enables us to keep you informed about new offers and deals as our valued customer.
                      </p>
                    </div>
                  )}
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFour">
                    <h4 className="panel-title">
                      <button
                        className="collapsed"
                        onClick={() => handleToggle('collapseFour')}
                      >
                        {openPanel === 'collapseFour' ? '-' : '+'} How do I know that my order is confirmed?
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseFour' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333' }}>
                        When you successfully pay for your order at checkout, you will be taken to an order confirmation page where you will see your order details as well as your order ID. You will also receive a confirmation email from our end right after.
                      </p>
                    </div>
                  )}
                </div>

                {/* PAYMENTS */}
                <h5 style={{ color: '#370617',fontSize: '1.25rem',marginBottom: '.5rem', fontWeight: '500',lineHeight: '1.2',fontFamily: "'Maven Pro', sans-serif",fontWeight: 'bold' }}>PAYMENTS</h5>
                <hr />
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFive">
                    <h4 className="panel-title">
                      <button
                        className="collapsed"
                        onClick={() => handleToggle('collapseFive')}
                      >
                        {openPanel === 'collapseFive' ? '-' : '+'} How do I pay for my orders?
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseFive' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333' }}>
                        We have different gateways for your convenience where you can pay through any online payment options.
                      </p>
                    </div>
                  )}
                </div>

                {/* REFUND */}
                <h5 style={{ color: '#370617',fontSize: '1.25rem',marginBottom: '.5rem', fontWeight: '500',lineHeight: '1.2',fontFamily: "'Maven Pro', sans-serif",fontWeight: 'bold' }}>REFUND</h5>
                <hr />
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSix">
                    <h4 className="panel-title">
                      <button
                        className="collapsed"
                        onClick={() => handleToggle('collapseSix')}
                      >
                        {openPanel === 'collapseSix' ? '-' : '+'} How do I receive a refund?
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseSix' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333' }}>
                        If there is a product that is out of stock or not available at the moment due to unavoidable circumstances, the amount for the product will be refunded to your Aswikamart Wallet.
                      </p>
                    </div>
                  )}
                </div>

                {/* MODIFICATION OF ORDER */}
                <h5 style={{ color: '#370617',fontSize: '1.25rem',marginBottom: '.5rem', fontWeight: '500',lineHeight: '1.2',fontFamily: "'Maven Pro', sans-serif",fontWeight: 'bold' }}>MODIFICATION OF ORDER</h5>
                <hr />
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSeven">
                    <h4 className="panel-title">
                      <button
                        className="collapsed"
                        onClick={() => handleToggle('collapseSeven')}
                      >
                        {openPanel === 'collapseSeven' ? '-' : '+'} Can the shipping address be modified after placing the order?
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseSeven' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333' }}>
                        You can modify your shipping address before we start packaging your order. You can do that by clicking “Change Address” under the “My Order” section.
                      </p>
                    </div>
                  )}
                </div>

                {/* SHIPPING CHARGES */}
                <h5 style={{ color: '#370617',fontSize: '1.25rem',marginBottom: '.5rem', fontWeight: '500',lineHeight: '1.2',fontFamily: "'Maven Pro', sans-serif",fontWeight: 'bold' }}>SHIPPING CHARGES</h5>
                <hr />
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingEight">
                    <h4 className="panel-title">
                      <button
                        className="collapsed"
                        onClick={() => handleToggle('collapseEight')}
                      >
                        {openPanel === 'collapseEight' ? '-' : '+'} Shipping / Delivery Charges
                      </button>
                    </h4>
                  </div>
                  {openPanel === 'collapseEight' && (
                    <div className="panel-body">
                      <p style={{ fontSize: 15, lineHeight: '22px', color: '#333' }}>
                        For the benefit of our valued customers here are the revised Shipping Charges:<br />
                        • Orders from Rs. 500/- to below Rs. 999/- -- Rs. 49/-<br />
                        • Orders of Rs. 1000/- and above - FREE.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div> {/* END COL */}
          </div> {/* END ROW */}
        </div>
      </section>

     

      <section>
        <FooterOne />
      </section>

     
    </>
  );
};

export default Faq;