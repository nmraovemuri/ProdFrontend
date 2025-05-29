// utils/cart.js
export const saveCartToLocal = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const getCartFromLocal = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };
  