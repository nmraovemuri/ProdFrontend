import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear customer_id from localStorage
    localStorage.removeItem('customer_id'); 

    // Redirect to login page
    navigate('/account');
  }, [navigate]);

  return null;
};

export default Logout;
