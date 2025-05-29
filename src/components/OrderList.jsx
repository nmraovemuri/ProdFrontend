import React, { useEffect, useState } from 'react';
import SideviewProfile from './SideviewProfile';
import { useGetCustomerDetailsByIdQuery, useOrderHistoryDetailsMutation } from '../services/customerApi';
import { useGetOrderDetailsByOrderidQuery } from '../services/ordersApi';

function OrderList() {
  const [customer, setCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customerId = JSON.parse(localStorage.getItem('customer_id'));
  const { data, isLoading: customerLoading } = useGetCustomerDetailsByIdQuery(customerId);
  const [orderHistoryDetailsFn, { data: orderData, isLoading: orderLoading, error: orderError }] = useOrderHistoryDetailsMutation();
  const { data: orderDetailsData, isLoading: orderDetailsLoading } = useGetOrderDetailsByOrderidQuery(selectedOrder, {
  skip: !selectedOrder, 
});
 console.log("orderData",orderData)
  useEffect(() => {
    if (data?.customer_details) {
      setCustomer(data.customer_details);
      orderHistoryDetailsFn({ customer_id: customerId });
    }
  }, [data, orderHistoryDetailsFn]);

  const handleViewClick = (id) => {
    setSelectedOrder(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
    <section className="py-5" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card shadow-sm p-4">
            <div className="row">
              {/* Sidebar menu */}
              {customer && (
                <SideviewProfile firstName={customer.first_name} mobile={customer.mobile} />
              )}
              
              {/* Profile info */}
              <div className="col-md-8">
                <div className="card card-body account-right">
                  <div className="widget">
                    <div className="section-header">
                      <h5 className="heading-design-h5">Order List</h5>
                      {/* {orderLoading && <p>Loading order history...</p>}
                      {orderData && <p>Order history loaded!</p>}
                      {orderError && <p>Error loading order history</p>} */}
                    </div>
                    <div style={{ overflowX: 'visible' }}>
                      <table className="table table-sm table-bordered table-hover text-center">
                        <thead class="table-dark">
                          <tr>
                            <th>order #</th>
                            <th>Date Purchased</th>
                            <th>Total Items</th>
                            <th>Total </th>
                            <th>Status </th>
                            <th>Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderData?.ordersList?.map((order)=>
                          <tr>
                            <td>{order.order_id}</td>
                            <td>{order.created_date}</td>
                            <td>{order.total_items}</td>
                            <td>{order.total_amount}</td>
                            <td>{order.status}</td>
                            <td><button className="btn btn-sm btn-primary" onClick={() => handleViewClick(order.order_id)}>
                                 <i className="ph ph-eye me-1"></i> 
                              </button></td>
                          </tr>
                          )}
                          
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Profile info */}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  {isModalOpen && (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
  <div className="modal-dialog " style={{ maxWidth: '95%', width: '95%' }}>
    <div className="modal-content">
      {orderDetailsLoading ? (
            <p>Loading...</p>
          ) : orderDetailsData ? (
            <>
            
      {/* Modal Header */}
      <div className="modal-header d-flex justify-content-between align-items-start">
        
        <div className="row w-100">
          {/* Billing Address */}
          <div className="col-md-6">
            <h4 className="modal-title">Billing Address:</h4>
            <hr />
            <div className="table-responsive">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>customer_id:</td>
                    <td>{customerId}</td>
                    <td>Name:</td>
                    <td>{orderDetailsData.billing_address?.first_name} {orderDetailsData.billing_address?.last_name}</td>
                  </tr>
                  <tr>
                    <td>email_id:</td>
                    <td>{orderDetailsData.billing_address?.email_id}</td>
                    <td>mobile:</td>
                    <td>{orderDetailsData.billing_address?.mobile}</td>
                  </tr>
                  <tr>
                    <td>created_date:</td>
                    <td>{orderDetailsData.billing_address?.created_date}</td>
                    <td>updated_date:</td>
                    <td>{orderDetailsData.billing_address?.updated_date}</td>
                  </tr>
                  <tr>
                    <td>address field1:</td>
                    <td>{orderDetailsData.billing_address?.addr_field1}</td>
                    <td>address field2:</td>
                    <td>{orderDetailsData.billing_address?.addr_field2}</td>
                  </tr>
                  <tr>
                    <td>address field3:</td>
                    <td>{orderDetailsData.billing_address?.addr_field3}</td>
                    <td>address field4:</td>
                    <td>{orderDetailsData.billing_address?.addr_field4}</td>
                  </tr>
                  <tr>
                    <td>address field5:</td>
                    <td>{orderDetailsData.billing_address?.addr_field5}</td>
                    <td>pincode:</td>
                    <td>{orderDetailsData.billing_address?.pin_code}</td>
                  </tr>
                  <tr>
                    <td><strong>Order ID:</strong></td>
                    <td colSpan="3"><strong>{selectedOrder}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="col-md-6">
            <h4 className="modal-title">Shipping Address:</h4>
            <hr />
            <div className="table-responsive">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>customer_id:</td>
                    <td>{customerId}</td>
                    <td>Name:</td>
                    <td>{orderDetailsData.shipping_address?.first_name} {orderDetailsData.shipping_address?.last_name}</td>
                  </tr>
                  <tr>
                    <td>email_id:</td>
                    <td>{orderDetailsData.shipping_address?.email_id}</td>
                    <td>mobile:</td>
                    <td>{orderDetailsData.shipping_address?.mobile}</td>
                  </tr>
                  <tr>
                    <td>created_date:</td>
                    <td>{orderDetailsData.shipping_address?.created_date}</td>
                    <td>updated_date:</td>
                    <td>{orderDetailsData.shipping_address?.updated_date}</td>
                  </tr>
                  <tr>
                    <td>address field1:</td>
                    <td>{orderDetailsData.shipping_address?.addr_field1}</td>
                    <td>address field2:</td>
                    <td>{orderDetailsData.shipping_address?.addr_field2}</td>
                  </tr>
                  <tr>
                    <td>address field3:</td>
                    <td>{orderDetailsData.shipping_address?.addr_field3}</td>
                    <td>address field4:</td>
                    <td>{orderDetailsData.shipping_address?.addr_field4}</td>
                  </tr>
                  <tr>
                    <td>address field5:</td>
                    <td>{orderDetailsData.shipping_address?.addr_field5}</td>
                    <td>pincode:</td>
                    <td>{orderDetailsData.shipping_address?.pin_code}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
        <button type="button" className="btn-close" onClick={closeModal}></button>
      </div>

      {/* Modal Body */}
      <div className="modal-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Unit/Type</th>
              <th>MRP</th>
              <th>GST</th>
              <th>Qty</th>
              <th>Sale Price</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orderDetailsData.orderList?.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.unit_value}{product.unit_type}</td>
                <td>{product.mrp}</td>
                <td>{product.gst_slab}%</td>
                <td>{product.quantity}</td>
                <td>{product.sale_price}</td>
                <td>{product.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       </>
          ) : (
            <p>No order details found.</p>
          )}

      {/* Modal Footer */}
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
      </div>
    </div>
  </div>
</div>


  )}
  </>
  );
}

export default OrderList;
