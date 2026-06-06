import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from '#/shared/http/client'
import { ApiControllers } from '#/shared/http/api-controllers'
import type {
  AttributeOption,
  Category,
  CreatedProductResponse,
  FilterOption,
  ImageModel,
  ProductAttributes,
  ProductDetails,
  SimilarProduct,
} from './models'
import type {
  ProductSearchRequest,
  ProductSearchResponse,
} from '#/features/users/search.models'

const STALE_REFERENCE = 5 * 60 * 1000 // 5 min for reference data

export const categoriesWithTotalsQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'categories', 'totals'] as const,
    queryFn: () => fetchWithAuth<FilterOption[]>(`${ApiControllers.PRODUCTS}/categories/totals/`),
    staleTime: STALE_REFERENCE,
  })

export const brandsWithTotalsQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'brands', 'totals'] as const,
    queryFn: () => fetchWithAuth<FilterOption[]>(`${ApiControllers.PRODUCTS}/brands/totals/`),
    staleTime: STALE_REFERENCE,
  })

export const sizesWithTotalsQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'sizes', 'totals'] as const,
    queryFn: () => fetchWithAuth<FilterOption[]>(`${ApiControllers.PRODUCTS}/sizes/totals/`),
    staleTime: STALE_REFERENCE,
  })

export const allCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'categories'] as const,
    queryFn: () => fetchWithAuth<Category[]>(`${ApiControllers.PRODUCTS}/categories/`),
    staleTime: STALE_REFERENCE,
  })

export const allBrandsQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'brands'] as const,
    queryFn: () => fetchWithAuth<AttributeOption[]>(`${ApiControllers.PRODUCTS}/brands/`),
    staleTime: STALE_REFERENCE,
  })

export const allSizesQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'sizes'] as const,
    queryFn: () => fetchWithAuth<AttributeOption[]>(`${ApiControllers.PRODUCTS}/sizes/`),
    staleTime: STALE_REFERENCE,
  })

export const allColoursQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'colours'] as const,
    queryFn: () => fetchWithAuth<AttributeOption[]>(`${ApiControllers.PRODUCTS}/colours/`),
    staleTime: STALE_REFERENCE,
  })

export const allGendersQueryOptions = () =>
  queryOptions({
    queryKey: ['products', 'genders'] as const,
    queryFn: () => fetchWithAuth<AttributeOption[]>(`${ApiControllers.PRODUCTS}/genders/`),
    staleTime: STALE_REFERENCE,
  })

export const productDetailsQueryOptions = (uuid: string) =>
  queryOptions({
    queryKey: ['products', uuid] as const,
    queryFn: () => fetchWithAuth<ProductDetails>(`${ApiControllers.PRODUCTS}/${uuid}/`),
  })

export const productImagesQueryOptions = (uuid: string) =>
  queryOptions({
    queryKey: ['products', uuid, 'images'] as const,
    queryFn: () => fetchWithAuth<ImageModel[]>(`${ApiControllers.PRODUCTS}/${uuid}/images/`),
  })

export const similarProductsQueryOptions = (uuid: string) =>
  queryOptions({
    queryKey: ['products', uuid, 'similar'] as const,
    queryFn: () =>
      fetchWithAuth<SimilarProduct[]>(`${ApiControllers.PRODUCTS}/${uuid}/similar-products/`),
    staleTime: 2 * 60 * 1000,
  })

export const productAttributesQueryOptions = (uuid: string) =>
  queryOptions({
    queryKey: ['products', uuid, 'attributes'] as const,
    queryFn: () =>
      fetchWithAuth<ProductAttributes>(`${ApiControllers.PRODUCTS}/${uuid}/attributes/`),
  })

// Mutation fns

export const searchProducts = (request: ProductSearchRequest) =>
  fetchWithAuth<ProductSearchResponse>(`${ApiControllers.PRODUCTS}/search/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const createProduct = (formData: FormData) =>
  fetchWithAuth<CreatedProductResponse>(`${ApiControllers.PRODUCTS}/create/`, {
    method: 'POST',
    body: formData,
  })

export const updateProduct = ({ uuid, formData }: { uuid: string; formData: FormData }) =>
  fetchWithAuth<ProductDetails>(`${ApiControllers.PRODUCTS}/${uuid}/update/`, {
    method: 'PUT',
    body: formData,
  })
