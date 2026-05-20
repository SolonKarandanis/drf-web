import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        success: 'bg-green-600 text-white shadow hover:bg-green-700',
        info: 'bg-sky-600 text-white shadow hover:bg-sky-700',
        warning: 'bg-amber-500 text-white shadow hover:bg-amber-600',
        danger: 'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90',
        light: 'bg-muted text-foreground shadow-sm hover:bg-muted/80',
        dark: 'bg-foreground text-background shadow hover:bg-foreground/90',
        outline: 'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3',
        md: 'h-9 px-4',
        lg: 'h-10 px-6',
        xl: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

type ButtonIntents = VariantProps<typeof buttonVariants>['intent']
type ButtonSizes = VariantProps<typeof buttonVariants>['size']

export interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntents
  size?: ButtonSizes
  isLoading?: boolean
  isDisabled?: boolean
  icon?: ReactElement
  iconPosition?: 'left' | 'right'
}

export function FormButton({
  className,
  intent = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  ...rest
}: PropsWithChildren<FormButtonProps>) {
  return (
    <button
      className={twMerge(buttonVariants({ intent, size }), className)}
      disabled={isDisabled || isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading…
        </>
      ) : (
        <>
          {iconPosition === 'left' && icon && <span className="mr-2">{icon}</span>}
          {children}
          {iconPosition === 'right' && icon && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  )
}
