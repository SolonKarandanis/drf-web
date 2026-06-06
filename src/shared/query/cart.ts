import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from './client'
import { ApiControllers } from './api-controllers'
import type {
  AddToCartRequest,
  Cart,
  DeleteCartItemRequest,
  UpdateItemRequest,
} from '#/models/cart.models'

export const cartQueryOptions = () =>
  queryOptions({
    queryKey: ['cart'] as const,
    queryFn: () => fetchWithAuth<Cart>(`${ApiControllers.CART}`),
  })

// Mutation fns

export const addToCart = (items: AddToCartRequest[]) =>
  fetchWithAuth<Cart>(`${ApiControllers.CART}/items/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  })

export const deleteCartItems = (items: DeleteCartItemRequest[]) =>
  fetchWithAuth<Cart>(`${ApiControllers.CART}/items/delete/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  })

export const updateCartItems = (items: UpdateItemRequest[]) =>
  fetchWithAuth<Cart>(`${ApiControllers.CART}/items/update/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  })

export const clearCart = () =>
  fetchWithAuth<Cart>(`${ApiControllers.CART}/clear/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
