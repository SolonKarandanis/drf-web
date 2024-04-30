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

    const [MyclassName, setMyClass] = useState("");
    const Bodyclick = () => {
        if (localStorage.getItem("ynexverticalstyles") == "icontext") {
            setMyClass("");
        }

        if (localStorage.ynexverticalstyles === 'detached') {
            const htmlElement = document.querySelector("html");
            if(htmlElement){
                htmlElement.setAttribute("icon-overlay", "close");
            }
        }
        const mainMenuElement =document.querySelector(".main-menu");
        if(mainMenuElement){
            mainMenuElement.addEventListener("click", function() {
                const htmlElement = document.querySelector("html");
                if(htmlElement){
                    const currentAttribute = htmlElement.getAttribute("icon-overlay");
                    const updatedValue = currentAttribute === "close" ? "open" : "close" ? "open" : "close";
                    htmlElement.setAttribute("icon-overlay", updatedValue);
                }
            });
    
            if (localStorage.ynexverticalstyles === 'overlay') {
                const htmlElement = document.querySelector("html");
                if(htmlElement){
                    htmlElement.setAttribute("icon-overlay", "close");
                }
            }
            
            mainMenuElement.addEventListener("click", function() {
                const htmlElement = document.querySelector("html");
                if(htmlElement){
                    const currentAttribute = htmlElement.getAttribute("icon-overlay");
                    const updatedValue = currentAttribute === "close" ? "open" : "close" ? "open" : "close";
                    htmlElement.setAttribute("icon-overlay", updatedValue);
                }
            });
        }
    }
    
    return (
        <div style={{display: `${lateLoad ? 'block' : 'none'}`}}>
            {children}
        </div>
    )
}

export default ContentLayoutClient

// onClick={Bodyclick}