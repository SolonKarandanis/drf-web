'use client';

import { ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Authenticationlayout = ({children}:{ children: ReactNode}) => {
  return (
    <>
      <HelmetProvider>
          <Helmet>
              <body></body>
          </Helmet>
          {children}
      </HelmetProvider>
    </>
  )
}

export default Authenticationlayout