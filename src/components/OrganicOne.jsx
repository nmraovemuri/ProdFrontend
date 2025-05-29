import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useGetAllTopDealsProductByPercentageQuery } from '../services/poductsApi';

const OrganicOne = () => {
    const { isLoading, data } = useGetAllTopDealsProductByPercentageQuery(50); // Fetch top deals with 50% discount
    
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
        <section className="organic-food py-80">
            <div className="container container-lg">
                <div className="section-heading">
                    <div className="flex-between flex-wrap gap-8">
                        <h5 className="mb-0">
                            Top Savers Today
                            <span className="product-card__badge bg-danger-600 px-8 py-4 text-lg text-white">50% OFF</span>
                        </h5>
                        <h5 className="mb-0">Organic Food</h5>
                        <div className="flex-align mr-point gap-16">
                            <Link
                                to="/shop"
                                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                            >
                                All Categories
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="organic-food__slider arrow-style-two">
                    <Slider {...settings}>
                        {isLoading && <b>Loading...</b>}
                        {!isLoading &&
                            data?.data?.map((cat) => (
                                <div key={cat.product_id} className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                    <span className="product-card__badge bg-danger-600 px-8 py-4 text-lg text-white">50% OFF</span>
                                    <Link to={`/product-details/${cat.product_id}/${cat.unit_id}`} className="product-card__thumb flex-center">
                                        <img src={`${cat.product_img_200}`} alt={cat.product_name} />
                                    </Link>
                                    <div className="product-card__content mt-12">
                                        <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                            <Link to={`/product-details/${cat.product_id}/${cat.unit_id}`} className="link text-line-2">
                                                {cat.product_name}
                                            </Link>
                                        </h6>
                                        <div className="flex-align gap-4">
                                            <span className="text-main-600 text-md d-flex">
                                                <i className="ph-fill ph-storefront" />
                                            </span>
                                            <span className="text-gray-500 text-xs">By {cat.brand}</span>
                                        </div>
                                        <div className="flex-between gap-8 mt-24 flex-wrap">
                                            <div className="product-card__price">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through d-block">
                                                    ₹{cat.mrp}
                                                </span>
                                                <span className="text-heading text-md fw-semibold">
                                                    ₹{cat.sale_price} <span className="text-gray-500 fw-normal">/{cat.unit_value} {cat.unit_type}</span>
                                                </span>
                                            </div>
                                            <Link to="/cart" className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8">
                                                Add <i className="ph ph-shopping-cart" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default OrganicOne;