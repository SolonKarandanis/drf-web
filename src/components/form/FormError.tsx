interface Props {
  error?: string
}

export function FormError({ error }: Props) {
  return (
    <p role="alert" className="mt-1.5 text-sm text-destructive">
      {error}
    </p>
  )
}
