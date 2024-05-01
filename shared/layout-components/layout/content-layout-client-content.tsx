'use client';

import { FC, ReactNode, useState } from 'react'

type Props = {
	children: ReactNode;
}

const ContentLayoutClientContent:FC<Props> = ({children})=> {
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
        <div className='content'>
            <div className='main-content' onClick={Bodyclick}>
                {children}
            </div>
        </div>
    )
}

export default ContentLayoutClientContent