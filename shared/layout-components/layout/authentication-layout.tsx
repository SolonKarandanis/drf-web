import { ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import {makeStore} from "@/shared/redux/store"

const Authenticationlayout = ({children}:{ children: ReactNode}) => {
  return (
    <>
        <Provider store={makeStore()}>
            <HelmetProvider>
                <Helmet>
                    <body className=''></body>
                </Helmet>
                {children}
            </HelmetProvider>
        </Provider>
    </>
  )
}

export default Authenticationlayout