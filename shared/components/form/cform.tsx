import {FC, FormHTMLAttributes,PropsWithChildren} from 'react'
import { twMerge } from "tailwind-merge";

interface Props extends FormHTMLAttributes<HTMLFormElement>{
    className?:string ,
}


const CForm:FC<PropsWithChildren<Props>> = ({children,className,...props}) => {
  return (
    <form noValidate className={twMerge('space-y-6',className)} {...props}>
        {children}
    </form>
  )
}

export default CForm