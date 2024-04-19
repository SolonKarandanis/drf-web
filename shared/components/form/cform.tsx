import {FC, FormHTMLAttributes, ReactNode} from 'react'
import { twMerge } from "tailwind-merge";

interface Props extends FormHTMLAttributes<HTMLFormElement>{
    children:ReactNode,
    className?:string ,
}


const CForm:FC<Props> = ({children,className,...props}) => {
  return (
    <form noValidate className='space-y-6' {...props}>
        {children}
    </form>
  )
}

export default CForm