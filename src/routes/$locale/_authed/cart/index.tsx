import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import {
  useGetUserCartQuery,
  useDeleteItemsFromCartMutation,
  useUpdateCartItemsMutation,
  useClearCartMutation,
} from '#/shared/redux/cartApiSlice'
import { useGetAllSizesQuery, useGetAllColoursQuery } from '#/shared/redux/productsApiSlice'
import {
  setCart,
  resetCart,
  mutateQuantity,
  resetUpdateRequests,
  cartItemsSelector,
  cartTotalSelector,
  cartUpdateRequestsSelector,
  cartItemCountSelector,
} from '#/shared/redux/cartSlice'
import type { CartItem } from '#/models/cart.models'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/$locale/_authed/cart/')({
  component: CartPage,
})

const backendOrigin = () =>
  (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/').replace(/\/api\/?$/, '')

function resolveImage(path: string) {
  return path.startsWith('http') ? path : `${backendOrigin()}${path}`
}

function CartPage() {
  const { locale } = useParams({ from: '/$locale/_authed/cart/' })
  const dispatch = useDispatch()

  const { data, isLoading, isError } = useGetUserCartQuery()
  const { data: allSizes } = useGetAllSizesQuery()
  const { data: allColours } = useGetAllColoursQuery()
  const [deleteItems, { isLoading: deleting }] = useDeleteItemsFromCartMutation()
  const [updateItems, { isLoading: updating }] = useUpdateCartItemsMutation()
  const [clearCart, { isLoading: clearing }] = useClearCartMutation()

  const sizesMap = Object.fromEntries((allSizes ?? []).map((s) => [s.id, s.name]))
  const coloursMap = Object.fromEntries((allColours ?? []).map((c) => [c.id, c.name]))

  const cartItems = useSelector(cartItemsSelector)
  const totalPrice = useSelector(cartTotalSelector)
  const updateRequests = useSelector(cartUpdateRequestsSelector)
  const itemCount = useSelector(cartItemCountSelector)

  useEffect(() => {
    if (data) dispatch(setCart(data))
    return () => { dispatch(resetCart()) }
  }, [data, dispatch])

  const handleDelete = async (cartItemId: number) => {
    try {
      const result = await deleteItems([{ cartItemId }]).unwrap()
      dispatch(setCart(result))
      toast.success(m.cart_delete_success())
    } catch {
      toast.error(m.cart_delete_error())
    }
  }

  const handleSave = async () => {
    if (updateRequests.length === 0) return
    try {
      const result = await updateItems(updateRequests).unwrap()
      dispatch(setCart(result))
      dispatch(resetUpdateRequests())
      toast.success(m.cart_save_success())
    } catch {
      toast.error(m.cart_save_error())
    }
  }

  const handleClear = async () => {
    try {
      const result = await clearCart().unwrap()
      dispatch(setCart(result))
      toast.success(m.cart_clear_success())
    } catch {
      toast.error(m.cart_clear_error())
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{m.cart_loading()}</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-sm text-destructive">{m.cart_error()}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">{m.cart_title()}</h1>

      {data?.modificationAlert && (
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 px-4 py-3 text-sm text-yellow-800 dark:text-yellow-300">
          {m.cart_modification_alert()}
        </div>
      )}

      {(!cartItems || itemCount === 0) ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-muted-foreground">{m.cart_empty()}</p>
          <Button asChild variant="outline">
            <Link to="/$locale/products/search" params={{ locale }}>
              {m.cart_browse()}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Items table */}
          <div className="col-span-12 lg:col-span-8">
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      {m.cart_col_product()}
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      {m.cart_col_price()}
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      {m.cart_col_quantity()}
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      {m.cart_col_total()}
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      {m.cart_col_action()}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cartItems.map((item) => (
                    <CartRow
                      key={item.id}
                      item={item}
                      locale={locale}
                      sizesMap={sizesMap}
                      coloursMap={coloursMap}
                      deleting={deleting}
                      onDelete={() => handleDelete(item.id)}
                      onQuantityChange={(qty) =>
                        dispatch(mutateQuantity({ cartItemId: item.id, quantity: qty }))
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-4">
              {updateRequests.length > 0 && (
                <Button onClick={handleSave} disabled={updating}>
                  {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {m.cart_save()}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={clearing}
              >
                {clearing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {m.cart_clear()}
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="rounded-md border border-border bg-card p-6 space-y-4 sticky top-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{m.cart_subtotal()}</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full">{m.cart_checkout()}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CartRow({
  item,
  locale,
  sizesMap,
  coloursMap,
  deleting,
  onDelete,
  onQuantityChange,
}: {
  item: CartItem
  locale: string
  sizesMap: Record<number, string>
  coloursMap: Record<number, string>
  deleting: boolean
  onDelete: () => void
  onQuantityChange: (qty: number) => void
}) {
  const sizeId = item.attributes[1]
  const colorId = item.attributes[2]
  const sizeLabel = sizeId ? sizesMap[sizeId] : undefined
  const colorLabel = colorId ? coloursMap[colorId] : undefined

  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 flex-shrink-0 rounded border border-border bg-muted overflow-hidden">
            {item.previewImage ? (
              <img
                src={resolveImage(item.previewImage.image)}
                alt={item.previewImage.alt || item.productDetails.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <Link
              to="/$locale/products/$uuid"
              params={{ locale, uuid: item.productDetails.uuid }}
              className="font-medium text-foreground hover:underline truncate block"
            >
              {item.productDetails.title}
            </Link>
            <p className="text-xs text-muted-foreground">{item.productDetails.sku}</p>
            <div className="flex gap-2 mt-0.5 text-xs text-muted-foreground">
              {sizeLabel && <span>{m.cart_size()}: {sizeLabel}</span>}
              {colorLabel && <span>{m.cart_color()}: {colorLabel}</span>}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">${item.unitPrice.toFixed(2)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
            className="rounded border border-border p-1 hover:bg-muted transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10)
              if (v > 0) onQuantityChange(v)
            }}
            className="w-12 rounded border border-input bg-background px-2 py-1 text-center text-sm"
          />
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="rounded border border-border p-1 hover:bg-muted transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </td>
      <td className="px-4 py-3 text-sm font-semibold">${item.totalPrice.toFixed(2)}</td>
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}
