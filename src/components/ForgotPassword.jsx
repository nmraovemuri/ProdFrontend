import React, { useState } from 'react';
import { useCustomerForgotPasswordMutation } from '../services/customerApi'; // adjust the path if needed

const ForgotPassword = () => {
  const [email_id, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [customerForgotPassword] = useCustomerForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerForgotPassword({ email_id }).unwrap(); // pass as an object if your API expects it
      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      setMessage('Error sending password reset email.');
    }
  };

  return (
    <>
      
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '30px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px',fontSize: '25px' }}>Forgot Password</h3>
          {message && <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email_id">Email:</label>
            <input
              id="email_id"
              type="email"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FF6F00',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default ForgotPassword;
