import { apiSlice } from './apiSlice'
import { ApiControllers } from './apiControllers'
import type {
  AttributeOption,
  Category,
  CreatedProductResponse,
  FilterOption,
  ImageModel,
  ProductAttributes,
  ProductDetails,
  SimilarProduct,
} from '#/models/product.models'
import type {
  ProductSearchRequest,
  ProductSearchResponse,
} from '#/models/search.models'

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.mutation<ProductSearchResponse, ProductSearchRequest>({
      query: (body) => ({
        url: `${ApiControllers.PRODUCTS}/search/`,
        method: 'POST',
        body,
      }),
    }),
    getAllCategories: builder.query<Array<Category>, void>({
      query: () => ({
        url: `${ApiControllers.PRODUCTS}/categories/`,
      }),
    }),
    getCategoriesWithTotals: builder.query<Array<FilterOption>, void>({
      query: () => ({ url: `${ApiControllers.PRODUCTS}/categories/totals/` }),
    }),
    getProductDetails: builder.query<ProductDetails, string>({
      query: (uuid) => ({
        url: `${ApiControllers.PRODUCTS}/${uuid}/`,
      }),
    }),
    getProductImages: builder.query<Array<ImageModel>, string>({
      query: (uuid) => ({
        url: `${ApiControllers.PRODUCTS}/${uuid}/images/`,
      }),
    }),
    getSimilarProductsById: builder.query<Array<SimilarProduct>, string>({
      query: (uuid) => ({
        url: `${ApiControllers.PRODUCTS}/${uuid}/similar-products/`,
      }),
    }),
    getBrandsWithTotals: builder.query<Array<FilterOption>, void>({
      query: () => ({ url: `${ApiControllers.PRODUCTS}/brands/totals/` }),
    }),
    getSizesWithTotals: builder.query<Array<FilterOption>, void>({
      query: () => ({ url: `${ApiControllers.PRODUCTS}/sizes/totals/` }),
    }),
    getAllBrands: builder.query<Array<AttributeOption>, void>({
      query: () => ({ url: `${ApiControllers.PRODUCTS}/brands/` }),
    }),
    getAllSizes: builder.query<Array<AttributeOption>, void>({
      query: () => ({ url: `${ApiControllers.PRODUCTS}/sizes/` }),
    }),
    getAllColours: builder.query<Array<AttributeOption>, void>({
      query: () => ({ url: `${ApiControllers.PRODUCTS}/colours/` }),
    }),
    getAllGenders: builder.query<Array<AttributeOption>, void>({
      query: () => ({ url: `${ApiControllers.PRODUCTS}/genders/` }),
    }),
    getProductAttributes: builder.query<ProductAttributes, string>({
      query: (uuid) => ({ url: `${ApiControllers.PRODUCTS}/${uuid}/attributes/` }),
    }),
    createProduct: builder.mutation<CreatedProductResponse, FormData>({
      query: (formData) => ({
        url: `${ApiControllers.PRODUCTS}/create/`,
        method: 'POST',
        body: formData,
      }),
    }),
    updateProduct: builder.mutation<ProductDetails, { uuid: string; formData: FormData }>({
      query: ({ uuid, formData }) => ({
        url: `${ApiControllers.PRODUCTS}/${uuid}/update/`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
})

export const {
  useSearchProductsMutation,
  useGetAllCategoriesQuery,
  useGetCategoriesWithTotalsQuery,
  useGetProductDetailsQuery,
  useGetProductImagesQuery,
  useGetSimilarProductsByIdQuery,
  useGetBrandsWithTotalsQuery,
  useGetSizesWithTotalsQuery,
  useGetAllBrandsQuery,
  useGetAllSizesQuery,
  useGetAllColoursQuery,
  useGetAllGendersQuery,
  useGetProductAttributesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice
