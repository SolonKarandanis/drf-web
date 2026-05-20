import { twMerge } from 'tailwind-merge'

interface Props {
  name: string
  required?: boolean
  hasError?: boolean
  children: React.ReactNode
}

export function FormLabel({ name, required = false, hasError = false, children }: Props) {
  return (
    <label
      htmlFor={name}
      className={twMerge(
        'block text-sm font-medium text-foreground mb-1.5',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive',
        hasError && 'text-destructive',
      )}
    >
      {children}
    </label>
  )
}
