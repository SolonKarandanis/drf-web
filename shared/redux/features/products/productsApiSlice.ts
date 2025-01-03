import { 
    AttributeOption,
    Brand,
    BrandsWithTotals, 
    CategoriesWithTotals, 
    Category, 
    CreateProductRequest, 
    DiscountsWithTotals, 
    PostProductCommentRequest, 
    ProductDetails, 
    SimilarProduct, 
    SimilarProductRequest, 
    SizesWithTotals, 
    UpdateProductRequest 
} from "@/models/product.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";
import { ProductSearchRequest, ProductSearchResponse } from "@/models/search.models";
import { ImageModel } from "@/models/image.models";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getProductDetails: builder.query<ProductDetails, string>({
			query: (uuid) => `${ApiControllers.PRODUCTS}/${uuid}`,
		}),
        getProductImages: builder.query<ImageModel[], string>({
			query: (uuid) => `${ApiControllers.PRODUCTS}/${uuid}/images/`,
		}),
        getSimilarProducts: builder.mutation<SimilarProduct[], SimilarProductRequest>({
			query: (request:SimilarProductRequest) => {
                return {
                    url:`${ApiControllers.PRODUCTS}/similar-products/`,
                    method:'POST',
                    body:request,
                }
            }
		}),
        getSimilarProductsById: builder.query<SimilarProduct[], string>({
			query: (uuid:string) => {
                return {
                    url:`${ApiControllers.PRODUCTS}/${uuid}/similar-products/`,
                    method:'GET',
                }
            }
		}),
        searchProducts: builder.mutation<ProductSearchResponse,ProductSearchRequest>({
            query: ( searchRequest:ProductSearchRequest)=>{
				return {
					url: `${ApiControllers.PRODUCTS}/search/`,
					method: 'POST',
					body: searchRequest ,
				}
			}
        }),
        getAllCategories:builder.query<Category[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/categories/`,
				}
			}
        }),
        getAllBrands:builder.query<Brand[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/brands/`,
				}
			}
        }),
        getAllSizes:builder.query<AttributeOption[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/sizes/`,
				}
			}
        }),
        getAllColours:builder.query<AttributeOption[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/colours/`,
				}
			}
        }),
        getAllGenders:builder.query<AttributeOption[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/genders/`,
				}
			}
        }),
        getCategoriesWithTotals:builder.query<CategoriesWithTotals[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/categories/totals/`,
				}
			}
        }),
        getBrandsWithTotals:builder.query<BrandsWithTotals[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/brands/totals/`,
				}
			}
        }),
        getSizesWithTotals:builder.query<SizesWithTotals[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/sizes/totals/`,
				}
			}
        }),
        getDiscountsWithTotals:builder.query<DiscountsWithTotals[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/discounts/`,
				}
			}
        }),
        postProductComment:builder.mutation<ProductDetails,PostProductCommentRequest>({
            query: ( request:PostProductCommentRequest)=>{
                return {
					url: `${ApiControllers.PRODUCTS}/comment/`,
					method: 'PUT',
					body: request ,
				}
            }
        }),
        createProduct:builder.mutation<ProductDetails,CreateProductRequest>({
            query: ( request:CreateProductRequest)=>{
                
                return {
					url: `${ApiControllers.PRODUCTS}/create/`,
					method: 'POST',
					body: request ,
				}
            }
        }),
        updateProduct:builder.mutation<ProductDetails,{uuid:string, request:UpdateProductRequest}>({
            query: ( {uuid,request})=>{
                return {
					url: `${ApiControllers.PRODUCTS}/${uuid}/update/`,
					method: 'PUT',
					body: request ,
				}
            }
        })
    }),
     // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
});

export const {
    useLazyGetBrandsWithTotalsQuery,
    useLazyGetDiscountsWithTotalsQuery,
    useLazyGetCategoriesWithTotalsQuery,
    useLazyGetSizesWithTotalsQuery,
    useLazyGetProductDetailsQuery,
    useLazyGetProductImagesQuery,
    useLazyGetSimilarProductsByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    usePostProductCommentMutation,
    useSearchProductsMutation,
    useLazyGetAllCategoriesQuery,
    useLazyGetAllBrandsQuery,
    useLazyGetAllSizesQuery,
    useLazyGetAllColoursQuery,
    useLazyGetAllGendersQuery,
} = productsApiSlice;