import type { ImageModel } from './product.models'

export interface WishlistItemProduct {
  sku: string
  title: string
  uuid: string
}

export interface WishlistItem {
  id: number
  uuid: string
  productId: number
  attributes: string | null
  previewImage: ImageModel | null
  productDetails: WishlistItemProduct
}

export interface AddToWishlistRequest {
  productId: number
  attributes?: string
}

export interface DeleteWishlistItemRequest {
  wishListItemId: number
}
