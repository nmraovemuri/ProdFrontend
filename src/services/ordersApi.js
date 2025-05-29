// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import urls from '../urls';

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: urls.SERVER ,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      headers.set('source_app', 'W');
      return headers;
    },}),
  endpoints: (builder) => ({
    getOrderDetailsByOrderid: builder.query({
        query: (id) => {
          return {
            url: `/client/order_details/${id}`,
            method: "GET"
          }
        }
      }),
    orderSubmitData: builder.mutation({
        query: (data) => {
          return {
            url: `/client/ordersubmit`,
            method: "POST",
            body:data
          }
        }
      }),
      
      
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetOrderDetailsByOrderidQuery,
  useOrderSubmitDataMutation
} = ordersApi;
