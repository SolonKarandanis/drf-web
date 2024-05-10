import NavigationTransition from '@/shared/layout-components/navigation-transition/navigation-transition'
import {FC, ReactNode} from 'react'

interface Props{
    children:ReactNode
}

const Template:FC<Props> = ({children}) => {
  return (
    <NavigationTransition>{children}</NavigationTransition>
  )
}

export default Template