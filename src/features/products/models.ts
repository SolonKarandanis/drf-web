// Minimal product surface for the /products/search tracer-bullet.
// The full drf-web product model (150 lines) gets ported piece-by-piece as
// other routes (detail, create, edit) come online.

export interface ImageModel {
  id: number
  image: string
  alt: string
  title: string
}

export interface Brand {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export enum ProductPublishedStatus {
  DRAFT = 'product.draft',
  PUBLISHED = 'product.published',
  ARCHIVED = 'product.archived',
}

export enum ProductAvailabilityStatus {
  IN_STOCK = 'product.in-stock',
  OUT_OF_STOCK = 'product.out-of-stock',
}

export interface BaseProduct {
  sku: string
  title: string
  content?: string
  fabricDetails?: string
  careInstructions?: string
  price: number
  inventory: number
  publishedDate: string
  publishStatus: ProductPublishedStatus
  availabilityStatus: ProductAvailabilityStatus
}

export interface Products extends BaseProduct {
  id: number
  uuid: string
  salePrice: number | null
  averageRating: number | null
  previewImage: ImageModel | null
}

export interface UserPublic {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  uuid: string
}

export interface Comment {
  id: number
  content: string
  contentType: number
  objectId: number
  dateCreated: string
  userId: number
  username: string
}

export interface ProductDetails extends BaseProduct {
  id: number
  uuid: string
  salePrice: number | null
  averageRating: number | null
  numberOfRatings: number
  publishStatusLabel: string
  availabilityStatusLabel: string
  owner: UserPublic
  brand: Brand
  categories: Array<Category>
  comments: Array<Comment>
}

export interface AttributeOption {
  id: number
  name: string
}

export interface ProductAttributeValues {
  id: number
  productId: number
  attributeId: number
  attributeOptionId: number
}

export interface ProductAttributes {
  colors: Array<ProductAttributeValues>
  sizes: Array<ProductAttributeValues>
  genders: Array<ProductAttributeValues>
}

export interface CreatedProductResponse {
  productId: string
}

export interface FilterOption {
  id: number
  name: string
  totalProducts: number
}

export interface SimilarProduct {
  id: number
  uuid: string
  sku: string
  title: string
  price: number
  salePrice: number
  averageRating: number
  numberOfRatings: number
  previewImage: ImageModel | null
}
