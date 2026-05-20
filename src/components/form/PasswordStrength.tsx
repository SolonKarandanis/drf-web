import { cn } from '#/lib/cn'

interface Props {
  passStrength: number
}

export function PasswordStrength({ passStrength }: Props) {
  return (
    <div className="flex gap-2 mt-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={cn('h-1.5 flex-1 rounded-full transition-colors', {
            'bg-destructive': i <= passStrength && passStrength === 0,
            'bg-orange-500': i <= passStrength && passStrength === 1,
            'bg-yellow-500': i <= passStrength && passStrength === 2,
            'bg-green-500': i <= passStrength && passStrength === 3,
            'bg-muted': i > passStrength,
          })}
        />
      ))}
    </div>
  )
}
