import { createFileRoute, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  orderQueryOptions,
  buyerRejectOrder,
  supplierRejectOrder,
  approveOrder,
  shipOrder,
  receiveOrder,
  postOrderComment,
} from '#/features/orders/api'
import { OrderStatus, type Order, type OrderComment, type OrderItem, type OrderUser } from '#/features/orders/models'
import { decodeJwtPayload, getAccessTokenValue } from '#/shared/token-storage'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '#/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#/components/ui/alert-dialog'

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

function getCurrentUserId(): number | null {
  try {
    const token = getAccessTokenValue()
    if (!token) return null
    const payload = decodeJwtPayload(token)
    return typeof payload.user_id === 'number' ? payload.user_id : null
  } catch {
    return null
  }
}

type RejectType = 'buyer' | 'supplier'
type ConfirmAction = 'approve' | 'ship' | 'receive'

const CONFIRM_LABELS: Record<ConfirmAction, string> = {
  approve: 'Approve',
  ship: 'Ship',
  receive: 'Receive',
}

const CONFIRM_DESCRIPTIONS: Record<ConfirmAction, string> = {
  approve: 'Confirm you will fulfil this order.',
  ship: 'Confirm this order has been shipped.',
  receive: 'Confirm you have received this order.',
}

function OrderActions({ order, uuid }: { order: Order; uuid: string }) {
  const queryClient = useQueryClient()
  const [rejectType, setRejectType] = useState<RejectType | null>(null)
  const [comment, setComment] = useState('')
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null)

  const userId = getCurrentUserId()
  const role =
    userId === order.buyer.id ? 'buyer'
    : userId === order.supplier.id ? 'supplier'
    : null

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['orders', uuid] })

  const commentMutation = useMutation({ mutationFn: ({ id, text }: { id: number; text: string }) => postOrderComment(id, text) })

  const buyerRejectMutation = useMutation({
    mutationFn: buyerRejectOrder,
    onSuccess: () => { invalidate(); toast.success('Order rejected.') },
    onError: () => toast.error('Failed to reject order.'),
  })

  const supplierRejectMutation = useMutation({
    mutationFn: supplierRejectOrder,
    onSuccess: () => { invalidate(); toast.success('Order rejected.') },
    onError: () => toast.error('Failed to reject order.'),
  })

  const approveMutation = useMutation({
    mutationFn: approveOrder,
    onSuccess: () => { invalidate(); toast.success('Order approved.') },
    onError: () => toast.error('Failed to approve order.'),
  })

  const shipMutation = useMutation({
    mutationFn: shipOrder,
    onSuccess: () => { invalidate(); toast.success('Order shipped.') },
    onError: () => toast.error('Failed to ship order.'),
  })

  const receiveMutation = useMutation({
    mutationFn: receiveOrder,
    onSuccess: () => { invalidate(); toast.success('Order received.') },
    onError: () => toast.error('Failed to mark order as received.'),
  })

  const handleRejectConfirm = async () => {
    if (!rejectType) return
    if (comment.trim()) {
      await commentMutation.mutateAsync({ id: order.id, text: comment.trim() })
    }
    if (rejectType === 'buyer') {
      buyerRejectMutation.mutate(uuid)
    } else {
      supplierRejectMutation.mutate(uuid)
    }
    setRejectType(null)
    setComment('')
  }

  const handleConfirmAction = () => {
    if (!confirmAction) return
    if (confirmAction === 'approve') approveMutation.mutate(uuid)
    else if (confirmAction === 'ship') shipMutation.mutate(uuid)
    else if (confirmAction === 'receive') receiveMutation.mutate(uuid)
    setConfirmAction(null)
  }

  const rejectPending =
    commentMutation.isPending ||
    buyerRejectMutation.isPending ||
    supplierRejectMutation.isPending

  const { status } = order

  const showBuyerReject = role === 'buyer' && status === OrderStatus.DRAFT
  const showSupplierReject = role === 'supplier' && status === OrderStatus.DRAFT
  const showApprove = role === 'supplier' && status === OrderStatus.DRAFT
  const showShip = role === 'supplier' && status === OrderStatus.APPROVED
  const showReceive = role === 'buyer' && status === OrderStatus.SHIPPED

  if (!showBuyerReject && !showSupplierReject && !showApprove && !showShip && !showReceive) {
    return null
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {showBuyerReject && (
          <Button variant="destructive" onClick={() => setRejectType('buyer')}>
            Reject Order
          </Button>
        )}
        {showSupplierReject && (
          <Button variant="destructive" onClick={() => setRejectType('supplier')}>
            Reject Order
          </Button>
        )}
        {showApprove && (
          <Button onClick={() => setConfirmAction('approve')}>
            Approve Order
          </Button>
        )}
        {showShip && (
          <Button onClick={() => setConfirmAction('ship')}>
            Mark as Shipped
          </Button>
        )}
        {showReceive && (
          <Button onClick={() => setConfirmAction('receive')}>
            Mark as Received
          </Button>
        )}
      </div>

      {/* Rejection modal */}
      <Dialog open={rejectType !== null} onOpenChange={(open) => { if (!open) { setRejectType(null); setComment('') } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Order</DialogTitle>
          </DialogHeader>
          <textarea
            placeholder="Reason for rejection (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectType(null); setComment('') }} disabled={rejectPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm} disabled={rejectPending}>
              {rejectPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog for approve / ship / receive */}
      <AlertDialog open={confirmAction !== null} onOpenChange={(open) => { if (!open) setConfirmAction(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmAction ? CONFIRM_LABELS[confirmAction] : ''}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction ? CONFIRM_DESCRIPTIONS[confirmAction] : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
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
      <OrderActions order={order} uuid={uuid} />
      <ItemsTable items={order.orderItems} />
      <CommentThread comments={order.comments} />
    </div>
  )
}

function UserCell({ label, user }: { label: string; user: OrderUser }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-medium">{user.firstName} {user.lastName}</p>
      <p className="text-xs text-muted-foreground">{user.email}</p>
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
      <UserCell label="Buyer" user={order.buyer} />
      <UserCell label="Supplier" user={order.supplier} />
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
  if (!items || items.length === 0) {
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
