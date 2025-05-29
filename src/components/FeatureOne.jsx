import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useGetAllCategoriesQuery } from '../services/poductsApi';

const FeatureOne = () => {
    var {isLoading,data}=useGetAllCategoriesQuery();
    console.log("categories",data);
    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
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
                className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
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
        slidesToShow: 10,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1699,
                settings: {
                    slidesToShow: 9,
                },
            },
            {
                breakpoint: 1599,
                settings: {
                    slidesToShow: 8,
                },
            },
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 359,
                settings: {
                    slidesToShow: 1,
                },
            },

        ],
    };
    return (
        <div className="feature" id="featureSection">
            <div className="container container-lg">
                <div className="position-relative arrow-center">
                    <div className="flex-align">
                        <button
                            type="button"
                            id="feature-item-wrapper-prev"
                            className="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
                        >
                            <i className="ph ph-caret-left" />
                        </button>
                        <button
                            type="button"
                            id="feature-item-wrapper-next"
                            className="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
                        >
                            <i className="ph ph-caret-right" />
                        </button>
                    </div>
                    <div className="feature-item-wrapper">
                        <Slider {...settings}>
                        {
                            isLoading && <b>Loading...</b>
                        }
                        {
                            !isLoading &&
                                    data?.data?.map((cat)=>{
                                        return (
                                                <div className="feature-item text-center">
                                                        <div className="feature-item__thumb rounded-circle">
                                                            <Link to={`/shop/${cat.category_name}/${cat.sub_category_name}/${cat.subcatid}`} className="w-100 h-100 flex-center">
                                                                <img src={`${cat.category_img}`} alt="" />
                                                            </Link>
                                                        </div>
                                                        <div className="feature-item__content mt-16">
                                                            <h6 className="text-lg mb-8">
                                                                <Link to={`/shop/${cat.category_name}/${cat.sub_category_name}/${cat.subcatid}`} className="text-inherit">
                                                                    {cat.category_name}
                                                                </Link>
                                                            </h6>
                                                            <span className="text-sm text-gray-400">{cat.productcount}+ Products</span>
                                                        </div>
                                                    </div>
                                        );
                                    })
                                
                                
                            }
                            
                            
                        </Slider>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FeatureOne