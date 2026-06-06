import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { ProductForm } from '#/features/products/components/ProductForm'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/$locale/_authed/products/create')({
  component: CreateProductPage,
})

function CreateProductPage() {
  const { locale } = useParams({ from: '/$locale/_authed/products/create' })
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{m.product_form_create_title()}</h1>
      <div className="rounded-md border border-border bg-card p-6">
        <ProductForm
          onSuccess={(uuid) =>
            navigate({ to: '/$locale/products/$uuid', params: { locale, uuid } })
          }
          onCancel={() =>
            navigate({ to: '/$locale/products/search', params: { locale } })
          }
        />
      </div>
    </div>
  )
}
