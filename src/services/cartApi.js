// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://148.135.137.53:4000/' ,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers;
    },}),
  endpoints: (builder) => ({
    addCartdetails: builder.mutation({
        query: (data) => {
          return {
            url: "/addCartDetailsByUser",
            method: "POST",
            body: data
          }
        }
      }),
    getCardDetailsByUserid: builder.query({
        query: (id) => {
          return {
            url: `/getCartDetailsByUser/${id}`,
            method: "GET"
          }
        }
      }),
      changeQuantityById: builder.mutation({
        query: (data) => {
          return {
            url: `/ChangeQuantityById`,
            method: "POST",
            body:data
          }
        }
      }),
      deleteCartById: builder.mutation({
        query: (id) => {
          return {
            url: `/deleteCartDetailsById/${id}`,
            method: "DELETE"
          }
        }
      }),
      deleteCartByUserId: builder.mutation({
        query: (id) => {
          return {
            url: `/deleteCartDetailsByUserId/${id}`,
            method: "DELETE"
          }
        }
      })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useAddCartdetailsMutation,
  useGetCardDetailsByUseridQuery,
  useChangeQuantityByIdMutation,
  useDeleteCartByIdMutation,
  useLazyGetCardDetailsByUseridQuery,
  useDeleteCartByUserIdMutation
} = cartApi;
