import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { ProductForm } from '#/components/products/ProductForm'
import {
  useGetProductDetailsQuery,
  useGetProductAttributesQuery,
} from '#/shared/redux/productsApiSlice'
import { ProductAvailabilityStatus, ProductPublishedStatus } from '#/models/product.models'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/$locale/_authed/products/$uuid/edit')({
  component: EditProductPage,
})

function EditProductPage() {
  const { locale, uuid } = useParams({ from: '/$locale/_authed/products/$uuid/edit' })
  const navigate = useNavigate()

  const { data: product, isLoading: productLoading } = useGetProductDetailsQuery(uuid)
  const { data: attributes, isLoading: attrsLoading } = useGetProductAttributesQuery(uuid)

  const isLoading = productLoading || attrsLoading

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{m.product_detail_loading()}</span>
      </div>
    )
  }

  if (!product || !attributes) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-sm text-destructive">{m.product_detail_error()}</p>
      </div>
    )
  }

  const defaultValues = {
    title: product.title,
    sku: product.sku,
    brand: product.brand.id,
    category: product.categories[0]?.id,
    gender: attributes.genders[0]?.attributeOptionId,
    sizes: attributes.sizes.map((s) => s.attributeOptionId),
    colors: attributes.colors.map((c) => c.attributeOptionId),
    publishedDate: product.publishedDate?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    publishStatus: product.publishStatus as ProductPublishedStatus,
    availabilityStatus: product.availabilityStatus as ProductAvailabilityStatus,
    inventory: product.inventory,
    price: product.price,
    content: product.content ?? '',
    fabricDetails: product.fabricDetails ?? '',
    careInstructions: product.careInstructions ?? '',
    images: [],
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{m.product_form_edit_title()}</h1>
      <div className="rounded-md border border-border bg-card p-6">
        <ProductForm
          defaultValues={defaultValues}
          isEdit
          editUuid={uuid}
          onSuccess={() =>
            navigate({ to: '/$locale/products/$uuid', params: { locale, uuid } })
          }
          onCancel={() =>
            navigate({ to: '/$locale/products/$uuid', params: { locale, uuid } })
          }
        />
      </div>
    </div>
  )
}
