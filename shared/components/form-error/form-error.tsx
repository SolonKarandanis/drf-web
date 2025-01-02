import {FC} from 'react'

interface Props{
    error?:string
}

const FormError:FC<Props> = ({error}) => {
  return (
    <p className="mt-2 text-sm text-rose-600 dark:text-rose-500">
      {error}
    </p>
  )
}

export default FormError