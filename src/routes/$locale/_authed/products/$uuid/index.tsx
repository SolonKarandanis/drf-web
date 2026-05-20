import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Loader2, Star, ShoppingCart, Heart } from 'lucide-react'
import { toast } from 'sonner'

import {
  useGetProductDetailsQuery,
  useGetProductImagesQuery,
  useGetSimilarProductsByIdQuery,
  useGetProductAttributesQuery,
  useGetAllSizesQuery,
  useGetAllColoursQuery,
} from '#/shared/redux/productsApiSlice'
import { useAddItemsToCartMutation } from '#/shared/redux/cartApiSlice'
import { useAddToWishlistMutation } from '#/shared/redux/wishlistApiSlice'
import { setCart } from '#/shared/redux/cartSlice'
import type { Comment, ImageModel, ProductDetails, SimilarProduct } from '#/models/product.models'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

export const Route = createFileRoute('/$locale/_authed/products/$uuid/')({
  component: ProductDetailPage,
})

const backendOrigin = () =>
  (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/').replace(/\/api\/?$/, '')

function resolveImage(path: string) {
  return path.startsWith('http') ? path : `${backendOrigin()}${path}`
}

function ProductDetailPage() {
  const { locale, uuid } = useParams({ from: '/$locale/_authed/products/$uuid/' })

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(uuid)

  const { data: images } = useGetProductImagesQuery(uuid)
  const { data: similarProducts } = useGetSimilarProductsByIdQuery(uuid)

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{m.product_detail_loading()}</span>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-sm text-destructive" role="alert">
          {isError ? m.product_detail_error() : m.product_detail_not_found()}
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/$locale/products/search" params={{ locale }}>
            {m.product_detail_back()}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            to="/$locale/products/search"
            params={{ locale }}
            className="hover:text-foreground transition-colors"
          >
            {m.products_search_title()}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-xs">{product.title}</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/$locale/products/$uuid/edit" params={{ locale, uuid }}>
            {m.product_form_edit_title()}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <ImageGallery images={images ?? []} title={product.title} />
          {similarProducts && similarProducts.length > 0 && (
            <SimilarProductsSection
              products={similarProducts}
              locale={locale}
            />
          )}
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-6">
          <ProductInfo product={product} />
          <CommentsSection comments={product.comments} />
        </div>
      </div>
    </div>
  )
}

