'use client';

import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import {makeStore} from "@/shared/redux/store"

const Landinglayout = ({children}:{ children: ReactNode}) => {
    useEffect(() => {
		import("preline");

	}, []);

    return (
        <>
            <Provider store={makeStore()}>
                {children}
                <div id="responsive-overlay"></div>
            </Provider>
        </>
    )
}

export default Landinglayout