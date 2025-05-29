import React from 'react'
import { Link } from 'react-router-dom'
import { useGetAllCategoriesQuery, useGetAllSubCategoriesByCategoriesQuery } from '../services/poductsApi'

const FooterOne = () => {
    var customerId=window.localStorage.getItem('customer_id')
    var {isLoading,data}=useGetAllCategoriesQuery()
    return (
        <footer className="footer py-120">
            <img
                src="assets/images/bg/body-bottom-bg.png"
                alt="BG"
                className="body-bottom-bg"
            />
            <div className="container container-lg">
                <div className="footer-item-wrapper d-flex align-items-start flex-wrap">
                    <div className="footer-item">
                        <div className="footer-item__logo">
                            <Link to="/">
                                {" "}
                                <img src="/assets/images/logo/logo.png" alt="" />
                            </Link>
                        </div>
                        <p className="mb-24">
                            We're Grocery Shop, an innovative team of food supliers.
                        </p>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                <i className="ph-fill ph-map-pin" />
                            </span>
                            <span className="text-md text-gray-900 ">
                            bus stop, near, 6-102 KMG functionhall road,<br></br> Chinthal, Hyderabad, Telangana 500054, India
                            </span>
                        </div>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                <i className="ph-fill ph-phone-call" />
                            </span>
                            <div className="flex-align gap-16 flex-wrap">
                                <Link
                                    to="/tel: +91-9989 385 332"
                                    className="text-md text-gray-900 hover-text-main-600"
                                >
                                     +91-9989 385 332
                                </Link>
                               
                            </div>
                        </div>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                <i className="ph-fill ph-envelope" />
                            </span>
                            <Link
                                to="/mailto: customersupport@aswikamart.com"
                                className="text-md text-gray-900 hover-text-main-600"
                            >
                                 customersupport@aswikamart.com
                            </Link>
                        </div>
                    </div>
                   
                    <div className="footer-item">
                        <h6 className="footer-item__title">ABOUT US</h6>
                        <ul className="footer-menu">
                        <li className="mb-16">
                                <Link to="/faq" className="text-gray-600 hover-text-main-600">
                                   FAQ
                                </Link>
                            </li>
                            <li className="mb-16">
                                <Link to="/privacy-policy" className="text-gray-600 hover-text-main-600">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className="mb-16">
                                <Link to="/terms-conditions" className="text-gray-600 hover-text-main-600">
                                Terms & Conditions
                                </Link>
                            </li>
                            <li className="mb-16">
                                <Link to="/refund-policy" className="text-gray-600 hover-text-main-600">
                                Refund & Policy
                                </Link>
                            </li>
                           
                            
                            
                        </ul>
                    </div>
                    <div className="footer-item">
                        <h6 className="footer-item__title">My Account</h6>
                        <ul className="footer-menu">
                            {customerId ? (
                                <>
                            <li className="mb-16">
                                <Link to="/my-profile" className="text-gray-600 hover-text-main-600">
                                    My Account
                                </Link>
                            </li>
                            <li className="mb-16">
                                <Link to="/orderlist" className="text-gray-600 hover-text-main-600">
                                    Order History
                                </Link>
                            </li>
                            </>
                            ):(
                                <>
                                <li className="mb-16">
                                    <Link to="/account" className="text-gray-600 hover-text-main-600">
                                        My Account
                                    </Link>
                                </li>
                                </>

                            )}
                            <li className="mb-16">
                                <Link to="/cart" className="text-gray-600 hover-text-main-600">
                                    Shoping Cart
                                </Link>
                            </li>
                            
                            
                            {/* <li className="">
                                <Link to="/wishlist" className="text-gray-600 hover-text-main-600">
                                    Wishlist
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className="footer-item">
                        <h6 className="footer-item__title"> CATEGORIES </h6>
                        <ul className="footer-menu">
                           {
                            isLoading && <b>Loading...</b>
                        }
                        {
                            !isLoading &&
                                    data?.data?.map((cat)=>{
                                        return (  
                                <>
                                <li className="mb-16">
                                    <Link to={`/shop/${cat.category_name}/${cat.sub_category_name}/${cat.subcatid}`} className="text-gray-600 hover-text-main-600">
                                    {cat.category_name}
                                    </Link>
                                </li>
                                </>
                        )})} 
                            
                            
                        </ul>
                    </div>
                    <div className="footer-item">
                        <h6 className="">GET IN TOUCH</h6>

                        {/* <p className="mb-16">Marketpro App is available. Get it now</p> */}

                       
                        <div className="flex-align gap-8 my-32">
                            
                            <Link to="/https://www.apple.com/store" className="">
                                <img src="assets/images/thumbs/store-img1.png" alt="" />
                            </Link>
                            <Link to="/https://play.google.com/store/apps?hl=en" className="">
                                <img src="assets/images/thumbs/store-img1.png" alt="" />
                            </Link>
                        </div>
                        <ul className="flex-align gap-16">
                            <li>
                                <Link
                                    to="/https://www.facebook.com"
                                    className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-facebook-logo" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/https://www.twitter.com"
                                    className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-twitter-logo" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/https://www.linkedin.com"
                                    className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-instagram-logo" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/https://www.pinterest.com"
                                    className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-linkedin-logo" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default FooterOne