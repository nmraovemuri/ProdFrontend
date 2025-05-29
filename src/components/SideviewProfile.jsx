import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CartContext } from './CartContext';

const SideviewProfile = ({ firstName, mobile }) => {
    var navigate=useNavigate()
   var {clearCart} = useContext(CartContext)
    const onLogout = () => {
      localStorage.removeItem('customer_id');
      localStorage.removeItem('token');
        localStorage.clear();
        clearCart();
        navigate('/');
      };
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

     const activeStyle = {
    backgroundColor: '#e96125',
    borderColor: '#e96125',
    color: 'white',
  };
  return (
    
        <div className="col-md-4">
                    <div className="card account-left">
                      <div className="user-profile-header text-center p-3">
                        <img alt="Profile" src="assets/img/user.jpg" className="img-fluid rounded-circle mb-2" width="80" />
                        <h5 className="mb-1 text-secondary" style={{ textTransform: 'capitalize' }}>
                          <strong>Hi </strong>{firstName}
                        </h5>
                        <p>{mobile}</p>
                      </div>
                      <div className="list-group">
                        <a href="/my-profile" className="list-group-item list-group-item-action"
                        style={isActive('/my-profile') ? activeStyle : {}}
                        >
                          <i className="mdi mdi-account-outline"></i> My Profile
                        </a>
                        <a
                          href="/my-address"
                          className="list-group-item list-group-item-action"
                          style={isActive('/my-address') ? activeStyle : {}}
                        >
                          <i className="mdi mdi-map-marker-circle"></i> My Address
                        </a>
                        <a href="/orderlist" className="list-group-item list-group-item-action"
                        style={isActive('/orderlist') ? activeStyle : {}}
                        >
                          <i className="mdi mdi-format-list-bulleted"></i> Order List
                        </a>
                        <a className="list-group-item list-group-item-action" onClick={onLogout}>
                          <i className="mdi mdi-lock"></i> Logout
                        </a>
                      </div>
                    </div>
                  </div>
      
   
  )
}

export default SideviewProfile
