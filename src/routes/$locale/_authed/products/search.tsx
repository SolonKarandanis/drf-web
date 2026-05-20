import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Loader2, ShoppingCart, Heart } from 'lucide-react'
import { toast } from 'sonner'

import {
  useGetCategoriesWithTotalsQuery,
  useGetBrandsWithTotalsQuery,
  useGetSizesWithTotalsQuery,
  useSearchProductsMutation,
} from '#/shared/redux/productsApiSlice'
import { useAddItemsToCartMutation } from '#/shared/redux/cartApiSlice'
import { useAddToWishlistMutation } from '#/shared/redux/wishlistApiSlice'
import { setCart } from '#/shared/redux/cartSlice'
import type { FilterOption, Products } from '#/models/product.models'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Checkbox } from '#/components/ui/checkbox'
import { Label } from '#/components/ui/label'

const PAGE_SIZE = 12

type SortKey = 'default' | 'price_asc' | 'price_desc' | 'rating' | 'title'

function sortProducts(products: Array<Products>, key: SortKey): Array<Products> {
  if (key === 'default') return products
  const copy = [...products]
  if (key === 'price_asc') return copy.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
  if (key === 'price_desc') return copy.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
  if (key === 'rating') return copy.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
  if (key === 'title') return copy.sort((a, b) => a.title.localeCompare(b.title))
  return products
}

export const Route = createFileRoute('/$locale/_authed/products/search')({
  component: ProductSearchPage,
})

function ProductSearchPage() {
  const { locale } = useParams({ from: '/$locale/_authed/products/search' })
  const [query, setQuery] = useState('')
  const [committedQuery, setCommittedQuery] = useState('')
  const [categoryIds, setCategoryIds] = useState<Array<number>>([])
  const [brandIds, setBrandIds] = useState<Array<number>>([])
  const [sizeIds, setSizeIds] = useState<Array<number>>([])
  const [sortKey, setSortKey] = useState<SortKey>('default')
  const [page, setPage] = useState(1)

  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesWithTotalsQuery()
  const { data: brands, isLoading: brandsLoading } = useGetBrandsWithTotalsQuery()
  const { data: sizes, isLoading: sizesLoading } = useGetSizesWithTotalsQuery()

  const [searchProducts, { data: searchResult, isLoading, isError }] =
    useSearchProductsMutation()

  useEffect(() => {
    searchProducts({
      query: committedQuery.trim() || null,
      categories: categoryIds.length > 0 ? categoryIds : undefined,
      brands: brandIds.length > 0 ? brandIds : undefined,
      sizes: sizeIds.length > 0 ? sizeIds : undefined,
      paging: { page, limit: PAGE_SIZE },
    })
  }, [committedQuery, categoryIds, brandIds, sizeIds, page, searchProducts])

  const sortedResults = useMemo(
    () => sortProducts(searchResult?.data ?? [], sortKey),
    [searchResult?.data, sortKey],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setCommittedQuery(query)
  }

  const toggle = (
    ids: Array<number>,
    setIds: React.Dispatch<React.SetStateAction<Array<number>>>,
    id: number,
  ) => {
    setIds(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])
    setPage(1)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">{m.products_search_title()}</h1>
        <Button asChild size="sm">
          <Link to="/$locale/products/create" params={{ locale }}>
            {m.product_form_create_title()}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 space-y-3">
          <CheckboxFilter
            label={m.products_search_filters_categories()}
            items={categories}
            loading={categoriesLoading}
            selectedIds={categoryIds}
            onToggle={(id) => toggle(categoryIds, setCategoryIds, id)}
          />
          <CheckboxFilter
            label={m.products_search_filters_brands()}
            items={brands}
            loading={brandsLoading}
            selectedIds={brandIds}
            onToggle={(id) => toggle(brandIds, setBrandIds, id)}
          />
          <CheckboxFilter
            label={m.products_search_filters_sizes()}
            items={sizes}
            loading={sizesLoading}
            selectedIds={sizeIds}
            onToggle={(id) => toggle(sizeIds, setSizeIds, id)}
          />
        </aside>

        {/* Main */}
        <section className="col-span-12 md:col-span-9 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <form onSubmit={handleSubmit} className="flex gap-2 flex-1 min-w-0" role="search">
              <Input
                type="search"
                placeholder={m.products_search_placeholder()}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {m.products_search_submit()}
              </Button>
            </form>
            <SortSelect value={sortKey} onChange={setSortKey} />
          </div>

          {isError && (
            <p className="text-sm text-destructive" role="alert">
              {m.products_search_error()}
            </p>
          )}

          {isLoading && !searchResult && (
            <p className="text-sm text-muted-foreground">{m.products_search_loading()}</p>
          )}

          {searchResult && sortedResults.length === 0 && (
            <p className="text-sm text-muted-foreground">{m.products_search_no_results()}</p>
          )}

          {sortedResults.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedResults.map((product) => (
                  <ProductCard key={product.uuid} product={product} locale={locale} />
                ))}
              </div>
              <Pagination
                page={page}
                pages={searchResult?.pages || 1}
                count={searchResult?.count ?? 0}
                onPage={setPage}
                disabled={isLoading}
              />
            </>
          )}
        </section>
      </div>
    </div>
  )
}

