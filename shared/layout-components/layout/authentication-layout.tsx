'use client';

import { ReactNode } from 'react'
import Switcher from '../switcher/switcher';

const Authenticationlayout = ({children}:{ children: ReactNode}) => {
  return (
    <>
      <body></body>
      {children}
      {/* <Switcher/> */}
    </>
  )
}

export default Authenticationlayout