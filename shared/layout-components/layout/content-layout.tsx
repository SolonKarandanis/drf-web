'use client';

import { ReactNode, useEffect, useState } from 'react'
import Header from '@/shared/layout-components/header/Header';
import Sidebar from '@/shared/layout-components/sidebar/SideBar';
import Footer from '@/shared/layout-components/footer/Footer';
import Backtotop from '@/shared/layout-components/backtotop/BackToTop';

const ContentLayout = ({children}:{ children: ReactNode}) => {
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
    const Bodyclickk = () => {
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
       <>
            <div style={{display: `${lateLoad ? 'block' : 'none'}`}}>
                <div className='page'>
                    <Header/>
                    <Sidebar/> 
                    <div className='content'>
                        <div className='main-content'  onClick={Bodyclickk}>
                            {children}
                        </div>
                    </div>
                    <Footer/>
                </div>
                <Backtotop />
            </div>
       </>
    )
}

export default ContentLayout