function CheckboxFilter({
  label,
  items,
  loading,
  selectedIds,
  onToggle,
}: {
  label: string
  items: Array<FilterOption> | undefined
  loading: boolean
  selectedIds: Array<number>
  onToggle: (id: number) => void
}) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? items : items?.slice(0, 5)

  return (
    <div className="rounded-md border border-border bg-card p-4">
      <h2 className="text-sm font-semibold mb-3">{label}</h2>
      {loading && (
        <p className="text-xs text-muted-foreground">{m.products_search_loading()}</p>
      )}
      {visible && (
        <>
          <ul className="space-y-2">
            {visible.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`filter-${label}-${item.id}`}
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={() => onToggle(item.id)}
                  />
                  <Label
                    htmlFor={`filter-${label}-${item.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {item.name}
                  </Label>
                </div>
                {item.totalProducts > 0 && (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {item.totalProducts}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {items && items.length > 5 && (
            <button
              onClick={() => setShowAll((s) => !s)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {showAll ? 'Show less' : `Show all ${items.length}`}
            </button>
          )}
        </>
      )}
    </div>
  )
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortKey
  onChange: (key: SortKey) => void
}) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <Label htmlFor="sort-select" className="text-sm whitespace-nowrap">
        {m.products_search_sort_label()}
      </Label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option value="default">{m.products_search_sort_default()}</option>
        <option value="price_asc">{m.products_search_sort_price_asc()}</option>
        <option value="price_desc">{m.products_search_sort_price_desc()}</option>
        <option value="rating">{m.products_search_sort_rating()}</option>
        <option value="title">{m.products_search_sort_title()}</option>
      </select>
    </div>
  )
}

function ProductCard({ product, locale }: { product: Products; locale: string }) {
  const dispatch = useDispatch()
  const [addToCart, { isLoading: cartLoading }] = useAddItemsToCartMutation()
  const [addToWishlist, { isLoading: wishlistLoading }] = useAddToWishlistMutation()

  const salePrice = product.salePrice ?? 0
  const price = salePrice > 0 ? salePrice : product.price
  const showOriginal = salePrice > 0 && salePrice < product.price
  const backendUrl =
    (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/').replace(/\/api\/?$/, '')

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart([{ productId: product.id, quantity: 1 }])
      .unwrap()
      .then((cart) => {
        dispatch(setCart(cart))
        toast.success(m.product_add_to_cart_success())
      })
      .catch(() => toast.error(m.product_add_to_cart_error()))
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    addToWishlist([{ productId: product.id }])
      .unwrap()
      .then(() => toast.success(m.product_add_to_wishlist_success()))
      .catch(() => toast.error(m.product_add_to_wishlist_error()))
  }

  const busy = cartLoading || wishlistLoading

  return (
    <article className="rounded-md border border-border bg-card overflow-hidden h-full hover:shadow-md transition-shadow">
      <Link to="/$locale/products/$uuid" params={{ locale, uuid: product.uuid }} className="block">
        <div className="aspect-square bg-muted">
          {product.previewImage ? (
            <img
              src={
                product.previewImage.image.startsWith('http')
                  ? product.previewImage.image
                  : `${backendUrl}${product.previewImage.image}`
              }
              alt={product.previewImage.alt || product.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="p-3 space-y-1">
          <p className="text-xs text-muted-foreground">{product.sku}</p>
          <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
          <p className="text-sm">
            <span className="font-semibold">${price.toFixed(2)}</span>
            {showOriginal && (
              <span className="ml-2 text-xs text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </p>
        </div>
      </Link>
      <div className="px-3 pb-3 flex gap-2">
        <Button
          size="sm"
          className="flex-1 gap-1.5"
          disabled={busy}
          onClick={handleAddToCart}
        >
          {cartLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ShoppingCart className="h-3.5 w-3.5" />
          )}
          {m.product_add_to_cart()}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
        >
          {wishlistLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Heart className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </article>
  )
}

function Pagination({
  page,
  pages,
  count,
  onPage,
  disabled,
}: {
  page: number
  pages: number
  count: number
  onPage: (page: number) => void
  disabled: boolean
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-xs text-muted-foreground">
        {m.products_search_pagination({
          page: String(page),
          pages: String(pages),
          count: String(count),
        })}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page <= 1}
          onClick={() => onPage(page - 1)}
        >
          {m.products_search_prev()}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page >= pages}
          onClick={() => onPage(page + 1)}
        >
          {m.products_search_next()}
        </Button>
      </div>
    </div>
  )
}
