import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from '#/shared/http/client'
import { ApiControllers } from '#/shared/http/api-controllers'
import type {
  AddToWishlistRequest,
  DeleteWishlistItemRequest,
  WishlistItem,
} from './models'

export const userWishlistQueryOptions = (q?: string) =>
  queryOptions({
    queryKey: ['wishlist', q] as const,
    queryFn: () => {
      const params = q ? `?q=${encodeURIComponent(q)}` : ''
      return fetchWithAuth<WishlistItem[]>(`${ApiControllers.WISHLIST}/search/${params}`)
    },
  })

// Mutation fns

export const addToWishlist = (items: AddToWishlistRequest[]) =>
  fetchWithAuth<WishlistItem[]>(`${ApiControllers.WISHLIST}/items/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  })

export const deleteWishlistItems = (items: DeleteWishlistItemRequest[]) =>
  fetchWithAuth<WishlistItem[]>(`${ApiControllers.WISHLIST}/items/delete/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  })
