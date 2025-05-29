import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { getCountdown } from '../helper/Countdown';
import { useGetProductDetailsByIdsQuery } from '../services/poductsApi';
import BreadcrumbTwo from './BreadcrumbTwo';
import '@mdi/font/css/materialdesignicons.min.css';
import { useAddCartdetailsMutation, useLazyGetCardDetailsByUseridQuery } from '../services/cartApi';
import { CartContext } from './CartContext';

const ProductDetailsOne = () => {
    var {id,unit_id}=useParams()
    const { addToCart,setCart } = useContext(CartContext);
    var [addCartfn]=useAddCartdetailsMutation()
    const navigate = useNavigate();
    const [getAllCartDetailsfn] = useLazyGetCardDetailsByUseridQuery()
   
    const [timeLeft, setTimeLeft] = useState(getCountdown());
    var {isLoading,data}=useGetProductDetailsByIdsQuery({id,unit_id})
    console.log("data",data)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const productImages = [
        "assets/images/thumbs/product-details-thumb1.png",
        "assets/images/thumbs/product-details-thumb2.png",
        "assets/images/thumbs/product-details-thumb3.png",
        "assets/images/thumbs/product-details-thumb2.png",
    ];

    // increment & decrement
    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : quantity);


    const [mainImage, setMainImage] = useState(productImages[0]);

    const settingsThumbs = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
    };

    const handleAddToCart = (product) => {
        const customerId = window.localStorage.getItem('customer_id');
      
        const payload = {
          user_id: customerId,
          product_id: product.product_id,
          unit_id: product.unit_id,
          quantity: quantity 
        };
      
        if (customerId) {
          // Save to database
          addCartfn(payload)
            .then(() => getAllCartDetailsfn(customerId).unwrap())
            .then((response) => {
              if (response?.data) {
                setCart(response.data);
              }
              navigate('/cart');
            })
            .catch((error) => {
              console.error('Error saving to cart:', error);
            });
        } else {
          // Guest cart
          addToCart({ ...product, quantity });
          navigate('/cart');
        }
      };
      
    return (
        <>

        <BreadcrumbTwo details={data?.details} />
        {
            isLoading && <b> Loading ...</b>
        }
        {!isLoading && data?.data?.map((cat) => (
            <section className="product-details py-80">
                <div className="container container-lg">
                    <div className="row gy-4">
                        <div className="col-lg-9">
                            <div className="row gy-4">
                                <div className="col-xl-6">
                                    <div className="product-details__left">
                                        <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                                            <div className="">
                                                <div className="product-details__thumb flex-center h-100">
                                                    <img src={`${cat.product_img_400}`} alt="Main Product" />
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="product-details__content">
                                        <h5 className="mb-12">{cat.product_name}</h5>
                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                        
                                        <div className="mt-32 flex-align flex-wrap gap-32">
                                        <div className="flex-align gap-8">
                                            <div style={{ marginRight: "50px" }}>
                                                <h6 style={{ color: "#F44336" }}>
                                                <i className="ph ph-shield-check" ></i>
                                                <span >Available:</span> {cat.unit_value} {cat.unit_type}
                                                </h6>
                                            </div>
                                            <div>
                                                <h6 style={{ color: "green" }}>In Stock</h6>
                                            </div>
                                            </div>

                                           
                                        </div>
                                        
                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                        
                                        <div className="mt-32 flex-align flex-wrap gap-32">
                                            <div className="flex-align gap-8">
                                                <h4 className="mb-0">₹{cat.sale_price}</h4>
                                                <span className="text-md text-gray-500">₹{cat.mrp}</span>
                                            </div>
                                           
                                        </div>

                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                        
                                        <div className="mt-32 flex-align flex-wrap gap-32">
                                        <div className="flex-align gap-8">
                                            <div style={{ marginRight: "50px" }}>
                                                <h6 style={{ color: "green" }}>
                                               
                                                <span >You Save</span> 
                                                </h6>
                                            </div>
                                            <div>
                                                <h6 style={{ color: "#F44336" }}>You Save {cat.discount_percentage}% (Inclusive of all taxes)</h6>
                                            </div>
                                            </div>

                                           
                                        </div>

                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                        
                                      
                                        <span className="text-gray-900 d-block mb-8">Quantity:</span>
                                        
                                        <div className="flex-between gap-16 flex-wrap">
                                            <div className="flex-align flex-wrap gap-16">
                                                <div className="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                                                    <button onClick={decrementQuantity}
                                                        type="button"
                                                        className="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center"
                                                    >
                                                        <i className="ph ph-minus" />
                                                    </button>
                                                    <input
                                                    type="number"
                                                    className="quantity__input border-0 text-center w-32"
                                                    value={quantity} readOnly
                                                    />
                                                    <button onClick={incrementQuantity}
                                                        type="button"
                                                        className="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center"
                                                    >
                                                        <i className="ph ph-plus" />
                                                    </button>
                                                </div>
                                                <button  className="btn btn-main rounded-pill flex-align d-inline-flex gap-8 px-48" onClick={() => handleAddToCart(cat)}>
                                    Add To Cart <i className="ph ph-shopping-cart" /></button>
                                               
                                            </div>
                                            {/* <div className="flex-align gap-12">
                                                <Link
                                                    to="#"
                                                    className="w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                                                >
                                                    <i className="ph ph-heart" />
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                                                >
                                                    <i className="ph ph-shuffle" />
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                                                >
                                                    <i className="ph ph-share-network" />
                                                </Link>
                                            </div> */}
                                        </div>
                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="product-details__sidebar border border-gray-100 rounded-16 overflow-hidden">
                                <div className="p-24">
                                    <div className="flex-between bg-main-600 rounded-pill p-8">
                                        <div className="flex-align gap-8">
                                            <span className="w-44 h-44 bg-white rounded-circle flex-center text-2xl">
                                                <i className="ph ph-storefront" />
                                            </span>
                                            <span className="text-white">by Aswikamart</span>
                                        </div>
                                        <Link
                                            to={`/shop/${data?.details?.[0].catName}/${data?.details?.[0].subCatName}/${data?.details?.[0].sid}`}
                                            className="btn btn-white rounded-pill text-uppercase"
                                        >
                                            View Store
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100">
                                    <span className="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
                                        <i className="ph-fill ph-truck" />
                                    </span>
                                    <div className="">
                                        <h6 className="text-sm mb-8">Fast Delivery</h6>
                                        <p className="text-gray-700">
                                            Lightning-fast shipping, guaranteed.
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100">
                                    <span className="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
                                        <i className="ph-fill ph-arrow-u-up-left" />
                                    </span>
                                    <div className="">
                                        <h6 className="text-sm mb-8">Free 90-day returns</h6>
                                        <p className="text-gray-700">Shop risk-free with easy returns.</p>
                                    </div>
                                </div> */}
                                <div className="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100">
                                    <span className="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
                                        <i className="ph-fill ph-check-circle" />
                                    </span>
                                    <div className="">
                                        <h6 className="text-sm mb-8">
                                            Pickup available at Shop location
                                        </h6>
                                        <p className="text-gray-700">Usually ready in 24 hours</p>
                                    </div>
                                </div>
                                <div className="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100">
                                    <span className="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
                                        <i className="ph-fill ph-credit-card" />
                                    </span>
                                    <div className="">
                                        <h6 className="text-sm mb-8">Payment</h6>
                                        <p className="text-gray-700">
                                            Payment upon receipt of goods, Payment by card in the
                                            department, Google Pay, Online card.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100">
                                    <span className="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
                                        <i className="ph-fill ph-check-circle" />
                                    </span>
                                    <div className="">
                                        <h6 className="text-sm mb-8">Warranty</h6>
                                        <p className="text-gray-700">
                                            The Consumer Protection Act does not provide for the return of
                                            this product of proper quality.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100">
                                    <span className="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
                                        <i className="ph-fill ph-package" />
                                    </span>
                                    <div className="">
                                        <h6 className="text-sm mb-8">Packaging</h6>
                                        <p className="text-gray-700">
                                            Research &amp; development value proposition graphical user
                                            interface investor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-80">
                    <div className="product-dContent border rounded-24">
                        
                        <div className="product-dContent__box">
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="pills-description"
                                    role="tabpanel"
                                    aria-labelledby="pills-description-tab"
                                    tabIndex={0}
                                >
                                    <div className="mb-40">
                                        <h6 className="mb-24">Product Description</h6>
                                        <p>
                                            {cat.description_fst}
                                        </p>
                                        
                                        
                                    </div>
                                    <div className="mb-40">
                                        <h6 className="mb-24">Product Specifications</h6>
                                        <ul className="mt-32">
                                            <li className="text-gray-400 mb-14 flex-align gap-14">
                                                <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                                    <i className="ph ph-check" />
                                                </span>
                                                <span className="text-heading fw-medium">
                                                    Product Type:
                                                    <span className="text-gray-500">{data?.details?.[0].subCatName}</span>
                                                </span>
                                            </li>
                                            <li className="text-gray-400 mb-14 flex-align gap-14">
                                                <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                                    <i className="ph ph-check" />
                                                </span>
                                                <span className="text-heading fw-medium">
                                                    Product Name:
                                                    <span className="text-gray-500">
                                                        {" "}
                                                        {cat.product_name}{" "}
                                                    </span>
                                                </span>
                                            </li>
                                            <li className="text-gray-400 mb-14 flex-align gap-14">
                                                <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                                    <i className="ph ph-check" />
                                                </span>
                                                <span className="text-heading fw-medium">
                                                    Brand:
                                                    <span className="text-gray-500"> {cat.product_brand}</span>
                                                </span>
                                            </li>
                                            {/* <li className="text-gray-400 mb-14 flex-align gap-14">
                                                <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                                    <i className="ph ph-check" />
                                                </span>
                                                <span className="text-heading fw-medium">
                                                    FSA Eligible:
                                                    <span className="text-gray-500"> No</span>
                                                </span>
                                            </li> */}
                                            <li className="text-gray-400 mb-14 flex-align gap-14">
                                                <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                                    <i className="ph ph-check" />
                                                </span>
                                                <span className="text-heading fw-medium">
                                                    Size/Count:
                                                    <span className="text-gray-500"> {cat.unit_value}{cat.unit_type}</span>
                                                </span>
                                            </li>
                                            {/* <li className="text-gray-400 mb-14 flex-align gap-14">
                                                <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                                    <i className="ph ph-check" />
                                                </span>
                                                <span className="text-heading fw-medium">
                                                    Item Code:
                                                    <span className="text-gray-500"> 331539</span>
                                                </span>
                                            </li> */}
                                            {/* <li className="text-gray-400 mb-14 flex-align gap-14">
                                                <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                                    <i className="ph ph-check" />
                                                </span>
                                                <span className="text-heading fw-medium">
                                                    Ingredients:
                                                    <span className="text-gray-500">
                                                        {" "}
                                                        Potatoes, Vegetable Oil, and Salt.
                                                    </span>
                                                </span>
                                            </li> */}
                                        </ul>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        ))}
    </>

    )
}

export default ProductDetailsOne