import { createFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { orderQueryOptions } from '#/features/orders/api'
import { OrderStatus, type Order, type OrderComment, type OrderItem } from '#/features/orders/models'

export const Route = createFileRoute('/$locale/_authed/orders/$uuid/')({
  loader: async ({ context, params }) => {
    if (typeof window !== 'undefined') {
      await context.queryClient.ensureQueryData(orderQueryOptions(params.uuid))
    }
  },
  component: OrderDetailPage,
})

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.DRAFT]: 'Draft',
  [OrderStatus.BUYER_REJECTED]: 'Buyer Rejected',
  [OrderStatus.SUPPLIER_REJECTED]: 'Supplier Rejected',
  [OrderStatus.APPROVED]: 'Approved',
  [OrderStatus.SHIPPED]: 'Shipped',
  [OrderStatus.RECEIVED]: 'Received',
}

const STATUS_CLASSES: Record<OrderStatus, string> = {
  [OrderStatus.DRAFT]: 'bg-muted text-muted-foreground',
  [OrderStatus.BUYER_REJECTED]: 'bg-destructive/10 text-destructive',
  [OrderStatus.SUPPLIER_REJECTED]: 'bg-destructive/10 text-destructive',
  [OrderStatus.APPROVED]: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  [OrderStatus.SHIPPED]: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  [OrderStatus.RECEIVED]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

function OrderDetailPage() {
  const { uuid } = useParams({ from: '/$locale/_authed/orders/$uuid/' })
  const { data: order, isLoading, isError } = useQuery(orderQueryOptions(uuid))

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading order…</span>
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-sm text-destructive">Failed to load order.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Order</h1>

      <OrderHeader order={order} />
      <ItemsTable items={order.orderItems} />
      <CommentThread comments={order.comments} />
    </div>
  )
}

function OrderHeader({ order }: { order: Order }) {
  return (
    <div className="rounded-md border border-border bg-card p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Status</p>
        <StatusBadge status={order.status} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Total</p>
        <p className="font-semibold">${order.totalPrice.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Date Created</p>
        <p>{new Date(order.dateCreated).toLocaleDateString()}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Buyer</p>
        <p>#{order.buyerId}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Supplier</p>
        <p>#{order.supplierId}</p>
      </div>
      {order.dateShipped && (
        <div>
          <p className="text-xs text-muted-foreground mb-1">Date Shipped</p>
          <p>{new Date(order.dateShipped).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  )
}

function ItemsTable({ items }: { items: OrderItem[] }) {
  if (items.length === 0) {
    return (
      <div>
        <h2 className="text-base font-semibold mb-3">Items</h2>
        <p className="text-sm text-muted-foreground">No items.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-base font-semibold mb-3">Items</h2>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">SKU</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Qty</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Unit Price</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{item.productName}</td>
                <td className="px-4 py-3 text-muted-foreground">{item.sku}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                <td className="px-4 py-3 font-semibold">${item.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CommentThread({ comments }: { comments: OrderComment[] }) {
  if (comments.length === 0) return null

  return (
    <div>
      <h2 className="text-base font-semibold mb-3">Comments</h2>
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="rounded-md border border-border bg-card p-4 text-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{c.userFirstName} {c.userLastName}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(c.dateCreated).toLocaleString()}
              </span>
            </div>
            <p className="text-muted-foreground">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
