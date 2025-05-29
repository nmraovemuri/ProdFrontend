// CartContext.js (example)
import React, { createContext, useState, useEffect } from 'react';
import { getCartFromLocal, saveCartToLocal } from '../utils/cart';
import { useDeleteCartByIdMutation, useGetCardDetailsByUseridQuery, useLazyGetCardDetailsByUseridQuery } from '../services/cartApi';
import { skipToken } from '@reduxjs/toolkit/query';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const customerId = window.localStorage.getItem('customer_id');
    const isLoggedIn = !!customerId;
   var [deleteCartfn]= useDeleteCartByIdMutation()
   var [getAllCartDetailsfn]=useLazyGetCardDetailsByUseridQuery(customerId ? customerId : skipToken);
   const { data: serverCart, isLoading } = useGetCardDetailsByUseridQuery(
           customerId ? customerId : skipToken
         );
    
    useEffect(() => {
            if (isLoggedIn && serverCart) {
              setCart(serverCart.data);
            } else {
                const localCart = getCartFromLocal();
                setCart(localCart);
            }
           // subtotal = currentCart.reduce((acc, item) => acc + item.quantity * item.sale_price, 0);
        }, [isLoggedIn, serverCart]);

    const addToCart = (product) => {
        const updatedCart = [...cart];
        const existing = updatedCart.find(p => p.product_id === product.product_id && p.unit_id === product.unit_id);
        const qtyToAdd = product.quantity ?? 1;

        if (existing) {
            existing.quantity += qtyToAdd;
        } else {
            updatedCart.push({ ...product, quantity: qtyToAdd });
        }
        setCart(updatedCart);
        saveCartToLocal(updatedCart);
    };
 
    const updateQuantity = (productId, unitId, quantity) => {
      const updatedCart = cart?.map((item) => {
        if (item.product_id === productId && item.unit_id === unitId) {
          return { ...item, quantity };
        }
        return item;
      });
      setCart(updatedCart);
      if(!isLoggedIn)
      saveCartToLocal(updatedCart);
    };

    const removeFromCart = async(cartId, productId, unitId) => {
      if (isLoggedIn && customerId) {
        try {
            await deleteCartfn(cartId).unwrap(); // delete from backend
            const response = await getAllCartDetailsfn(customerId).unwrap(); // fetch updated cart
            if (response?.data) {
                setCart(response.data); // ✅ set cart with new data
            }
        } catch (error) {
            console.error("Error during cart removal:", error);
        }
    } else {
        const updatedCart = cart.filter(
            (item) => !(item.product_id === productId && item.unit_id === unitId)
        );
        setCart(updatedCart);
        saveCartToLocal(updatedCart);
    }
    };

    const clearCart = () => {
    setCart([]);
    //saveCartToLocal([]); // clear local storage as well
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity,removeFromCart,clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


