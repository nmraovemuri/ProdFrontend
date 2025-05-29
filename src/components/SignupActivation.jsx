import React from 'react';
import { useCustomerSignupActivateQuery } from '../services/customerApi';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const SignupActivation = () => {
  // Trigger email activation (API call)
  useCustomerSignupActivateQuery();

  return (
    <>
      <HeaderOne />
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <h3
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '25px',
              color: '#28a745',
            }}
          >
            Email Verified!
          </h3>

          <p style={{ textAlign: 'center', fontSize: '16px' }}>
            Your email has been successfully activated with ASM.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{ width: '100px', margin: '20px 0' }}
              src="/assets/img/smile.png"
              alt="Success"
            />
          </div>

          <p style={{ textAlign: 'center', fontSize: '15px', fontWeight: 500 }}>
            You can now login and start using our services.
          </p>

          <a
            href="/account"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              padding: '10px',
              marginTop: '10px',
              backgroundColor: '#FF6F00',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Go to Login
          </a>
        </div>
      </div>
      <FooterOne />
    </>
  );
};

export default SignupActivation;
