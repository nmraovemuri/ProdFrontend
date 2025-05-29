import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCustomerDetailsByIdQuery, useGetCustomerShippingAddressQuery, useUpdateCustomerAddressMutation } from '../services/customerApi';
import { Modal } from 'bootstrap';
import SideviewProfile from './SideviewProfile';

const MyAddress = () => {
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
  const [customerId, setCustomerId] = useState(null);
  const [updateCustomerAddress] = useUpdateCustomerAddressMutation();
  const navigate = useNavigate();
  const customer_id = localStorage.getItem('customer_id'); 
  var {isLoading:isLoadingCustomer,data:customerdata}=useGetCustomerDetailsByIdQuery(customer_id)
  var{isLoading:isLoadingAddress,data:addressdata}=useGetCustomerShippingAddressQuery(customer_id)

  useEffect(() => {
    if (customerdata?.customer_details) {
      const { first_name, last_name, mobile, email_id } = customerdata.customer_details;
  
      setCustomerAddress(prev => ({
        ...prev,
        first_name,
        last_name,
        mobile,
        email_id
      }));
  
      setTempCustomerAddress(prev => ({
        ...prev,
        first_name,
        last_name,
        mobile,
        email_id
      }));
    }
  
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
      navigate('/login');
    } else {
      setCustomerId(customer_id);
    }
  }, [customerdata, addressdata]);
  

  

  const updateUserAddress = async () => {
    if (!customerId) {
      alert("Customer ID is missing. Please log in again.");
      return;
    }

    try {
      const payload = { customer_id: customerId, customer_address: tempCustomerAddress };
     
      console.log("payload",payload)
      const response = await updateCustomerAddress(payload).unwrap();
      console.log("update address",response)
      if (response.status === 'succes') {
        setCustomerAddress(tempCustomerAddress);
        const successModalEl = document.getElementById('successModal');
        const editModalEl = document.getElementById('editaddressModal');

        if (editModalEl) Modal.getOrCreateInstance(editModalEl).hide();
        if (successModalEl) Modal.getOrCreateInstance(successModalEl).show();

      // Redirect after 2 seconds
        setTimeout(() => {
          if (successModalEl) Modal.getOrCreateInstance(successModalEl).hide();
          navigate('/my-address'); // redirect
        }, 2000);
      } else {
        alert("Failed to update address. Please check your details.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setTempCustomerAddress(prev => ({ ...prev, [field]: value }));
  };

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

      
      <section className="py-5" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm p-4">
                <div className="row">
                  {/* Sidebar */}
                  <SideviewProfile  firstName={customerAddress.first_name} mobile={customerAddress.mobile}></SideviewProfile>

                  {/* Address form */}
                  <div className="col-md-8">
                    <div className="card card-body shadow-sm bg-white account-right">
                      <div className="widget">
                        <div className="section-header mb-4">
                          <h5 className="heading-design-h5">Contact Address</h5>
                        </div>
                        <form>
                          {[
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
                                disabled
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
                        <br></br>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editaddressModal">
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </div>

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

export default MyAddress;
