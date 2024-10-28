import { 
    BrandsWithTotals, 
    CategoriesWithTotals, 
    CreateProductRequest, 
    DiscountsWithTotals, 
    PostProductCommentRequest, 
    ProductDetails, 
    SizesWithTotals, 
    UpdateProductRequest 
} from "@/models/product.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";
import { ProductSearchRequest, ProductSearchResponse } from "@/models/search.models";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getProductDetails: builder.query<ProductDetails, string>({
			query: (uuid) => `${ApiControllers.PRODUCTS}/${uuid}`,
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
        getCategoriesWithTotals:builder.query<CategoriesWithTotals[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/categories/`,
				}
			}
        }),
        getBrandsWithTotals:builder.query<BrandsWithTotals[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/brands/`,
				}
			}
        }),
        getSizesWithTotals:builder.query<SizesWithTotals[],void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/sizes/`,
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
    useCreateProductMutation,
    useUpdateProductMutation,
    usePostProductCommentMutation,
    useSearchProductsMutation
} = productsApiSlice;