import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuantityControl from '../helper/QuantityControl'; // Assuming this is a custom component
import { getCartFromLocal } from '../utils/cart'; // Assuming this retrieves the cart from local storage
import { CartContext } from './CartContext';
import { useChangeQuantityByIdQuery, useGetCardDetailsByUseridQuery } from '../services/cartApi';
import { skipToken } from '@reduxjs/toolkit/query';

const CartSection = () => {
    const customerId = window.localStorage.getItem('customer_id');
    const isLoggedIn = !!customerId;
    //const [currentCart, setCurrentCart] = useState([]);
    const {cart,removeFromCart,updateQuantity  }= useContext(CartContext);
    //useChangeQuantityByIdQuery()
    //var customerId=window.localStorage.getItem('customer_id');
   // var {data,isLoading}=useGetCardDetailsByUseridQuery(customerId)
    // useEffect(() => { 
    //     const storedCart = getCartFromLocal();
    //     setCart(storedCart);
    // }, []);
   
    // const queryArgs = customerId ? customerId : skipToken;
    // //if(isLoggedIn) 
    
    // const { data: serverCart, isLoading } = useGetCardDetailsByUseridQuery(
    //     customerId ? customerId : skipToken
    //   );
    // //const subtotal =0;
    // useEffect(() => {
    //     if (isLoggedIn && serverCart) {
    //         setCurrentCart(serverCart.data);
    //     } else {
    //         const localCart = getCartFromLocal();
    //         setCurrentCart(localCart);
    //     }
    //    // subtotal = currentCart.reduce((acc, item) => acc + item.quantity * item.sale_price, 0);
    // }, [isLoggedIn, serverCart,cart]);
    
    // const handleQuantityChange = (productId, unitId, newQuantity) => {
    //     setCurrentCart(prevCart =>
    //         prevCart.map(item =>
    //             item.product_id === productId && item.unit_id === unitId
    //                 ? { ...item, quantity: newQuantity }
    //                 : item
    //         )
    //     );
    // };
    

    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.sale_price, 0);

    const gsttotal = cart.reduce((count, item) => count + item.quantity * item.gst_slab, 0);

    return (
        <>

            <section className="cart py-80">
                <div className="container container-lg">
                    <div className="row gy-4">
                        <div className="col-xl-9 col-lg-8">
                            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
                                <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                                    <table className="table style-three">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: "center" }}>S.No</th>
                                                <th className="cart_product">Product Image</th>
                                                <th style={{ textAlign: "center" }}>Product Name</th>
                                                <th>Available</th>
                                                <th>MRP</th>
                                                <th>Discount</th>
                                                <th>Unit price</th>
                                                <th style={{ textAlign: "center" }}>Qty</th>
                                                <th>Total</th>
                                                <th className="action" style={{ fontSize: "30px" }}>
                                                    <i className="mdi mdi-delete-forever"></i>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.length === 0 ? (
                                                <tr>
                                                    <td colSpan="10">
                                                        <p className="text-center">Your cart is empty.</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                cart?.map((item, index) => (
                                                    <tr key={item.product_id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="table-product d-flex align-items-center gap-24">
                                                                <Link
                                                                    to={`/product-details/${item.product_id}/${item.unit_id}`}
                                                                    className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                                                                >
                                                                    <img
                                                                        src={item.product_img_400}
                                                                        alt={item.product_name}
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="table-product__content text-start">
                                                                <h6 className="title text-lg fw-semibold mb-8">
                                                                    <Link
                                                                        to={`/product-details/${item.product_id}/${item.unit_id}`}
                                                                        className="link text-line-2"
                                                                        tabIndex={0}
                                                                    >
                                                                        {item.product_name}
                                                                    </Link>
                                                                </h6>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success text-white">In stock</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-lg h6 mb-0 fw-semibold">₹{item.mrp}</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-lg h6 mb-0 fw-semibold">{item.discount_percentage}%</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-lg h6 mb-0 fw-semibold">₹{item.sale_price}</span>
                                                        </td>
                                                        <td>
                                                            <QuantityControl initialQuantity={item.quantity} cartId={item.cart_id} productId={item.product_id} unitId={item.unit_id} 
                                                               
                                                            />
                                                        </td>
                                                        <td>
                                                            ₹{(item.quantity * item.sale_price).toFixed(2)}
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-sm btn-danger" title="Remove" onClick={() => removeFromCart(item.cart_id,item.product_id, item.unit_id)}>
                                                                <i className="mdi mdi-close-circle-outline"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <div className="flex-between flex-wrap gap-16 mt-16">
                                    <div className="flex-align gap-16">
                                        <input type="text" className="common-input" placeholder="Coupon Code" />
                                        <button type="submit" className="btn btn-main py-18 w-100 rounded-8">
                                            Apply Coupon
                                        </button>
                                    </div>
                                    <button type="submit" className="text-lg text-gray-500 hover-text-main-600">
                                        Update Cart
                                    </button>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4">
                            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
                                <h6 className="text-xl mb-32">Cart Totals</h6>
                                <div className="bg-color-three rounded-8 p-24">
                                    <div className="mb-32 flex-between gap-8">
                                        <span className="text-gray-900 font-heading-two">Subtotal</span>
                                        <span className="text-gray-900 fw-semibold">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="mb-32 flex-between gap-8">
                                        <span className="text-gray-900 font-heading-two">
                                            Estimated Delivery
                                        </span>
                                        <span className="text-gray-900 fw-semibold">Free</span>
                                    </div>
                                    <div className="mb-0 flex-between gap-8">
                                        <span className="text-gray-900 font-heading-two">
                                            Estimated Tax
                                        </span>
                                        <span className="text-gray-900 fw-semibold">₹{gsttotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="bg-color-three rounded-8 p-24 mt-24">
                                    <div className="flex-between gap-8">
                                        <span className="text-gray-900 text-xl fw-semibold">Total</span>
                                        <span className="text-gray-900 text-xl fw-semibold">₹{(subtotal+gsttotal).toFixed(2)}</span>
                                    </div>
                                </div>
                                {subtotal!==0 && (
                                <Link
                                    to="/checkout"
                                    className="btn btn-main mt-40 py-18 w-100 rounded-8"
                                >
                                    Proceed to checkout
                                </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CartSection;