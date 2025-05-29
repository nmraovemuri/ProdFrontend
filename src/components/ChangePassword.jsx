import React, { useState } from 'react';
import { useCustomerChangePasswordMutation } from '../services/customerApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePassword() { 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  var navigate=useNavigate()
  const [changePassword] = useCustomerChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 8) {
      setError("Password must be 6 to 8 characters.");
      return;
    }

    const customer_id = localStorage.getItem('customer_id');
    if (!customer_id) {
      alert("Customer not found. Please log in again.");
      return;
    }

    const payload = {
      customer_id,
      old_password: oldPassword,
      new_password: newPassword
    };

    try {
      const response = await changePassword(payload).unwrap();
      if (response.status === 'success') {
        //alert("Password changed successfully!");
        toast.success("Password changed successfully!");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(response.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      if (error.data?.field === 'old_password') {
        setError(error.data.message || "Old password is incorrect.");
      } else {
        setError("Error changing password.");
      }
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
        //   backgroundColor: '#f9f9f9',
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
            // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '25px' }}>
            Change Password
          </h3>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Old Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Enter old password"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />

            <label>New Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              minLength={6}
              maxLength={8}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />

            <label>Confirm Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />

            <div style={{ marginBottom: '15px' }}>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" style={{ marginLeft: '8px' }}>
                Show Password
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgb(41, 158, 96)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
}

export default ChangePassword;