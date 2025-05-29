import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactSlider from 'react-slider'
import {  useGetAllSubCategoriesByCategoriesQuery, useGetProductsListBySearchStringQuery } from '../services/poductsApi'
import Breadcrumb from './Breadcrumb'
import { useMemo } from 'react'
import { CartContext } from './CartContext'
import { useAddCartdetailsMutation, useLazyGetCardDetailsByUseridQuery } from '../services/cartApi'

const SearchSection = () => {
    var {serachstring}=useParams();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSort, setSelectedSort] = useState(1);
    const { addToCart,setCart } = useContext(CartContext);
    var [addCartfn]=useAddCartdetailsMutation()
    const navigate = useNavigate();
    const [getAllCartDetailsfn] = useLazyGetCardDetailsByUseridQuery()

    var {isLoading: isLoadingProducts,data: productsData}=useGetProductsListBySearchStringQuery(serachstring)
    const [openCategoryId, setOpenCategoryId] = useState(null);
     const {
            isLoading: isLoadingCategories,
            data: categoriesData
          } = useGetAllSubCategoriesByCategoriesQuery();

    let [grid, setGrid] = useState(false)

    let [active, setActive] = useState(false)
    let sidebarController = () => {
        setActive(!active)
    }
    
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

    const brandsList = useMemo(() => {
        if (!productsData || !productsData.data) return []; // Safeguard check for undefined `productsData` or `data`
        const allBrands = productsData?.data?.map((item) => item.product_brand);
        const uniqueBrands = [...new Set(allBrands)];
        return uniqueBrands;
    }, [productsData]);
    
    const filteredProducts = useMemo(() => {
        if (!productsData || !productsData.data) return []; // Safeguard check for undefined `productsData` or `data`
        if (!selectedBrands.length) return productsData.data;
        return productsData.data.filter((product) =>
            selectedBrands.includes(product.product_brand)
        );
    }, [productsData, selectedBrands]);

    const sortProducts = (products) => {
        // Deep copy the products array to avoid direct mutation
        const sortedProducts = JSON.parse(JSON.stringify(products));
    
        switch (selectedSort) {
            case 1:  // Product
                return sortedProducts;
            case 2:  // Price (Low to High)
                return sortedProducts.sort((a, b) => a.sale_price - b.sale_price);
            case 3:  // Price (High to Low)
                return sortedProducts.sort((a, b) => b.sale_price - a.sale_price);
            case 4:  // Discount (High to Low)
                return sortedProducts.sort((a, b) => b.discount_percentage - a.discount_percentage);
            case 5:  // Name (A to Z)
                return sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
            default:
                return sortedProducts;
        }
    };
    

    const sortedProducts = useMemo(() => sortProducts(filteredProducts), [filteredProducts, selectedSort]);
    

        if (isLoadingProducts || !productsData) {
            return <div>Loading...</div>
        }

    return (   
        <>
        {/* <Breadcrumb details={productsData?.details}/> */}
        <section className="shop py-80">
            <div className={`side-overlay ${active && "show"}`}></div>
            <div className="container container-lg">
                <div className="row">
                    {/* Sidebar Start */}
                    <div className="col-lg-3">
                        <div className={`shop-sidebar ${active && "active"}`}>
                            <button onClick={sidebarController}
                                type="button"
                                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                            >
                                <i className="ph ph-x" />
                            </button>
                            <div className="accordion" id="mainAccordion">
                                            {/* Main CATEGORIES Accordion Item */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingCategories">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="true" aria-controls="collapseCategories">
                                                        CATEGORIES
                                                    </button>
                                                </h2>
                                                <div id="collapseCategories" className="accordion-collapse collapse show" aria-labelledby="headingCategories" data-bs-parent="#mainAccordion">
                                                    <div className="accordion-body">
                                                        <div className="accordion" id="categoriesAccordion">
                                                            {!isLoadingCategories && categoriesData?.data?.map((cat) => (
                                                                <div className="accordion-item" key={cat.category_id}>
                                                                    <h2 className="accordion-header" id={`heading-${cat.category_id}`}>
                                                                        <button className={`accordion-button ${openCategoryId === cat.category_id ? '' : 'collapsed'}`} type="button" onClick={() => setOpenCategoryId(prev => prev === cat.category_id ? null : cat.category_id)}>
                                                                            {cat.category_name}
                                                                        </button>
                                                                    </h2>
                                                                    <div id={`collapse-${cat.category_id}`} className={`accordion-collapse collapse ${openCategoryId === cat.category_id ? 'show' : ''}`} aria-labelledby={`heading-${cat.category_id}`} data-bs-parent="#categoriesAccordion">
                                                                        <div className="accordion-body">
                                                                            {cat?.subcategories?.map((subcat) => (
                                                                                <div key={subcat.subcategory_id} className="mb-2">
                                                                                    <Link className="subcategory-link" to={`/shop/${cat.category_name}/${subcat.sub_category_name}/${subcat.subcategory_id}`}>
                                                                                        {subcat.sub_category_name}
                                                                                    </Link>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            
                                        {/* Brands Section (optional - outside accordion) */}
                                        
                                        <div className="accordion" id="subAccordion">
                                            <div className="accordion-item" >
                                                <h5 className="accordion-header" id="headingBrands">
                                                    <button
                                                        className="accordion-button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseBrands"
                                                        aria-expanded="false"
                                                        aria-controls="collapseBrands"
                                                        type="button"
                                                    >
                                                        Brands
                                                    </button>
                                                </h5>
                                            
                                            <div id="collapseBrands" className="accordion-collapse collapse show" aria-labelledby="headingBrands" data-bs-parent="#subAccordion">
                                                <div className="card-body">
                                                {brandsList?.map((brand, idx) => (
                                                            <div key={idx} className="form-check mb-2">
                                                                <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id={`brand-${idx}`}
                                                                checked={selectedBrands.includes(brand)}
                                                                onChange={() => {
                                                                    setSelectedBrands(prev =>
                                                                    prev.includes(brand)
                                                                        ? prev.filter(b => b !== brand)
                                                                        : [...prev, brand]
                                                                    );
                                                                }}
                                                                />
                                                                <label htmlFor={`brand-${idx}`} className="form-check-label">
                                                                {brand}
                                                                </label>
                                                            </div>
                                                            ))}

                                                </div>
                                            </div>
                                            </div>
                                        </div>
                            
                        </div>
                    </div>
                    {/* Sidebar End */}
                    {/* Content Start */}
                    <div className="col-lg-9">
                        {/* Top Start */}
                        <div className="flex-between gap-16 flex-wrap mb-40 ">
                            <span className="text-gray-900">Number of products {filteredProducts?.length}</span>
                            <div className="position-relative flex-align gap-16 flex-wrap">
                                <div className="list-grid-btns flex-align gap-16">
                                    <button onClick={() => setGrid(true)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${grid === true && "border-main-600 text-white bg-main-600"}`}
                                    >
                                        <i className="ph-bold ph-list-dashes" />
                                    </button>
                                    <button onClick={() => setGrid(false)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${grid === false && "border-main-600 text-white bg-main-600"}`}
                                    >
                                        <i className="ph ph-squares-four" />
                                    </button>
                                </div>
                                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                                    <label htmlFor="sorting" className="text-inherit flex-shrink-0">
                                        Sort by:{" "}
                                    </label>
                                    <select
                                        value={selectedSort}
                                        onChange={(e) => setSelectedSort(Number(e.target.value))}
                                        className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                                        id="sorting"
                                    >
                                        <option value={1}>Product</option>
                                        <option value={2}>Price (Low to High)</option>
                                        <option value={3}>Price (High to Low)</option>
                                        <option value={4}>Discount (High to Low)</option>
                                        <option value={5}>Name (A to Z)</option>
                                    </select>
                                </div>
                                <button onClick={sidebarController}
                                    type="button"
                                    className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                                >
                                    <i className="ph-bold ph-funnel" />
                                </button>
                            </div>
                        </div>
                        {/* Top End */}
                        <div className={`list-grid-wrapper ${grid && "list-view"}`}>
                        {
                        isLoadingProducts && <b>Loading...</b>
                    }
                   {
                     !isLoadingProducts && sortedProducts && sortedProducts.length > 0 ? (
                        sortedProducts?.map((cat)=>{
                            return (
                            <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                <Link
                                    to={`/product-details/${cat.product_id}/${cat.unit_id}`}
                                    className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                >
                                    <img
                                        src={`${cat.product_img_200}`}
                                        alt=""
                                        className="w-auto max-w-unset"
                                    />
                                    <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                        Upto {cat.discount_percentage}% off{" "}
                                    </span>
                                </Link>
                                <div className="product-card__content mt-16">
                                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                        <Link
                                            to={`/product-details/${cat.product_id}/${cat.unit_id}`}
                                            className="link text-line-2"
                                            tabIndex={0}
                                        > 
                                           {cat.product_name}
                                        </Link>
                                    </h6>
                                    
                                    <div className="product-card__price my-20">
                                        <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        ₹{cat.mrp}
                                        </span>
                                        <span className="text-heading text-md fw-semibold ">
                                        ₹{cat.sale_price} <span className="text-gray-500 fw-normal">/{cat.unit_value}{cat.unit_type}</span>{" "}
                                        </span>
                                    </div>
                                    <button className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium" onClick={() => handleAddToCart(cat)}>
                                    Add To Cart <i className="ph ph-shopping-cart" /></button>
                                    {/* <Link
                                        to="/cart"
                                        className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                                        tabIndex={0}
                                    >
                                        Add To Cart <i className="ph ph-shopping-cart" />
                                    </Link> */}
                                </div>
                            </div>
                            )
                        })
                    ): (
                        <p>No products available or loading...</p> // In case there are no products or the data is still loading
                    )
                    }
                            
                        </div>
                        
                    </div>
                    {/* Content End */}
                </div>
            </div>
        </section>
        </>
    )
}

export default SearchSection