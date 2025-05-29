import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useGetCustomerDetailsByIdQuery, useUpdateCustomerProfileMutation } from '../services/customerApi';
import SideviewProfile from './SideviewProfile';
import { Modal } from 'bootstrap';

const MyProfile = () => {
  var navigate=useNavigate()
  // State for customer info
  const [customer, setCustomer] = useState(null);
  const customerId = JSON.parse(localStorage.getItem('customer_id'));
  var {data,isLoading}=useGetCustomerDetailsByIdQuery(customerId)
  console.log("customerdata",data)
  const [cusmodel, setCusmodel] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    email_id: '' 
  });
  const [updateCustomerProfile] = useUpdateCustomerProfileMutation();

  // Load customer on mount
  useEffect(() => {
    
    //const customerId = JSON.parse(localStorage.getItem('customer_id'));
    if (data?.customer_details) {
      setCustomer(data.customer_details);
      setCusmodel({
        first_name: data.customer_details.first_name,
        last_name: data.customer_details.last_name,
        mobile: data.customer_details.mobile,
        email_id: data.customer_details.email_id
      });
    }
  }, [data]);

  const onLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('token');
    // navigate to home
    window.location.href = '/home'; // or use react-router
  };

  const handleChange = (field, value) => {
    setCusmodel(prev => ({ ...prev, [field]: value }));
  };

  const updateUserProfile = () => {
    // Call your API to update profile
    // Assuming your API returns the updated customer data
    updateCustomerProfile({  customer_id: customerId,...cusmodel }).unwrap()
      .then((data) => {
        // Update local storage and local state
        console.log("customer",customer)
        const updatedCustomer = { ...customer, ...data.customerDetails };
        console.log("updatedCustomer",updatedCustomer)
        //localStorage.setItem('customer', JSON.stringify(updatedCustomer));
        setCustomer(updatedCustomer);
        const successModalEl = document.getElementById('successModal');
        const editModalEl = document.getElementById('editProfileModal');
        
        if (editModalEl) Modal.getOrCreateInstance(editModalEl).hide();
        if (successModalEl) Modal.getOrCreateInstance(successModalEl).show();
        setTimeout(() => {
         if (successModalEl) Modal.getOrCreateInstance(successModalEl).hide();
                  navigate('/my-profile'); // redirect
          }, 2000);
        // Close modal if needed
       // document.getElementById('closeModal')?.click();
      })
      .catch((err) => {
        console.error('Update failed', err);
      });
  };

  if (!customer) return null;

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
          {/* Sidebar */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm p-4">
                <div className="row">
            
                {/* Sidebar menu */}
                <SideviewProfile  firstName={customer.first_name} mobile={customer.mobile}></SideviewProfile>
                {/* Profile info */}
                <div className="col-md-8">
                  <div className="card card-body account-right">
                    <div className="widget">
                      <div className="section-header">
                        <h5 className="heading-design-h5">My Profile</h5>
                      </div>
                      {/* Profile details */}
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">First Name</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.first_name}
                              disabled
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">Last Name</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.last_name}
                              disabled
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">Phone</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.mobile}
                              disabled
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">Email Address</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.email_id}
                              disabled
                              type="email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 text-right" style={{ marginTop: '15px' }}>
                          {/* Trigger modal */}
                          <button
                            type="button"
                            className="btn btn-success btn-lg"
                            data-bs-toggle="modal" data-bs-target="#editProfileModal"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for editing profile */}
      <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit My Profile</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <form>
                          {[
                            { label: 'First Name', field: 'first_name' },
                            { label: 'Last Name', field: 'last_name' },
                            { label: 'Mobbile', field: 'mobile' },
                            { label: 'Email', field: 'email_id' },
                          ].map((item, index) => (
                            <div className="form-group" key={index}>
                              <label className="control-label">
                                {item.label} <span className="required">*</span>
                              </label>
                              <input
                                className="form-control border-form-control"
                                value={cusmodel[item.field] || ''}
                                type="text"
                                onChange={(e) => handleChange(item.field, e.target.value)}
                                required
                              />
                            </div>
                          ))}
                        
                        </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick={updateUserProfile}>Edit</button>
          </div>
        </div>
      </div>
    </div>

     
         </>
  );
};

export default MyProfile;

