import { 
    AllAttributeOptions,
    AttributeOption,
    Brand,
    BrandsWithTotals, 
    CategoriesWithTotals, 
    Category, 
    CreatedProductResponse, 
    CreateProductRequest, 
    DiscountsWithTotals, 
    MutateProductRequest, 
    PostProductCommentRequest, 
    ProductAttributes, 
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
        getProductAttributesById: builder.query<ProductAttributes, string>({
			query: (uuid:string) => {
                return {
                    url:`${ApiControllers.PRODUCTS}/${uuid}/attributes/`,
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
        getAllAttributes:builder.query<AllAttributeOptions,void>({
            query:() =>{
				return {
					url:`${ApiControllers.PRODUCTS}/all-attributes/`,
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
        createProduct:builder.mutation<CreatedProductResponse,CreateProductRequest>({
            query: ( request:CreateProductRequest)=>{
                const formData = toFormData(request);
                return {
					url: `${ApiControllers.PRODUCTS}/create/`,
					method: 'POST',
					body: formData ,
				}
            }
        }),
        updateProduct:builder.mutation<ProductDetails,{uuid:string, request:UpdateProductRequest}>({
            query: ( {uuid,request})=>{
                const formData = toFormData(request);
                return {
					url: `${ApiControllers.PRODUCTS}/${uuid}/update/`,
					method: 'PUT',
					body: formData ,
				}
            }
        })
    }),
     // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
});

const toFormData=(request: MutateProductRequest): FormData=>{
    const {
        images,
        availabilityStatus,
        brand,
        categories,
        colors,
        gender,
        inventory,
        price,
        publishStatus,
        publishedDate,
        sizes,
        sku,
        title,
        careInstructions,
        content,
        fabricDetails
    } = request;
    const formData = new FormData();
    formData.append('availabilityStatus',availabilityStatus);
    formData.append('brand',String(brand));
    formData.append('gender',String(gender));
    formData.append('inventory',String(inventory));
    formData.append('price',String(price));
    formData.append('publishStatus',publishStatus);
    formData.append('publishedDate',publishedDate);
    formData.append('sku',sku);
    formData.append('title',title);
    if(content){
        formData.append('content',content);
    }
    if(careInstructions){
        formData.append('careInstructions',careInstructions);
    }
    if(fabricDetails){
        formData.append('fabricDetails',fabricDetails);
    }
    
    for (const category of categories){
        formData.append('categories',String(category));
    }

    for (const color of colors){
        formData.append('colors',String(color));
    }

    for (const size of sizes){
        formData.append('sizes',String(size));
    }
    
    for (const image of images){
        formData.append('images',image);
    }
    return formData;
}

export const {
    useLazyGetBrandsWithTotalsQuery,
    useLazyGetDiscountsWithTotalsQuery,
    useLazyGetCategoriesWithTotalsQuery,
    useLazyGetSizesWithTotalsQuery,
    useLazyGetProductDetailsQuery,
    useLazyGetProductImagesQuery,
    useLazyGetSimilarProductsByIdQuery,
    useLazyGetProductAttributesByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    usePostProductCommentMutation,
    useSearchProductsMutation,
    useLazyGetAllCategoriesQuery,
    useLazyGetAllAttributesQuery,
    useLazyGetAllBrandsQuery,
    useLazyGetAllSizesQuery,
    useLazyGetAllColoursQuery,
    useLazyGetAllGendersQuery,
} = productsApiSlice;