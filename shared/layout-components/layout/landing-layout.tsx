'use client';

import { ReactNode, useEffect } from 'react'

const Landinglayout = ({children}:{ children: ReactNode}) => {
    useEffect(() => {
		import("preline");

	}, []);

    return (
        <>
            {children}
            <div id="responsive-overlay"></div>
        </>
    )
}

export default Landinglayout