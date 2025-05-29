

import React from 'react';
import { Link } from 'react-router-dom';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const RefundPolicy = () => {
  return (
    <>
      <HeaderOne />

      {/* Inner Header */}
      <section
  className="section-padding inner-header"
  style={{ backgroundColor: '#fff1e6',marginBottom: '30px',padding: '20px 0', }}
>
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <h1
          className="mt-0 mb-3"style={{fontSize: '24px', fontWeight: 'bold',color: '#0d102d', }}>
          Refund & Policy
        </h1>
        <div className="breadcrumbs">
          <p className="mb-0" style={{ color: '#0d102d' }}>
            <Link to="/" style={{ color: '#e96125',fontWeight: 'bold' }}>Home</Link> 
            <span style={{ margin: '0 6px', fontWeight: 'bold' }}>{'>>'}</span>
            <span style={{ color: '#e96125',fontWeight: 'bold' }}> Refund & Policy</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* End Inner Header */}

      {/* About */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 pl-12 pr-6">
            


<h5 className="mt-2" style={{ fontWeight: 500, color: '#e96125',  fontSize: '1.25rem' }}>
Returns and Refund Policy:
</h5>


              <p style={{color: '#333', fontSize: '14px',textAlign: 'justify',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif",marginBottom: '16px',lineHeight: '22px'}}>
              Thank you for purchasing at any of our Aswikamart mobile app or through our online marketplace.
              </p>

              <h5 className="mt-2" style={{ fontWeight: 500, color: '#e96125',fontSize: '1.25rem'  }}>Returns:</h5>
              <p style={{color: '#333', fontSize: '14px',textAlign: 'justify',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif",marginBottom: '16px',lineHeight: '22px'
  }}>
               You have 7 number of days to return an item from the date that you purchase it. To be eligible for a return here at aswikamart, the product that you purchased must be unused, still in its original packaging, and in the same condition as when you purchased it. We also require the original receipt or proof of purchase to be eligible for a return.
              </p>

              <h5 className="mt-2" style={{ fontWeight: 500, color: '#e96125',fontSize: '1.25rem'  }}>Note:</h5>
              <p style={{color: '#333', fontSize: '14px',textAlign: 'justify',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif",marginBottom: '16px',lineHeight: '22px'
  }}>
               Due to the nature of our business, several types of goods are exempt from being returned. Perishable goods such as Fruits, vegetables, food, flowers, products that are intimate or sanitary goods, hazardous materials, flammable liquids or gases and similar products. Certain other non-returnable products are Gift cards, free offer products and certain health/ personal care products.
              </p>

              <h5 className="mt-2" style={{ fontWeight: 500, color: '#e96125',fontSize: '1.25rem'  }}>Refunds:</h5>
              <p style={{color: '#333', fontSize: '14px',textAlign: 'justify',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif",marginBottom: '16px',lineHeight: '22px'}}>
              Once we have received your purchased product, we will let you know that we’ve received it and that we are in the process of evaluating if it’s in the same condition as when it was delivered to you. We will let you know the status of your refund as soon as we have finished inspecting your purchased product. If we approve your refund, we will refund it to Aswika Wallet of your respective account. Only regular priced products may be refunded, products purchased under “Sale” can’t be refunded.
              </p>

              <h5 className="mt-2" style={{ fontWeight: 500, color: '#e96125',fontSize: '1.25rem'  }}>Cancellation:</h5>
              <p style={{color: '#333', fontSize: '14px',textAlign: 'justify',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif",marginBottom: '16px',lineHeight: '22px'}}>
              If you have purchased through our online marketplace, if your refund is approved, then your refund will be processed, and a credit will automatically be applied to your Aswika wallet, within 7 days.
              </p>

              <h5 className="mt-2" style={{ fontWeight: 500, color: '#e96125',fontSize: '1.25rem'  }}>Exchanges (if applicable):</h5>
              <p style={{color: '#333', fontSize: '14px',textAlign: 'justify',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif",marginBottom: '16px',lineHeight: '22px'}}>
              We only replace products when they are defective or damaged at the time of purchase. If you need to exchange it for the same product, send us an email at customersupport@aswikamart.com
              </p>
              <h5 className="mt-2" style={{ fontWeight: 500, color: '#e96125',fontSize: '1.25rem'  }}>Shipping:</h5>
              <p style={{color: '#333', fontSize: '14px',textAlign: 'justify',fontWeight: 500,fontFamily: "'Maven Pro', sans-serif",marginBottom: '16px',lineHeight: '22px'}}>
              You will be responsible for paying the costs of shipping or bring back your purchased product back to us. The costs of shipping are non-refundable and non-negotiable. If you are issued a refund, the cost of shipping will be deducted from it. If you have any further question regarding your refund, please, don’t hesitate to contact us to find out more at customersupport@aswikamart.com
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <section>
        <FooterOne />
      </section>

     
    </>
  );
};

export default RefundPolicy