import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import urls from '../urls';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: urls.SERVER }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => {
        return {
          url: "/client/getAllCategories/",
          method: "GET"
        }
      }
    }),
    getAllSubCategories: builder.query({
      query: () => {
        return {
          url: "/client/getAllSubCategories",
          method: "GET"
        }
      }
    }),
    getAllProductBrands: builder.query({
      query: () => {
        return {
          url: "/client/getproductBrands",
          method: "GET"
        }
      }
    }),

    getAllTopDealsProductByPercentage: builder.query({
      query: (id) => {
        return {
          url: `/client/getTopDealsOfDayByPercentage/${id}`,
          method: "GET"
        }
      }
    }),
    getAllProductsNewArrivals: builder.query({
      query: () => {
        return {
          url: "/client/getAllProductsForNewArrivals",
          method: "GET"
        }
      }
    }),
    getAllSubCategoriesByCategories: builder.query({
      query: () => {
        return {
          url: "/client/getAllSubCategoriesByCategories",
          method: "GET"
        }
      }
    }),
    getAllProductsBySubcatId: builder.query({
      query: (id) => {
        return {
          url: `/client/getAllProductsBySubcatId/${id}`,
          method: "GET"
        }
      }
    }),
    getProductDetailsByIds: builder.query({
      query: ({ id, unit_id }) => {
        return {
          url: `/client/getProductDetailsById/product/${id}/unit/${unit_id}`,
          method: "GET"
        }
      }
    }),
    searchStrings: builder.mutation({
      query: (data) => {
        return {
          url: "/client/getProductsBySearchString",
          method: "POST",
          body: data
        }
      }
    }),
    getProductsListBySearchString: builder.query({
      query: (searchstring) => {
        return {
          url: `/client/getProductsListBySearchString/${searchstring}`,
          method: "GET"
        }
      }
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useGetAllProductBrandsQuery,
  useGetAllTopDealsProductByPercentageQuery,
  useGetAllProductsNewArrivalsQuery,
  useGetAllSubCategoriesByCategoriesQuery,
  useGetAllProductsBySubcatIdQuery,
  useGetProductDetailsByIdsQuery,
  useSearchStringsMutation,
  useGetProductsListBySearchStringQuery
} = productsApi;
