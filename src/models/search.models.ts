import type { Products } from './product.models'
import type { UserModel, UserStatus } from './user.models'

export type SortDirection = 'asc' | 'desc'

export interface Paging {
  page: number
  limit: number
  sortField?: string
  sortOrder?: SortDirection
}

export interface SearchRequest {
  paging: Paging
}

export interface ProductSearchRequest extends SearchRequest {
  query: string | null
  categories?: Array<number>
  discounts?: Array<number>
  brands?: Array<number>
  sizes?: Array<number>
}

export interface SearchResponse {
  count: number
  previous: number
  next: number
  pages: number
}

export interface ProductSearchResponse extends SearchResponse {
  data: Array<Products>
}

export interface UserSearchRequest extends SearchRequest {
  username?: string
  name?: string
  email?: string
  role: number
  status?: UserStatus
}

export interface UserSearchResponse extends SearchResponse {
  data: Array<UserModel>
}
