import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomerResetPasswordMutation } from '../services/customerApi';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const { customer_id } = useParams(); // Getting customer_id from the URL params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible,setNewPasswordVisible]=useState(false)
  const [confirmPasswordVisible,setConfirmPasswordVisible]=useState(false)
  const [error, setError] = useState('');
  const [customerResetPassword, { isLoading }] = useCustomerResetPasswordMutation();
  var navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
  
    if (newPassword.length < 6 || newPassword.length > 8) {
      setError('Password must be 6 to 8 characters');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    console.log("Customer ID:", customer_id);
    console.log("Payload:", { customer_id, new_password: newPassword, confirmpassword: confirmPassword });
  
    try {
      await customerResetPassword({
        customer_id,
        new_password: newPassword,
        confirmpassword: confirmPassword,
      }).unwrap();
      toast.success("Password reset successfully!")
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setTimeout(() => {
          navigate('/account');
        }, 2000);
    } catch (err) {
      console.error('Error response:', err);
      setError(err.data?.message || 'Something went wrong');
    }
  }; 
  
  return (
    <>
     
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
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '25px' }}>
            Reset Password
          </h3>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>New Password:</label>
            <div className="position-relative">
            <input
              type={newPasswordVisible ? 'text' : 'password'}
              value={newPassword}
              className="common-input"
              id="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
             <span
                className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                 onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              >
               {newPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <label>Confirm Password:</label>
            <div className="position-relative">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              className="common-input"
              id="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              
            />
            <span
                className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                 onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
               {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
              <br/>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#FF6F00',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
     
    </>
  );
};

export default ResetPassword;
