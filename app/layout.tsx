import {FC, ReactNode} from 'react'

interface Props{
    children:ReactNode
}


const RootLayout:FC<Props> = ({children}) => {
  return (
    <>{children}</>
  )
}

export default RootLayout