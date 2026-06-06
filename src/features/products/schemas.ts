import { z } from 'zod'
import { ProductAvailabilityStatus, ProductPublishedStatus } from './models'

export const saveProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sku: z.string().min(1, 'SKU is required'),
  content: z.string().optional(),
  fabricDetails: z.string().optional(),
  careInstructions: z.string().optional(),
  category: z.number({ message: 'Category is required' }),
  gender: z.number({ message: 'Gender is required' }),
  brand: z.number({ message: 'Brand is required' }),
  sizes: z.array(z.number()).min(1, 'At least one size is required'),
  colors: z.array(z.number()).min(1, 'At least one color is required'),
  publishedDate: z.string().min(1, 'Publish date is required'),
  publishStatus: z.nativeEnum(ProductPublishedStatus, {
    message: 'Publish status is required',
  }),
  availabilityStatus: z.nativeEnum(ProductAvailabilityStatus, {
    message: 'Availability status is required',
  }),
  inventory: z
    .number({ message: 'Inventory is required' })
    .int('Must be a whole number')
    .positive('Must be greater than 0'),
  price: z
    .number({ message: 'Price is required' })
    .positive('Must be greater than 0'),
  images: z.array(z.instanceof(File)),
})

export type SaveProductSchema = z.infer<typeof saveProductSchema>

export function toProductFormData(data: SaveProductSchema): FormData {
  const fd = new FormData()
  fd.append('title', data.title)
  fd.append('sku', data.sku)
  fd.append('brand', String(data.brand))
  fd.append('gender', String(data.gender))
  fd.append('inventory', String(data.inventory))
  fd.append('price', String(data.price))
  fd.append('publishStatus', data.publishStatus)
  fd.append('availabilityStatus', data.availabilityStatus)
  // Django expects MM/DD/YYYY
  const [year, month, day] = data.publishedDate.split('-')
  fd.append('publishedDate', `${month}/${day}/${year}`)
  if (data.content) fd.append('content', data.content)
  if (data.fabricDetails) fd.append('fabricDetails', data.fabricDetails)
  if (data.careInstructions) fd.append('careInstructions', data.careInstructions)
  fd.append('categories', String(data.category))
  for (const id of data.sizes) fd.append('sizes', String(id))
  for (const id of data.colors) fd.append('colors', String(id))
  for (const file of data.images) fd.append('images', file)
  return fd
}
