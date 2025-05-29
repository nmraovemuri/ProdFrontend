import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useCustomerSignupMutation,
  useCustomerSignInMutation,
  useCheckEmailAlreadyExistedMutation
} from '../services/customerApi';
import { Eye, EyeOff } from 'lucide-react';
import { useAddCartdetailsMutation, useLazyGetCardDetailsByUseridQuery } from '../services/cartApi';
import { CartContext } from './CartContext';
import { toast } from 'react-toastify';

const Account = () => {
  const navigate = useNavigate();
  const [addCartFn]=useAddCartdetailsMutation()
  const { setCart } = useContext(CartContext);
  const [getAllCartDetailsFn] = useLazyGetCardDetailsByUseridQuery();

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email_id: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);
  const [emailExists, setEmailExists] = useState(false);

  const [signup] = useCustomerSignupMutation();
  const [checkEmailAlreadyExisted] = useCheckEmailAlreadyExistedMutation();
  const [signin] = useCustomerSignInMutation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleEmailBlur = async () => {
    if (!formData.email_id) return;

    try {
      const res = await checkEmailAlreadyExisted({ email_id: formData.email_id }).unwrap();
      if (res.exists) {
        setEmailExists(true);
        setMessage('Email already exists. Please use a different one.');
        setSuccess(false);
      } else {
        setEmailExists(false);
        setMessage('');
      }
    } catch (err) {
      toast.error('Something went wrong while checking email.');
      setSuccess(false);
    }
  };

  const syncCart = async (customerId) => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];

    for (const item of localCart) {
      try {
        await addCartFn({
          user_id: customerId,
          product_id: item.product_id,
          unit_id: item.unit_id,
          quantity: item.quantity || 1,
        }).unwrap();

      } catch (err) {
        console.error('Error syncing cart item:', item, err);
      }
    }

    // Clear localStorage cart after successful sync
    localStorage.removeItem('cart');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (emailExists) {
      setMessage('Email already registered.');
      setSuccess(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setSuccess(false);
      return;
    }

    try {
      await signup(formData).unwrap();
      //await syncCart(customer.customer_id);
      toast.success('Registration successful! Please check your email to verify.');
      setMessage('Registration successful! Please check your email to verify.');
      setSuccess(true);
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        email_id: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        location: '',
      });
    } catch (err) {
      setMessage('Registration failed. Please try again.');
      setSuccess(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.usernameOrEmail || !loginData.password) {
      setMessage('Please fill in both login fields.');
      setSuccess(false);
      return;
    }
    console.log("loginData", loginData)
    try {
      const res = await signin({
        email_id: loginData.usernameOrEmail,
        password: loginData.password,
      }).unwrap();

      const customer = res.customer;
      //console.log("customer", customer)
      if (customer.is_active?.data?.[0] === 1) {
        window.localStorage.setItem("token",res.token)
        window.localStorage.setItem('customer_id', customer.customer_id);
        await syncCart(customer.customer_id);
        try {
          const response = await getAllCartDetailsFn(customer.customer_id).unwrap();
          if (response?.data) {
            setCart(response.data); 
          }
        } catch (fetchErr) {
          console.error("Failed to fetch updated cart after sync:", fetchErr);
        }
        toast.success('Login successful! Redirecting...');
        setMessage('Login successful! Redirecting...');
        setSuccess(true);
        setLoginData({ usernameOrEmail: '', password: '' });
        navigate('/');
      } else {
        setMessage('Please verify your email before login.');
        setSuccess(false);
      }

    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
      setSuccess(false);
    }
  };

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          {message && !success && (
                  <div className="alert alert-danger">
                    {message}
                  </div>
                )}
          {/* Login Form */}
          <div className="col-xl-6 pe-xl-5">
            <form onSubmit={handleLogin}>
              <div className="border border-gray-100 rounded-16 px-24 py-40 h-100">
                <h6 className="text-xl mb-32">Login</h6>
                
                <div className="mb-24">
                  <label htmlFor="usernameOrEmail" className="text-lg mb-8 fw-medium">
                    Username or Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="usernameOrEmail"
                    placeholder="Enter Username or Email"
                    value={loginData.usernameOrEmail}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="mb-24">
                  <label htmlFor="password" className="text-lg mb-8 fw-medium">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={loginPasswordVisible ? 'text' : 'password'}
                      className="common-input"
                      id="password"
                      placeholder="Enter Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                      onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
                    >
                      {loginPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                <div className="mb-24 mt-48 d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-main py-18 px-40">Log in</button>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>
                </div>

                <div className="mt-48">
                  <Link to="/forgotpassword" className="text-danger-600 fw-semibold">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* Register Form */}
          <div className="col-xl-6">
            <form onSubmit={handleRegister}>
              <div className="border border-gray-100 rounded-16 px-24 py-40">
                <h6 className="text-xl mb-32">Register</h6>

                {['username', 'first_name', 'last_name', 'email_id', 'mobile'].map((field, idx) => (
                  <div className="mb-24" key={idx}>
                    <label htmlFor={field} className="text-lg mb-8 fw-medium">
                      {field.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="common-input"
                      id={field}
                      placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={field === 'email_id' ? handleEmailBlur : undefined}
                    />
                  </div>
                ))}

                <div className="mb-24">
                  <label htmlFor="password" className="text-lg mb-8 fw-medium">Password <span className="text-danger">*</span></label>
                  <div className="position-relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="common-input"
                      id="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                <div className="mb-24">
                  <label htmlFor="confirmPassword" className="text-lg mb-8 fw-medium">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      className="common-input"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                <div className="mb-24">
                  <label className="text-lg mb-8 fw-medium">Location <span className="text-danger">*</span></label>
                  <select
                    id="location"
                    className="form-select common-input"
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    <option value="Balangar">Balangar</option>
                    <option value="Chintal">Chintal</option>
                    <option value="Jagdigirigutta">Jagdigirigutta</option>
                    <option value="Pragathi Nagar">Pragathi Nagar</option>
                    <option value="Jeedimetla">Jeedimetla</option>
                    <option value="Suchitra">Suchitra</option>
                    <option value="Shapur">Shapur</option>
                    <option value="Gandi Misamma">Gandi Misamma</option>
                    <option value="Kompally">Kompally</option>
                  </select>
                </div>

                <div className="mt-24">
                  <button type="submit" className="btn btn-main w-100 py-18">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {message && (
          <div className={`alert mt-4 ${success ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Account;
