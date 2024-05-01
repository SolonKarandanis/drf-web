'use client';

import Link from "next/link"
import { useEffect, useState } from "react";


const FullscreenToggler = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        const element = document.documentElement;
        if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
        ) {
        // Enter fullscreen mode
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullscreen) {
            element.mozRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            // element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        } else {
        // Exit fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        }
    };

    useEffect(() => {
        const fullscreenChangeHandler = () => {
          setIsFullscreen(!!document.fullscreenElement);
        };
    
        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    
        return () => {
          document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
        };
      }, []);

    return (
        <div className="header-element header-fullscreen py-[1rem] md:px-[0.65rem] px-2">
            <Link aria-label="anchor"
                onClick={() => toggleFullscreen()}
                href="#!"
                className="inline-flex flex-shrink-0 justify-center items-center gap-2  !rounded-full font-medium dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                {isFullscreen ? (
                <i className="bx bx-exit-fullscreen full-screen-close header-link-icon"></i>
                ) : (
                <i className="bx bx-fullscreen full-screen-open header-link-icon"></i>
                )}
            </Link>
        </div>
    )
}

export default FullscreenToggler