function ImageGallery({
  images,
  title,
}: {
  images: Array<ImageModel>
  title: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  return (
    <div className="space-y-3">
      <div className="aspect-square rounded-md border border-border bg-muted overflow-hidden">
        {active ? (
          <img
            src={resolveImage(active.image)}
            alt={active.alt || title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={[
                'h-16 w-16 rounded border overflow-hidden flex-shrink-0 transition-colors',
                i === activeIndex
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-border hover:border-muted-foreground',
              ].join(' ')}
            >
              <img
                src={resolveImage(img.image)}
                alt={img.alt || `Image ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function StarRating({ rating, count }: { rating: number | null; count: number }) {
  const r = rating ?? 0
  const filled = Math.round(r)
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5" aria-label={`${r} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={[
              'h-4 w-4',
              i < filled
                ? 'fill-amber-400 text-amber-400'
                : 'fill-muted text-muted-foreground',
            ].join(' ')}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {m.product_detail_rating({
          rating: r.toFixed(1),
          count: String(count),
        })}
      </span>
    </div>
  )
}

function ProductInfo({ product }: { product: ProductDetails }) {
  const dispatch = useDispatch()
  const [addToCart, { isLoading: cartLoading }] = useAddItemsToCartMutation()
  const [addToWishlist, { isLoading: wishlistLoading }] = useAddToWishlistMutation()
  const [quantity, setQuantity] = useState(1)
  const [selectedSizeOptionId, setSelectedSizeOptionId] = useState<number | null>(null)
  const [selectedColorOptionId, setSelectedColorOptionId] = useState<number | null>(null)

  const { data: productAttrs } = useGetProductAttributesQuery(product.uuid)
  const { data: allSizes } = useGetAllSizesQuery()
  const { data: allColours } = useGetAllColoursQuery()

  const availableSizes = allSizes?.filter((s) =>
    productAttrs?.sizes.some((a) => a.attributeOptionId === s.id)
  ) ?? []
  const availableColors = allColours?.filter((c) =>
    productAttrs?.colors.some((a) => a.attributeOptionId === c.id)
  ) ?? []

  const salePrice = product.salePrice ?? 0
  const price = salePrice > 0 ? salePrice : product.price
  const showOriginal = salePrice > 0 && salePrice < product.price
  const busy = cartLoading || wishlistLoading

  const handleAddToCart = () => {
    const attrs: Record<number, number> = {}
    if (selectedSizeOptionId !== null) attrs[1] = selectedSizeOptionId
    if (selectedColorOptionId !== null) attrs[2] = selectedColorOptionId
    const attributes = Object.keys(attrs).length > 0 ? JSON.stringify(attrs) : undefined

    addToCart([{ productId: product.id, quantity, attributes }])
      .unwrap()
      .then((cart) => {
        dispatch(setCart(cart))
        toast.success(m.product_add_to_cart_success())
      })
      .catch(() => toast.error(m.product_add_to_cart_error()))
  }

  const handleAddToWishlist = () => {
    addToWishlist([{ productId: product.id }])
      .unwrap()
      .then(() => toast.success(m.product_add_to_wishlist_success()))
      .catch(() => toast.error(m.product_add_to_wishlist_error()))
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-muted-foreground mb-1">
          {m.product_detail_sku()}: {product.sku}
        </p>
        <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
      </div>

      <StarRating rating={product.averageRating} count={product.numberOfRatings} />

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">${price.toFixed(2)}</span>
        {showOriginal && (
          <span className="text-lg text-muted-foreground line-through">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold text-muted-foreground mb-1">{m.product_detail_brand()}</p>
          <p className="text-foreground">{product.brand.name}</p>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground mb-1">{m.product_detail_availability()}</p>
          <span
            className={[
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              product.availabilityStatusLabel.toLowerCase().includes('in')
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            ].join(' ')}
          >
            {product.availabilityStatusLabel}
          </span>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground mb-1">{m.product_detail_inventory()}</p>
          <p className="text-foreground">{product.inventory}</p>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground mb-1">{m.product_detail_status()}</p>
          <p className="text-foreground">{product.publishStatusLabel}</p>
        </div>
      </div>

      {product.categories.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">{m.product_detail_categories()}</p>
          <div className="flex flex-wrap gap-2">
            {product.categories.map((c) => (
              <span
                key={c.id}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold mb-1">{m.product_detail_sold_by()}</p>
        <p className="text-sm text-muted-foreground">
          {product.owner.firstName} {product.owner.lastName}
        </p>
      </div>

      {product.content && (
        <div>
          <p className="text-sm font-semibold mb-2">{m.product_detail_description()}</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {product.content}
          </p>
        </div>
      )}

      {product.fabricDetails && (
        <div>
          <p className="text-sm font-semibold mb-2">{m.product_detail_fabric()}</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {product.fabricDetails}
          </p>
        </div>
      )}

      {product.careInstructions && (
        <div>
          <p className="text-sm font-semibold mb-2">{m.product_detail_care()}</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {product.careInstructions}
          </p>
        </div>
      )}

      {availableSizes.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">{m.product_detail_size()}</p>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSizeOptionId((prev) => (prev === s.id ? null : s.id))}
                className={[
                  'rounded border px-3 py-1 text-xs font-medium transition-colors cursor-pointer',
                  selectedSizeOptionId === s.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary',
                ].join(' ')}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableColors.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">{m.product_detail_color()}</p>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedColorOptionId((prev) => (prev === c.id ? null : c.id))}
                className={[
                  'rounded-full border-2 px-3 py-1 text-xs font-medium transition-colors cursor-pointer',
                  selectedColorOptionId === c.id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border hover:border-primary',
                ].join(' ')}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          <Label htmlFor="qty" className="text-sm font-semibold shrink-0">
            {m.product_detail_quantity()}
          </Label>
          <Input
            id="qty"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-24"
          />
        </div>
        <div className="flex gap-3">
          <Button className="flex-1 gap-2" disabled={busy} onClick={handleAddToCart}>
            {cartLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            {m.product_add_to_cart()}
          </Button>
          <Button variant="outline" className="gap-2" disabled={busy} onClick={handleAddToWishlist}>
            {wishlistLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className="h-4 w-4" />
            )}
            {m.product_add_to_wishlist()}
          </Button>
        </div>
      </div>
    </div>
  )
}

function CommentsSection({ comments }: { comments: Array<Comment> }) {
  return (
    <div>
      <h2 className="text-base font-semibold mb-4">{m.product_detail_reviews()}</h2>
      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">{m.product_detail_no_comments()}</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded-md border border-border bg-card p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{c.username}</span>
                <time className="text-xs text-muted-foreground">
                  {new Date(c.dateCreated).toLocaleDateString()}
                </time>
              </div>
              <p className="text-sm text-muted-foreground">{c.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SimilarProductsSection({
  products,
  locale,
}: {
  products: Array<SimilarProduct>
  locale: string
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">{m.product_detail_similar()}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {products.map((p) => (
          <Link
            key={p.uuid}
            to="/$locale/products/$uuid"
            params={{ locale, uuid: p.uuid }}
            className="block flex-shrink-0 w-32"
          >
            <article className="rounded-md border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-muted">
                {p.previewImage ? (
                  <img
                    src={resolveImage(p.previewImage.image)}
                    alt={p.previewImage.alt || p.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-2 space-y-0.5">
                <p className="text-xs font-medium line-clamp-2">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  ${(p.salePrice > 0 ? p.salePrice : p.price).toFixed(2)}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
