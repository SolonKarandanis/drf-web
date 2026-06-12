import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Package } from 'lucide-react'

import { userOrdersQueryOptions } from '#/features/orders/api'
import { OrderStatus, type OrderList } from '#/features/orders/models'

export const Route = createFileRoute('/$locale/_authed/orders/')({
  loader: async ({ context }) => {
    if (typeof window !== 'undefined') {
      await context.queryClient.ensureQueryData(userOrdersQueryOptions())
    }
  },
  component: OrdersPage,
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

function OrdersPage() {
  const { locale } = useParams({ from: '/$locale/_authed/orders/' })
  const { data: orders, isLoading, isError } = useQuery(userOrdersQueryOptions())

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading orders…</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-sm text-destructive">Failed to load orders.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Package className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">No orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Buyer</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Supplier</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Shipped</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} locale={locale} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function OrderRow({ order, locale }: { order: OrderList; locale: string }) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 text-muted-foreground">
        {new Date(order.dateCreated).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-4 py-3 font-medium">${order.totalPrice.toFixed(2)}</td>
      <td className="px-4 py-3 text-muted-foreground">#{order.buyerId}</td>
      <td className="px-4 py-3 text-muted-foreground">#{order.supplierId}</td>
      <td className="px-4 py-3 text-muted-foreground">
        {order.isShipped
          ? order.dateShipped
            ? new Date(order.dateShipped).toLocaleDateString()
            : 'Yes'
          : '—'}
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          to="/$locale/_authed/orders/$uuid/"
          params={{ locale, uuid: order.uuid }}
          className="text-xs font-medium text-primary hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  )
}
