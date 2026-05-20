import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  useGetUserWishlistQuery,
  useDeleteWishlistItemsMutation,
} from '#/shared/redux/wishlistApiSlice'
import { useAddItemsToCartMutation } from '#/shared/redux/cartApiSlice'
import type { WishlistItem } from '#/models/wishlist.models'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

export const Route = createFileRoute('/$locale/_authed/wishlist/')({
  component: WishlistPage,
})

const backendOrigin = () =>
  (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/').replace(/\/api\/?$/, '')

function resolveImage(path: string) {
  return path.startsWith('http') ? path : `${backendOrigin()}${path}`
}

function WishlistPage() {
  const { locale } = useParams({ from: '/$locale/_authed/wishlist/' })
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState<string | undefined>(undefined)

  const { data: items, isLoading, isError, refetch } = useGetUserWishlistQuery(submittedQuery)
  const [deleteItems] = useDeleteWishlistItemsMutation()
  const [addToCart] = useAddItemsToCartMutation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedQuery(query || undefined)
  }

  const handleRemove = async (item: WishlistItem) => {
    try {
      await deleteItems([{ wishListItemId: item.id }]).unwrap()
      refetch()
      toast.success(m.wishlist_remove_success())
    } catch {
      toast.error(m.wishlist_remove_error())
    }
  }

  const handleMoveToCart = async (item: WishlistItem) => {
    try {
      await addToCart([{
        productId: item.productId,
        quantity: 1,
        attributes: item.attributes ?? undefined,
      }]).unwrap()
      toast.success(m.wishlist_add_cart_success())
    } catch {
      toast.error(m.wishlist_add_cart_error())
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">{m.wishlist_title()}</h1>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <Input
          placeholder={m.wishlist_search_placeholder()}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="outline" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Search
        </Button>
      </form>

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{m.wishlist_loading()}</span>
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">{m.wishlist_error()}</p>
      )}

      {!isLoading && items && items.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-muted-foreground">{m.wishlist_empty()}</p>
          <Button asChild variant="outline">
            <Link to="/$locale/products/search" params={{ locale }}>
              {m.wishlist_browse()}
            </Link>
          </Button>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              locale={locale}
              onRemove={() => handleRemove(item)}
              onMoveToCart={() => handleMoveToCart(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function WishlistCard({
  item,
  locale,
  onRemove,
  onMoveToCart,
}: {
  item: WishlistItem
  locale: string
  onRemove: () => void
  onMoveToCart: () => void
}) {
  return (
    <div className="rounded-md border border-border bg-card overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-muted">
        {item.previewImage ? (
          <img
            src={resolveImage(item.previewImage.image)}
            alt={item.previewImage.alt || item.productDetails.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 rounded-full bg-background/80 p-1.5 text-muted-foreground hover:text-destructive transition-colors shadow-sm"
          title={m.wishlist_remove()}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs text-muted-foreground">{item.productDetails.sku}</p>
          <Link
            to="/$locale/products/$uuid"
            params={{ locale, uuid: item.productDetails.uuid }}
            className="text-sm font-medium text-foreground hover:underline line-clamp-2"
          >
            {item.productDetails.title}
          </Link>
        </div>

        <div className="mt-auto flex flex-col gap-1.5">
          <Button size="sm" onClick={onMoveToCart} className="w-full">
            {m.wishlist_move_to_cart()}
          </Button>
          <Button asChild size="sm" variant="outline" className="w-full">
            <Link to="/$locale/products/$uuid" params={{ locale, uuid: item.productDetails.uuid }}>
              {m.wishlist_view_product()}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
