'use client';

import { FC, ReactNode, useEffect, useState } from 'react'

type Props = {
	children: ReactNode;
}


const ContentLayoutClient:FC<Props> = ({children}) => {
    const [lateLoad, setlateLoad] = useState(false);
	const Add = () => {
	  document.querySelector("body")?.classList.remove("error-1");
	  document.querySelector("body")?.classList.remove("landing-body");
	};

    useEffect(() => {
        Add();
        setlateLoad(true);
    },[setlateLoad]);
    
    useEffect(() => {
        import("preline");
  
    }, []);
    
    return (
        <div style={{display: `${lateLoad ? 'block' : 'none'}`}}>
            {children}
        </div>
    )
}

export default ContentLayoutClient

// onClick={Bodyclick}