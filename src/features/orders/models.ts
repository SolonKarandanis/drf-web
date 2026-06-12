export enum OrderStatus {
  DRAFT = 'purchase.order.draft',
  BUYER_REJECTED = 'purchase.order.buyer.rejected',
  SUPPLIER_REJECTED = 'purchase.order.supplier.rejected',
  APPROVED = 'purchase.order.approved',
  SHIPPED = 'purchase.order.shipped',
  RECEIVED = 'purchase.order.received',
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
  comment: string
  author: string
  createdAt: string
}

export interface Order extends OrderList {
  orderItems: OrderItem[]
  comments: OrderComment[]
}
