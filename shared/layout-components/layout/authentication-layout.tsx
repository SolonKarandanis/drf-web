'use client';

import { ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Switcher from '../switcher/switcher';

const Authenticationlayout = ({children}:{ children: ReactNode}) => {
  return (
    <>
      <HelmetProvider>
          <Helmet>
              <body></body>
          </Helmet>
          {children}
          <Switcher/>
      </HelmetProvider>
    </>
  )
}

export default Authenticationlayout