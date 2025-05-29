import React, { useContext, useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetAllSubCategoriesByCategoriesQuery, useSearchStringsMutation } from "../services/poductsApi";
import { useFormik } from "formik";
import './HeaderOne.css';
import { CartContext } from "./CartContext";

const HeaderOne = () => {
  const [isOpen, setIsOpen] = useState(false);
  var {cart,clearCart} = useContext(CartContext)
  var navigate=useNavigate()
  const [scroll, setScroll] = useState(false);
  var {isLoading,data}=useGetAllSubCategoriesByCategoriesQuery()
  var [findSearchStringsfn]=useSearchStringsMutation()
  var customerId=window.localStorage.getItem('customer_id')
   const onLogout = () => {
      localStorage.removeItem('customer_id');
      localStorage.removeItem('token');
        localStorage.clear();
        clearCart();
        navigate('/');
      };

  var searchform=useFormik({
    initialValues: {
      searchtext: ''
    },
    onSubmit: values => {
        navigate(`/search/${values.searchtext}`)
    },
  });
  // Set scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset > 150);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initialize Select2
  useEffect(() => {
    const selectElement = query(".js-example-basic-single");
    selectElement.select2();
    
    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  // Default language and currency
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency) => setSelectedCurrency(currency);

  // Menu State
  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => setMenuActive((prev) => !prev);
  
  // Search Control
  const [activeSearch, setActiveSearch] = useState(false);
  const toggleSearch = () => setActiveSearch((prev) => !prev);
  
  // Category Control
  const [activeCategory, setActiveCategory] = useState(false);
  const toggleCategory = () => setActiveCategory((prev) => !prev);
  
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => setActiveIndexCat((prev) => (prev === index ? null : index));
  
  // Mobile Menu Active Index
  //const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };
//   // Navigation Items
// const navItems = [
//   { name: "Home", to: "/", hasSubMenu: false },
//   { name: "Grocery", to: "/shop", hasSubMenu: true },
//   { name: "Snacks & Branded Foods", to: "/snacks", hasSubMenu: true },
//   { name: "Dairy & Bakery", to: "/dairy", hasSubMenu: true },
//   { name: "Home Care", to: "/homecare", hasSubMenu: true },
//   { name: "Personal Care", to: "/personalcare", hasSubMenu: true },
//   { name: "Beverages", to: "/beverages", hasSubMenu: true },
//   { name: "Baby Care", to: "/babycare", hasSubMenu: true },
//   { name: "Fruits & Vegetables", to: "/fruitsandvegetables", hasSubMenu: true },
// ];
  return (
    <>
      <div className='overlay' />
      <div className={`side-overlay ${(menuActive || activeCategory) && "show"}`} />
      
      {/* Search Box */}
      <form  onSubmit={searchform.handleSubmit}  className={`search-box ${activeSearch ? "active" : ""}`}>
        <button onClick={toggleSearch} type='button' className='search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1'>
          <i className='ph ph-x' />
        </button>
        <div className='container'>
          <div className='position-relative'>
            <input type='text' className='form-control py-16 px-24 text-xl rounded-pill pe-64'{...searchform.getFieldProps("searchtext")} placeholder='Search for a product' />
            <button type='submit' className='w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'>
              <i className='ph ph-magnifying-glass' />
            </button>
          </div>
        </div>
      </form>
   
       {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type='button'
          className='close-button'
        >
          <i className='ph ph-x' />{" "}
        </button>
        <div className='mobile-menu__inner'>
          <Link to='/' className='mobile-menu__logo'>
            <img src='assets/images/logo/logo.png' alt='Logo' />
          </Link>
          <div className='mobile-menu__menu'>
            {/* Nav Menu Start */}
            <ul className='nav-menu flex-align nav-menu--mobile'>
              {/* Home Menu */}
              <li>
                <Link to="/" className="nav-menu__link">
                  Home
                </Link>
                
              </li>

              

               {!isLoading && data?.data?.map((cat,index) => (
              <li
                onClick={() => handleMenuClick(index)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === index ? "d-block" : ""
                }`}
              >
                {/* <span className='badge-notification bg-warning-600 text-white text-sm py-2 px-8 rounded-4'>
                  New
                </span> */}
                <Link to='#' className='nav-menu__link'>
                      {cat.category_name}

                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === index ? "open" : ""
                  }`}
                >
                  {cat?.subcategories?.map((subcat) => (
                  <li className='common-dropdown__item nav-submenu__item'>
                    <Link
                      to={`/shop/${cat.category_name}/${subcat.sub_category_name}/${subcat.subcategory_id}`}
                      className='common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                      onClick={() => {setActiveIndex(null);setMenuActive(false);}}
                    >
                      {" "}
                      {subcat.sub_category_name}
                    </Link>
                  </li>
                  ))}
                </ul>
              </li>

                ))}

              

              
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}

      {/* Header Top */}
     

      {/* Header Middle */}
      <header className={`header-middle bg-color-one border-bottom border-gray-100`}>
        <div className='container container-lg'>
          <nav className='header-inner flex-between'>
            <div className='logo'>
              <Link to='/' className='link'>

                <img src='/assets/images/logo/logo.png' alt='Logo' />

              </Link>
            </div>

            {/* Search Form Location */}

            <form onSubmit={searchform.handleSubmit} className='flex-align flex-wrap form-location-wrapper'>
              <div className='search-category d-flex h-48 select-border-end-0 radius-end-0 search-form d-sm-flex '>
             
                  
                    <select defaultValue={0} className='js-example-basic-single border border-gray-200 border-end-0' {...searchform.getFieldProps("location")}>
                    <option value={0}>Choose Location</option>

            
                      <option value={1}>Balangar</option>
                      <option value={2}>Chintal</option>
                      <option value={3}>Jagdigirigutta</option>
                      <option value={4}>Pragathi Nagar</option>
                      <option value={5}>Jeedimetla</option>
                      <option value={6}>Suchitra</option>
                      <option value={7}>Shapur</option>
                      <option value={8}>Gandi Misamma</option>
                      <option value={9}>Kompally</option>
                    </select>
                <div className='search-form__wrapper position-relative d-lg-block d-none'>
                  <input type='text' className='search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44' {...searchform.getFieldProps("searchtext")} placeholder='Search the product in your city' />
                  <button  type='submit' className='w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'>
                    <i className='ph ph-magnifying-glass' />
                  </button>
                </div>
              </div>
            </form>

            {/* Header Middle Right */}
            <div className='header-right flex-align d-lg-block d-none'>
              {/* <div className="me-16 d-lg-none d-block"> */}
              <div className='flex-align flex-wrap gap-12 '>
                
                {/* <Link to='/wishlist' className='flex-align gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className='ph ph-heart' />
                    <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>2</span>
                  </span>
                  <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>Wishlist</span>
                </Link> */}
                <Link to='/cart' className='flex-align gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className='ph ph-shopping-cart-simple' />
                    <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>{cartItemCount }</span>
                  </span>
                  <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>Cart</span>
                </Link>

                {customerId ? (
                  <>
                  <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                  <button
                    className="btn  dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    id="accountDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded={isOpen}
                  >
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className="ph ph-user"></i>
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>My Account<span>{isOpen ? '▲' : '▼'}</span></span>
                  </button>

                  <ul className={` text-md text-gray-500 dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`} aria-labelledby="accountDropdown">
                  <li><Link className="dropdown-item" to="/my-profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/my-address">My Address</Link></li>
                  <li><Link className="dropdown-item" to="/orderlist">Order List</Link></li>
                  <li><Link className="dropdown-item" to="/changepassword">Change Password</Link></li>
                  <li><Link className="dropdown-item text-danger" onClick={onLogout}>Logout</Link></li>
                  </ul>
                  </div>
                
                  {/* <Link to='/logout' className='flex-align gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className='ph ph-user' />
                  
                  </span>
                  <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                    Logout
                  </span>
                </Link> */}
                </>
              ):(
                <Link to='/account' className='flex-align gap-4 item-hover'>
                <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                  <i className='ph ph-user' />
                
                </span>
                <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                  Login/Register
                </span>
              </Link>
              )
              }


              </div>
              {/* </div> */}
            </div>
          </nav>
        </div>
      </header>

      {/* Header Fixed */}
      
      <header className={`header bg-white border-bottom border-gray-100 ${scroll ? "fixed-header" : ""}`}>
        <div className='container container-lg'>
          <nav className='header-inner d-flex justify-content-between gap-8'>
            <div className='flex-align menu-category-wrapper'>
              {/* /* Category Dropdown */}
               <div className='category on-hover-item'>
                {/* <button onClick={toggleCategory} type='button' className='category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-heading'>
                  <span className='icon text-2xl d-xs-flex d-none'><i className='ph ph-dots-nine' /></span>
                  <span className='d-sm-flex d-none'>All</span> Categories
                  <span className='arrow-icon text-xl d-flex'><i className='ph ph-caret-down' /></span>
                </button> */}
                <div className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper ${activeCategory ? "active" : ""}`}>
                  {/* Close Button */}
                   <button onClick={() => { toggleCategory(); setActiveIndexCat(null); }} type='button' className='close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex'>
                    <i className='ph ph-x' />
                  </button>
                  <div className='logo px-16 d-lg-none d-block'>
                    <Link to='/' className='link'>
                      <img src='/assets/images/logo/logo.png' alt='Logo' />
                    </Link>
                  </div>
                  {/* <ul className='scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto'>
                    {[ 
                      { title: 'Vegetables & Fruit', icon: 'ph-carrot', links: ['Potato & Tomato', 'Cucumber & Capsicum', 'Leafy Vegetables', 'Root Vegetables', 'Beans & Okra', 'Cabbage & Cauliflower', 'Gourd & Drumstick', 'Specialty'] },
                      { title: 'Beverages', icon: 'ph-brandy', links: ['Soda & Cocktail Mix', 'Sports & Energy Drinks', 'Non-Alcoholic Drinks', 'Packaged Water', 'Spring Water', 'Flavoured Water'] },
                      { title: 'Meats & Seafood', icon: 'ph-brandy', links: ['Fresh Meat', 'Frozen Meat', 'Marinated Meat', 'Fresh & Frozen Meat'] },
                      { title: 'Breakfast & Dairy', icon: 'ph-brandy', links: ['Oats & Porridge', 'Kids Cereal', 'Muesli', 'Flakes', 'Granola & Cereal Bars', 'Instant Noodles'] },
                      { title: 'Frozen Foods', icon: 'ph-brandy', links: ['Instant Noodles', 'Hakka Noodles', 'Cup Noodles', 'Vermicelli', 'Instant Pasta'] },
                      { title: 'Biscuits & Snacks', icon: 'ph-brandy', links: ['Salted Biscuits', 'Marie, Health, Digestive', 'Cream Biscuits & Wafers', 'Glucose & Milk biscuits', 'Cookies'] },
                      { title: 'Grocery & Staples', icon: 'ph-brandy', links: ['Lemon, Ginger & Garlic', 'Indian & Exotic Herbs', 'Organic Vegetables', 'Organic Fruits', 'Organic Dry Fruits', 'Organic Dals & Pulses', 'Organic Millet & Flours'] },
                    ].map((cat, index) => (
                      <li key={index} onClick={() => handleCatClick(index)} className={`has-submenus-submenu ${activeIndexCat === index ? "active" : ""}`}>
                        <Link to='#' className='text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0'>
                          <span className='text-xl d-flex'><i className={`ph ${cat.icon}`} /></span>
                          <span>{cat.title}</span>
                          <span className='icon text-md d-flex ms-auto'><i className='ph ph-caret-right' /></span>
                        </Link>
                        <div className={`submenus-submenu py-16 ${activeIndexCat === index ? "open" : ""}`}>
                          <h6 className='text-lg px-16 submenus-submenu__title'>{cat.title}</h6>
                          <ul className='submenus-submenu__list max-h-300 overflow-y-auto scroll-sm'>
                            {cat.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link to='/shop'>{link}</Link>
                              </li>
                            ))}
                          </ul> */}
                        {/* </div> 
                       </li>
                    ))}
                  </ul> */}
                </div>
              </div> 
              {/* Menu Start */}
              {/* <div class="navbar">
             <a href="#">Personal Care</a>
          <a href="#">Beverages</a>
          <a href="#"> Baby Care </a>
          <a href="#"> Fruits & Vegetables </a>
          
            </div> */}

              
              <div className='header-menu d-lg-block d-none'>
                <ul className="nav-menu flex-align">

                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/" className="nav-menu__link">Home</Link>
                  </li>
                  {!isLoading && data?.data?.map((cat) => (
                      <li key={cat.category_id} className='on-hover-item nav-menu__item has-submenu'>
                        <Link to='#' className='nav-menu__link'>{cat.category_name}</Link>
                        <ul className='on-hover-dropdown common-dropdown nav-submenu scroll-sm'>
                          {cat?.subcategories?.map((subcat) => (
                            <li key={subcat.subcategory_id} className='common-dropdown__item nav-submenu__item'>
                              <NavLink 
                                to={`/shop/${cat.category_name}/${subcat.sub_category_name}/${subcat.subcategory_id}`} // or your route structure
                                className={({ isActive }) =>
                                  isActive
                                    ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                                    : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                                }
                              >
                                {subcat.sub_category_name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}

                                    
                                         </ul>
                                       

                  

                    </div>
                  
              {/* Menu End */}
            </div>

            {/* Header Right */}
             <div className='header-right flex-align'>
              {/* <Link to='/tel:+91-9989-385-332' className='bg-main-600 text-white p-12 h-100 hover-bg-main-800 flex-align gap-8 text-lg d-lg-flex d-none'>
                <div className='d-flex text-32'><i className='ph ph-phone-call' /></div> +91-9989 385 332
              </Link> */}
               <div className='me-16 d-lg-none d-block'>
                <div className='flex-align flex-wrap gap-12'>
                  <button onClick={toggleSearch} type='button' className='search-icon flex-align d-lg-none d-flex gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative item-hover__text'>
                      <i className='ph ph-magnifying-glass' />
                    </span>
                  </button>
                  {customerId ? (
                  <>
                  <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                  <button
                    className="btn  dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    id="accountDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded={isOpen}
                  >
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className="ph ph-user"></i>
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>My Account<span>{isOpen ? '▲' : '▼'}</span></span>
                  </button>

                  <ul className={` text-md text-gray-500 dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`} aria-labelledby="accountDropdown">
                  <li><Link className="dropdown-item" to="/my-profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/my-address">My Address</Link></li>
                  <li><Link className="dropdown-item" to="/orderlist">Order List</Link></li>
                  <li><Link className="dropdown-item" to="/changepassword">Change Password</Link></li>
                  <li><Link className="dropdown-item text-danger" onClick={onLogout}>Logout</Link></li>
                  </ul>
                  </div>
                
                
                </>
              ):(
                <Link to='/account' className='flex-align gap-4 item-hover'>
                <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                  <i className='ph ph-user' />
                
                </span>
                <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                  Login/Register
                </span>
              </Link>
              )
              }
                  <Link to='/cart' className='flex-align gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                      <i className='ph ph-shopping-cart-simple' />
                      <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>{cartItemCount }</span>
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>Cart</span>
                  </Link>
                </div>
              </div> 
              {/* <div className='me-16 d-lg-none d-block'>
              <Link to='/cart' className='flex-align gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className='ph ph-shopping-cart-simple' />
                    <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>{cartItemCount }</span>
                  </span>
                  <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>Cart</span>
                </Link>
              {customerId ? (
                  <>
                  <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                  <button
                    className="btn  dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    id="accountDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded={isOpen}
                  >
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className="ph ph-user"></i>
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>My Account<span>{isOpen ? '▲' : '▼'}</span></span>
                  </button>

                  <ul className={` text-md text-gray-500 dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`} aria-labelledby="accountDropdown">
                  <li><Link className="dropdown-item" to="/my-profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/my-address">My Address</Link></li>
                  <li><Link className="dropdown-item" to="/orderlist">Order List</Link></li>
                  <li><Link className="dropdown-item" to="/changepassword">Change Password</Link></li>
                  <li><Link className="dropdown-item text-danger" onClick={onLogout}>Logout</Link></li>
                  </ul>
                  </div>
                
                
                </>
              ):(
                <Link to='/account' className='flex-align gap-4 item-hover'>
                <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                  <i className='ph ph-user' />
                
                </span>
                <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                  Login/Register
                </span>
              </Link>
              )
              }
              </div> */}
               <button onClick={toggleMenu} type='button' className='toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex'>
                <i className='ph ph-list' />
              </button> 
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default HeaderOne;