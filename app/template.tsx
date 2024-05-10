import {FC, ReactNode} from 'react'

interface Props{
    children:ReactNode
}

const Template:FC<Props> = ({children}) => {
  return (
    <>{children}</>
  )
}

export default Template