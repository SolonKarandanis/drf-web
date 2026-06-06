import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, X } from 'lucide-react'
import { toast } from 'sonner'

import { saveProductSchema, toProductFormData, type SaveProductSchema } from '../schemas'
import {
  ProductAvailabilityStatus,
  ProductPublishedStatus,
  type AttributeOption,
} from '../models'
import {
  allCategoriesQueryOptions,
  allBrandsQueryOptions,
  allSizesQueryOptions,
  allColoursQueryOptions,
  allGendersQueryOptions,
  createProduct,
  updateProduct,
} from '../api'
import { m } from '#/paraglide/messages'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

interface Props {
  defaultValues?: Partial<SaveProductSchema>
  isEdit?: boolean
  editUuid?: string
  onSuccess: (uuid: string) => void
  onCancel: () => void
}

const EMPTY_DEFAULTS: Partial<SaveProductSchema> = {
  title: '',
  sku: '',
  content: '',
  fabricDetails: '',
  careInstructions: '',
  inventory: 0,
  price: 0,
  sizes: [],
  colors: [],
  images: [],
  publishedDate: new Date().toISOString().slice(0, 10),
}

export function ProductForm({ defaultValues, isEdit = false, editUuid, onSuccess, onCancel }: Props) {
  const queryClient = useQueryClient()
  const { data: categories } = useQuery(allCategoriesQueryOptions())
  const { data: brands } = useQuery(allBrandsQueryOptions())
  const { data: sizes } = useQuery(allSizesQueryOptions())
  const { data: colours } = useQuery(allColoursQueryOptions())
  const { data: genders } = useQuery(allGendersQueryOptions())

  const { mutateAsync: doCreate, isPending: creating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
  const { mutateAsync: doUpdate, isPending: updating } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
  const isLoading = creating || updating

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SaveProductSchema>({
    resolver: zodResolver(saveProductSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  })

  const selectedSizes = watch('sizes') ?? []
  const selectedColors = watch('colors') ?? []
  const images = watch('images') ?? []

  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleMulti = (field: 'sizes' | 'colors', id: number, current: number[]) => {
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    setValue(field, next, { shouldValidate: true })
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const next = [...images, ...Array.from(files)]
    setValue('images', next, { shouldValidate: true })
  }

  const removeImage = (index: number) => {
    setValue('images', images.filter((_, i) => i !== index), { shouldValidate: true })
  }

  const onSubmit = async (data: SaveProductSchema) => {
    const fd = toProductFormData(data)
    try {
      if (isEdit && editUuid) {
        const result = await doUpdate({ uuid: editUuid, formData: fd })
        toast.success(m.product_form_success_update())
        onSuccess(result.uuid)
      } else {
        const result = await doCreate(fd)
        toast.success(m.product_form_success_create())
        onSuccess(result.productId)
      }
    } catch {
      toast.error(m.product_form_error())
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={m.product_form_title()} error={errors.title?.message} required>
          <Input {...register('title')} disabled={isEdit} />
        </Field>
        <Field label={m.product_form_sku()} error={errors.sku?.message} required>
          <Input {...register('sku')} disabled={isEdit} />
        </Field>
      </div>

      <Field label={m.product_form_description()} error={errors.content?.message}>
        <textarea
          {...register('content')}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </Field>

      <Field label={m.product_form_fabric()} error={errors.fabricDetails?.message}>
        <textarea
          {...register('fabricDetails')}
          rows={2}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </Field>

      <Field label={m.product_form_care()} error={errors.careInstructions?.message}>
        <textarea
          {...register('careInstructions')}
          rows={2}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </Field>

      {/* Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label={m.product_form_category()} error={errors.category?.message} required>
          <NativeSelect
            options={categories ?? []}
            {...register('category', { valueAsNumber: true })}
          />
        </Field>
        <Field label={m.product_form_brand()} error={errors.brand?.message} required>
          <NativeSelect
            options={brands ?? []}
            {...register('brand', { valueAsNumber: true })}
          />
        </Field>
        <Field label={m.product_form_gender()} error={errors.gender?.message} required>
          <NativeSelect
            options={genders ?? []}
            {...register('gender', { valueAsNumber: true })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={m.product_form_sizes()} error={errors.sizes?.message} required>
          <CheckboxGroup
            options={sizes ?? []}
            selected={selectedSizes}
            onToggle={(id) => toggleMulti('sizes', id, selectedSizes)}
          />
        </Field>
        <Field label={m.product_form_colors()} error={errors.colors?.message} required>
          <CheckboxGroup
            options={colours ?? []}
            selected={selectedColors}
            onToggle={(id) => toggleMulti('colors', id, selectedColors)}
          />
        </Field>
      </div>

      {/* Pricing & inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={m.product_form_inventory()} error={errors.inventory?.message} required>
          <Input type="number" min={1} {...register('inventory', { valueAsNumber: true })} />
        </Field>
        <Field label={m.product_form_price()} error={errors.price?.message} required>
          <Input type="number" min={0} step={0.01} {...register('price', { valueAsNumber: true })} />
        </Field>
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label={m.product_form_publish_date()} error={errors.publishedDate?.message} required>
          <Input type="date" {...register('publishedDate')} disabled={isEdit} />
        </Field>
        <Field label={m.product_form_publish_status()} error={errors.publishStatus?.message} required>
          <NativeSelect
            options={[
              { id: ProductPublishedStatus.PUBLISHED as unknown as number, name: m.product_form_status_published() },
              { id: ProductPublishedStatus.DRAFT as unknown as number, name: m.product_form_status_draft() },
              { id: ProductPublishedStatus.ARCHIVED as unknown as number, name: m.product_form_status_archived() },
            ]}
            valueKey="name"
            {...register('publishStatus')}
          />
        </Field>
        <Field label={m.product_form_availability()} error={errors.availabilityStatus?.message} required>
          <NativeSelect
            options={[
              { id: ProductAvailabilityStatus.IN_STOCK as unknown as number, name: m.product_form_avail_in_stock() },
              { id: ProductAvailabilityStatus.OUT_OF_STOCK as unknown as number, name: m.product_form_avail_out_of_stock() },
            ]}
            valueKey="name"
            {...register('availabilityStatus')}
          />
        </Field>
      </div>

      {/* Images */}
      <Field label={m.product_form_images()} error={errors.images?.message}>
        <div
          className="rounded-md border-2 border-dashed border-border p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        >
          <p className="text-sm text-muted-foreground">{m.product_form_images_hint()}</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((file, i) => (
              <div key={i} className="relative h-16 w-16 rounded overflow-hidden border border-border">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-0 right-0 bg-black/60 text-white rounded-bl p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Field>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          {m.product_form_back()}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? m.product_form_submit_update() : m.product_form_submit_create()}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

function NativeSelect({
  options,
  valueKey,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{ id: number; name: string }>
  valueKey?: 'id' | 'name'
}) {
  const vk = valueKey ?? 'id'
  return (
    <select
      {...props}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
    >
      <option value="">— select —</option>
      {options.map((o) => (
        <option key={o.id} value={vk === 'id' ? o.id : (o as any)[vk]}>
          {o.name}
        </option>
      ))}
    </select>
  )
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
}: {
  options: Array<AttributeOption>
  selected: Array<number>
  onToggle: (id: number) => void
}) {
  return (
    <div className="rounded-md border border-input bg-background p-2 max-h-40 overflow-y-auto space-y-1">
      {options.length === 0 && (
        <p className="text-xs text-muted-foreground px-1">Loading…</p>
      )}
      {options.map((o) => (
        <label key={o.id} className="flex items-center gap-2 cursor-pointer px-1 py-0.5 hover:bg-muted rounded">
          <input
            type="checkbox"
            checked={selected.includes(o.id)}
            onChange={() => onToggle(o.id)}
            className="accent-primary"
          />
          <span className="text-sm">{o.name}</span>
        </label>
      ))}
    </div>
  )
}
