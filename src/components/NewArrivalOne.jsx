import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
//import { useGetAllProductsNewArrivalsQuery } from '../services/productsApi'; // Fixed typo here
import { CartContext } from './CartContext';
import { useGetAllProductsNewArrivalsQuery } from '../services/poductsApi';
import { useAddCartdetailsMutation, useLazyGetCardDetailsByUseridQuery } from '../services/cartApi';

const NewArrivalOne = () => {
    const { isLoading, data } = useGetAllProductsNewArrivalsQuery();
    const { addToCart,setCart } = useContext(CartContext);
    var [addCartfn]=useAddCartdetailsMutation()
    const navigate = useNavigate();
    const [getAllCartDetailsfn] = useLazyGetCardDetailsByUseridQuery();
 
    const handleAddToCart = async(product) => {
        if(window.localStorage.getItem('customer_id'))
        {
            var customerId=window.localStorage.getItem('customer_id');
            try {
                await addCartfn({
                    user_id: customerId,
                    product_id: product.product_id,
                    unit_id: product.unit_id,
                    quantity: 1, 
                }).unwrap();
                const response = await getAllCartDetailsfn(customerId).unwrap(); 
                if (response?.data) {
                    setCart(response.data); 
                }
               
            } catch (error) {
                console.error('Error adding to cart:', error?.data || error);
                alert('Failed to add product to cart. Please try again.');
            }
        }
        else{
            addToCart(product);
        } 
        navigate('/cart'); // Navigate to cart after adding product
    };

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-right" />
            </button>
        );
    }
    
    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="new-arrival pb-80">
            <div className="container container-lg">
                <div className="section-heading">
                    <div className="flex-between flex-wrap gap-8">
                        <h5 className="mb-0">New Arrivals</h5>
                        <div className="flex-align mr-point gap-16">
                            {/* Uncomment if you want to add a link to view all arrivals
                            <Link
                                to="/shop"
                                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                            >
                                View All Deals
                            </Link>
                            */}
                        </div>
                    </div>
                </div>
                <div className="new-arrival__slider arrow-style-two">
                    <Slider {...settings}>
                        {isLoading && <b>Loading...</b>}
                        {!isLoading && data?.data?.map((product) => (
                            <div key={product.product_id} className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                <Link
                                    to={`/product-details/${product.product_id}/${product.unit_id}`}
                                    className="product-card__thumb flex-center"
                                >
                                    <img src={product.product_img_400} alt={product.product_name} />
                                </Link>
                                <div className="product-card__content mt-12">
                                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                        <Link to={`/product-details/${product.product_id}/${product.unit_id}`} className="link text-line-2">
                                            {product.product_name}
                                        </Link>
                                    </h6>
                                    <div className="flex-between gap-8 mt-24 flex-wrap">
                                        <div className="product-card__price">
                                            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through d-block">
                                                ₹{product.mrp}
                                            </span>
                                            <span className="text-heading text-md fw-semibold">
                                                ₹{product.sale_price} <span className="text-gray-500 fw-normal">/{product.unit_value} {product.unit_type}</span>
                                            </span>
                                        </div>
                                        <button className="product-card__cart btn btn-main py-11 px-24 rounded-pill flex-align gap-8" onClick={() => handleAddToCart(product)}>
                                            Add <i className="ph ph-shopping-cart" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default NewArrivalOne;