export enum OrderStatus {
  DRAFT = 'purchase.order.draft',
  BUYER_REJECTED = 'purchase.order.buyer.rejected',
  SUPPLIER_REJECTED = 'purchase.order.supplier.rejected',
  APPROVED = 'purchase.order.approved',
  SHIPPED = 'purchase.order.shipped',
  RECEIVED = 'purchase.order.received',
}

export interface OrderUser {
  id: number
  uuid: string
  username: string
  firstName: string
  lastName: string
  email: string
}

export interface OrderList {
  id: number
  uuid: string
  status: OrderStatus
  totalPrice: number
  isShipped: boolean
  dateCreated: string
  dateShipped: string | null
  buyerId: number
  supplierId: number
}

export interface OrderItem {
  id: number
  uuid: string
  productId: number
  productName: string
  sku: string
  manufacturer: string
  price: number
  quantity: number
  totalPrice: number
  startDate: string
  endDate: string | null
  status: string
}

export interface OrderComment {
  id: number
  content: string
  contentType: string
  objectId: number
  dateCreated: string
  userId: number
  username: string
  userEmail: string
  userFirstName: string
  userLastName: string
}

export interface Order extends OrderList {
  buyer: OrderUser
  supplier: OrderUser
  orderItems: OrderItem[]
  comments: OrderComment[]
}
