// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../services/poductsApi';
import { customerApi } from '../services/customerApi'; 
import { cartApi } from '../services/cartApi';
import { ordersApi } from '../services/ordersApi';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer, 
    [cartApi.reducerPath]: cartApi.reducer, 
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(customerApi.middleware)
      .concat(cartApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch);

