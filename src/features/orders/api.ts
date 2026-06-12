import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from '#/shared/http/client'
import { ApiControllers } from '#/shared/http/api-controllers'
import type { Order, OrderList } from './models'

export const userOrdersQueryOptions = () =>
  queryOptions({
    queryKey: ['orders'] as const,
    queryFn: () => fetchWithAuth<OrderList[]>(`${ApiControllers.ORDERS}/`),
  })

export const orderQueryOptions = (uuid: string) =>
  queryOptions({
    queryKey: ['orders', uuid] as const,
    queryFn: () => fetchWithAuth<Order>(`${ApiControllers.ORDERS}/${uuid}/`),
  })

// Mutation fns

export const placeDraftOrders = () =>
  fetchWithAuth<Order[]>(`${ApiControllers.ORDERS}/place-draft/`, { method: 'POST' })

export const postOrderComment = (orderId: number, comment: string) =>
  fetchWithAuth<Order>(`${ApiControllers.ORDERS}/comment/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order_id: orderId, comment }),
  })

export const buyerRejectOrder = (uuid: string) =>
  fetchWithAuth<Order>(`${ApiControllers.ORDERS}/${uuid}/buyer-reject`, { method: 'PUT' })

export const supplierRejectOrder = (uuid: string) =>
  fetchWithAuth<Order>(`${ApiControllers.ORDERS}/${uuid}/supplier-reject`, { method: 'PUT' })

export const approveOrder = (uuid: string) =>
  fetchWithAuth<Order>(`${ApiControllers.ORDERS}/${uuid}/approve`, { method: 'PUT' })

export const shipOrder = (uuid: string) =>
  fetchWithAuth<Order>(`${ApiControllers.ORDERS}/${uuid}/ship`, { method: 'PUT' })

export const receiveOrder = (uuid: string) =>
  fetchWithAuth<Order>(`${ApiControllers.ORDERS}/${uuid}/receive`, { method: 'PUT' })
