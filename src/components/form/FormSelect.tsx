import type { PropsWithChildren } from 'react'
import ReactSelect from 'react-select'
import type { Props as ReactSelectProps } from 'react-select'
import type { ControllerRenderProps } from 'react-hook-form'
import { FormLabel } from './FormLabel'
import { FormError } from './FormError'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props extends Omit<ReactSelectProps, 'onChange' | 'value' | 'name' | 'ref'> {
  options: SelectOption[]
  field: ControllerRenderProps<any>
  required?: boolean
  sectionClassName?: string
  error?: string
  loading?: boolean
  isMulti?: boolean
  isSearchable?: boolean
  defaultValues?: number[]
  onChangeInput?: (e: any) => void
}

export function FormSelect({
  options,
  required = false,
  loading = false,
  sectionClassName,
  error,
  children,
  placeholder = 'Select…',
  isMulti = false,
  isSearchable = false,
  defaultValues,
  field,
  onChangeInput,
  ...rest
}: PropsWithChildren<Props>) {
  const { onChange, value, name, ref } = field
  const hasError = !!error

  const labelNode = children ? (
    <FormLabel name={name} required={required} hasError={hasError}>
      {children}
    </FormLabel>
  ) : null

  if (loading) {
    return (
      <section className={sectionClassName}>
        {labelNode}
        <div className="h-9 w-full animate-pulse rounded-md bg-muted" />
      </section>
    )
  }

  const defaultVals = defaultValues
    ? defaultValues.map((v) => options.find((o) => o.value === v)).filter(Boolean) as SelectOption[]
    : undefined

  const handleChange = (e: any) => {
    onChange(Array.isArray(e) ? e.map((c: any) => c.value) : e?.value ?? null)
    onChangeInput?.(e)
  }

  return (
    <section className={sectionClassName}>
      {labelNode}
      <div className="mt-0.5">
        <ReactSelect
          ref={ref}
          instanceId={name}
          name={name}
          required={required}
          placeholder={placeholder}
          options={options}
          classNamePrefix="Select2"
          isMulti={isMulti}
          isSearchable={isSearchable}
          menuPlacement="auto"
          menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
          defaultValue={defaultVals}
          value={isMulti
            ? options.filter((o) => (value as any[])?.includes(o.value))
            : options.find((o) => o.value === value) ?? null}
          onChange={handleChange}
          styles={{
            control: (base, state) => ({
              ...base,
              minHeight: '36px',
              borderColor: hasError
                ? 'hsl(var(--destructive))'
                : state.isFocused
                ? 'hsl(var(--ring))'
                : 'hsl(var(--border))',
              boxShadow: state.isFocused
                ? `0 0 0 1px ${hasError ? 'hsl(var(--destructive))' : 'hsl(var(--ring))'}`
                : 'none',
              backgroundColor: 'transparent',
              fontSize: '0.875rem',
              '&:hover': { borderColor: hasError ? 'hsl(var(--destructive))' : 'hsl(var(--border))' },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: 'hsl(var(--popover))',
              color: 'hsl(var(--popover-foreground))',
              fontSize: '0.875rem',
              zIndex: 50,
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? 'hsl(var(--primary))'
                : state.isFocused
                ? 'hsl(var(--accent))'
                : 'transparent',
              color: state.isSelected ? 'hsl(var(--primary-foreground))' : 'inherit',
            }),
            singleValue: (base) => ({ ...base, color: 'hsl(var(--foreground))' }),
            multiValue: (base) => ({ ...base, backgroundColor: 'hsl(var(--accent))' }),
            multiValueLabel: (base) => ({ ...base, color: 'hsl(var(--accent-foreground))' }),
            input: (base) => ({ ...base, color: 'hsl(var(--foreground))' }),
            placeholder: (base) => ({ ...base, color: 'hsl(var(--muted-foreground))' }),
          }}
          {...rest}
        />
      </div>
      {error && <FormError error={error} />}
    </section>
  )
}
