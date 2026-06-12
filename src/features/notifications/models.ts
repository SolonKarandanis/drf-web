export type NotificationEventType =
  | 'purchase.order.created'
  | 'purchase.order.buyer.rejected'
  | 'purchase.order.supplier.rejected'
  | 'purchase.order.approved'
  | 'purchase.order.shipped'
  | 'purchase.order.received'

export interface NotificationEvent {
  id: number
  event_type: NotificationEventType
  payload: Record<string, unknown>
  status: string
  created_at: string
  sent_at: string | null
  read_at: string | null
}

export interface UnreadCountResponse {
  count: number
}
