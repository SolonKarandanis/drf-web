import {FC, FormHTMLAttributes, ReactNode} from 'react'

interface Props extends FormHTMLAttributes<HTMLFormElement>{
    children:ReactNode
}


const CustomForm:FC<Props> = ({children,...props}) => {
  return (
    <form noValidate className='space-y-6' {...props}>
        {children}
    </form>
  )
}

export default CustomForm