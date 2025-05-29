import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCustomerDetailsByIdQuery, useGetCustomerShippingAddressQuery, useUpdateCustomerAddressMutation } from '../services/customerApi';
import { Modal } from 'bootstrap';
import { CartContext } from './CartContext';
import { useOrderSubmitDataMutation } from '../services/ordersApi';
import { toast } from 'react-toastify';
import { useDeleteCartByUserIdMutation } from '../services/cartApi';

const Checkout = () => {
  var navigate=useNavigate()
  const [selectedPayment, setSelectedPayment] = useState("payment1");
  const customer_id = localStorage.getItem('customer_id');
  var {cart,clearCart}=useContext(CartContext)
  const [customerAddress, setCustomerAddress] = useState({
      first_name: '',
      last_name: '',
      email_id: '',
      mobile: '',
      addr_field1: '',
      addr_field2: '',
      addr_field3: '',
      addr_field4: '',
      addr_field5: '',
      addr_field6: '', 
      pin_code: '',
    });
  
    const [tempCustomerAddress, setTempCustomerAddress] = useState({ ...customerAddress });
  var{isLoading:isLoadingAddress,data:addressdata,refetch: refetchAddress}=useGetCustomerShippingAddressQuery(customer_id)
   const [updateCustomerAddress] = useUpdateCustomerAddressMutation();
   var [orderSubmitFn]=useOrderSubmitDataMutation()
   var [deleteAllCartFn]=useDeleteCartByUserIdMutation()
  //console.log("addressdata",addressdata)
  useEffect(() => {
    
      if (addressdata?.customer_address) {
        setCustomerAddress(prev => ({
          ...prev,
          ...addressdata.customer_address
        }));
    
        setTempCustomerAddress(prev => ({
          ...prev,
          ...addressdata.customer_address
        }));
      }
    
      if (!customer_id) {
        alert("No customer found in local storage. Please log in again.");
        navigate('/account');
      } 
    }, [addressdata]);


  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
  };

  const updateUserAddress = async () => {
      if (!customer_id) {
        alert("Customer ID is missing. Please log in again.");
        navigate('/account');
      }
  
      try {
        const payload = { customer_id: customer_id, customer_address: tempCustomerAddress };
       
        //console.log("payload",payload)
        const response = await updateCustomerAddress(payload).unwrap();
        //console.log("update address",response)
        if (response.status === 'succes') {
          await refetchAddress();
          setCustomerAddress(tempCustomerAddress);
          const successModalEl = document.getElementById('successModal');
          const editModalEl = document.getElementById('editaddressModal');
  
          if (editModalEl) Modal.getOrCreateInstance(editModalEl).hide();
          if (successModalEl) Modal.getOrCreateInstance(successModalEl).show();
  
        // Redirect after 2 seconds
          setTimeout(() => {
            if (successModalEl) Modal.getOrCreateInstance(successModalEl).hide();
            navigate('/checkout'); // redirect
          }, 2000);
        } else {
          alert("Failed to update address. Please check your details.");
        }
      } catch (error) {
        //console.error("Error updating address:", error);
        alert("Failed to update address. Please try again.");
      }
    };

  const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.sale_price, 0);
  const gsttotal = cart.reduce((count, item) => count + item.quantity * item.gst_slab, 0);
  const handleChange = (field, value) => {
    setTempCustomerAddress(prev => ({ ...prev, [field]: value }));
  };

  const requiredFields = [
  "first_name",
  "last_name",
  "email_id",
  "mobile",
  "addr_field1",
  "addr_field2",
  "addr_field3",
  "addr_field4",
  "addr_field5",
  "addr_field6",
  "city",
  "state",
  "country",
  "pin_code"
];

  const isAddressComplete = (address) => {
    return requiredFields.every(field => {
      const value = address[field];
      return value !== undefined && value !== null && value.toString().trim() !== "";
    });
  };

  const placeOrderSubmit=async()=>{
    const customer_id = localStorage.getItem("customer_id");

    if (!customer_id) {
      alert("Customer not found. Please log in.");
      navigate('/account');
    }

    if (!isAddressComplete(customerAddress)) {
    alert("Please complete all address fields before placing your order.");
    return;
    }
    else{
      const payload = {
            customer_id: parseInt(customer_id),
            delivery_address: customerAddress,
            billing_address: customerAddress,
            cartList: cart.map(item => ({
              product_id: item.product_id,
              product_name: item.product_name,
              unit_value: item.unit_value,
              unit_type: item.unit_type,
              mrp: item.mrp,
              sale_price: item.sale_price,
              quantity: item.quantity,
              gst_slab: item.gst_slab,
              discount_amount: item.discount_amount,
              discount_percentage: item.discount_percentage,
              total_amount: (item.quantity * item.sale_price).toFixed(2),
            }))
          };
   
          var response=await orderSubmitFn(payload).unwrap();
          console.log("responce",response)
          if (response.status === 'success') {
            await deleteAllCartFn(customer_id).unwrap();
            clearCart();
            toast.success("Order submitted successfully")
            navigate("/")
          }
          else{
              toast.error("Order submission failed")
          }
    }

  }
  return (
    <>
    <div className="modal fade" id="successModal" tabIndex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="successModalLabel">Success</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Address updated successfully!
          </div>
        </div>
      </div>
    </div>
    <section className="checkout py-80">
      <div className="container container-lg">
        {/* <div className="border border-gray-100 rounded-8 px-30 py-20 mb-40">
          <span>
            Have a coupon?{" "}
            <Link to="/cart" className="fw-semibold text-gray-900 hover-text-decoration-underline hover-text-main-600">
              Click here to enter your code
            </Link>
          </span>
        </div> */}

        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <form className="pe-xl-5">
              <div className="row gy-3">
                {/* Address Form Fields */}
                {[
                  { name: "first_name", placeholder: "First Name",type: "text" },
                  { name: "last_name", placeholder: "Last Name",type: "text" },
                  { name: "email_id", placeholder: "Email Address", type: "email" },
                  { name: "mobile", placeholder: "Mobile Number",type: "text" },
                  { name: "addr_field1", placeholder: "Address Line 1",type: "text" },
                  { name: "addr_field2", placeholder: "Address Line 2",type: "text" },
                  { name: "addr_field3", placeholder: "Address Line 3",type: "text" },
                  { name: "addr_field4", placeholder: "Address Line 4",type: "text" },
                  { name: "addr_field5", placeholder: "Address Line 5",type: "text" },
                  { name: "addr_field6", placeholder: "Address Line 6",type: "text"},
                  { name: "city", placeholder: "City",type: "text" },
                  { name: "state", placeholder: "State",type: "text" },
                  { name: "country", placeholder: "Country",type: "text" },
                  { name: "pin_code", placeholder: "Pin Code",type: "text" }
                ].map((item,index) => (
                  <div className="form-group" key={index}>
                    <input
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                      className="form-control border-form-control"
                      value={tempCustomerAddress[item.name] || ''}
                     disabled
                    />
                  </div>
                ))}

                <div className="col-12">
                  <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#editaddressModal">
                    Change Address
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <div className="checkout-sidebar">
              <div className="bg-color-three rounded-8 p-24 text-center">
                <span className="text-gray-900 text-xl fw-semibold">Your Orders</span>
              </div>

              <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">Product</span>
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">Subtotal</span>
                </div>

                {cart.map((item, index) => (
                  <div className="flex-between gap-24 mb-32" key={index}>
                    <div className="flex-align gap-12">
                      <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
                        {item.product_name}
                      </span>
                      <span className="text-gray-900 fw-normal text-md font-heading-two">
                        <i className="ph-bold ph-x" />
                      </span>
                      <span className="text-gray-900 fw-semibold text-md font-heading-two">{item.quantity}</span>
                    </div>
                    <span className="text-gray-900 fw-bold text-md font-heading-two">₹{(item.quantity * item.sale_price).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-top border-gray-100 pt-30 mt-30">
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">Subtotal</span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">Tax</span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">₹{gsttotal.toFixed(2)}</span>
                  </div>
                  <div className="mb-0 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">Total</span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">₹{(subtotal+gsttotal).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-32">
                {["payment1", "payment2", "payment3"].map((id) => {
                  const labels = {
                    payment1: "Direct Bank transfer",
                    payment2: "Check payments",
                    payment3: "Cash on delivery",
                  };
                  return (
                    <div className="payment-item" key={id}>
                      <div className="form-check common-check common-radio py-16 mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id={id}
                          checked={selectedPayment === id}
                          onChange={handlePaymentChange}
                        />
                        <label className="form-check-label fw-semibold text-neutral-600" htmlFor={id}>
                          {labels[id]}
                        </label>
                      </div>
                      {selectedPayment === id && (
                        <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block">
                          <p className="text-gray-800">
                            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-gray-500">
                  Your personal data will be used to process your order, support your experience
                  throughout this website, and for other purposes described in our{" "}
                  <Link to="/privacy-policy" className="text-main-500 underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-32">
                <button className="btn btn-primary w-full" type="button" onClick={placeOrderSubmit}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="modal fade" id="editaddressModal" tabindex="-1" aria-labelledby="editaddressModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit My Address</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <form>
                          {[
                            { label: "First Name", field: "first_name" },
                            { label: "Last Name", field: "last_name" },
                            { label: "Email Id", field: "email_id" },
                            { label: "Mobile Number", field: "mobile" },
                            { label: 'FLAT Number / Floor', field: 'addr_field1' },
                            { label: 'House Number / Block Number / Plot Number', field: 'addr_field2' },
                            { label: 'House Name / Apartment Name', field: 'addr_field3' },
                            { label: 'Street Name', field: 'addr_field4' },
                            { label: 'Landmark', field: 'addr_field5' },
                            { label: 'Area / Location', field: 'addr_field6' },
                            { label: 'Pin Code', field: 'pin_code' },
                          ].map((item, index) => (
                            <div className="form-group" key={index}>
                              <label className="control-label">
                                {item.label} <span className="required">*</span>
                              </label>
                              <input
                                className="form-control border-form-control"
                                value={tempCustomerAddress[item.field] || ''}
                                type="text"
                                onChange={(e) => handleChange(item.field, e.target.value)}
                                required
                              />
                            </div>
                          ))}
                          {/* <div className="form-group text-right mt-4">
                            <button
                              type="button"
                              className="btn btn-lg"
                              style={{ backgroundColor: '#e96125', color: 'white' }}
                              
                            >
                              Edit
                            </button>
                          </div> */}
                        </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick={updateUserAddress}>Edit</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;

