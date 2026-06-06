import type { ImageModel } from '#/features/products/models'
import type { ProductAttributes } from '#/features/products/models'

export interface CartItemProduct {
  sku: string
  title: string
  uuid: string
}

export interface CartItem {
  id: number
  productDetails: CartItemProduct
  previewImage: ImageModel | null
  modificationAlert: boolean
  quantity: number
  unitPrice: number
  totalPrice: number
  productId: number
  uuid: string
  attributes: Record<number, number>
  productAttributes: ProductAttributes
}

export interface Cart {
  id: number
  modificationAlert: boolean
  totalPrice: number
  dateCreated: string
  dateModified: string
  uuid: string
  cartItems: Array<CartItem>
}

export interface AddToCartRequest {
  productId: number
  quantity: number
  attributes?: string
}

export interface UpdateItemRequest {
  cartItemId: number
  productId: number
  quantity?: number
  attributes?: string
}

export interface DeleteCartItemRequest {
  cartItemId: number
}
