import { useAppSelector } from "@/shared/redux/hooks";
import { switcherArrowFn } from "./switcherArrowFn";

const SlideRight = () => {
    const themeState = useAppSelector(state => state.theme);
    
    function slideRight() {
        const menuNav = document.querySelector<HTMLElement>(".main-menu");
        const mainContainer1 = document.querySelector<HTMLElement>(".main-sidebar");
        if (menuNav && mainContainer1) {
            const marginLeftValue = Math.ceil(
                Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0])
            );
            const marginRightValue = Math.ceil(
                Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
            );
            const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
            let mainContainer1Width = mainContainer1.offsetWidth;
            if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
                if (!(themeState.dir === "rtl")) {
                    if (Math.abs(check) > Math.abs(marginLeftValue)) {
                        menuNav.style.marginInlineEnd = "0";
                        if (!(Math.abs(check) > Math.abs(marginLeftValue) + mainContainer1Width)) {
                            mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
                            const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
                            if (slideRightButton) {
                                slideRightButton.classList.add("hidden");
                            }
                        }
                        menuNav.style.marginInlineStart =
                            (Number(menuNav.style.marginInlineStart.split("px")[0]) -
                                Math.abs(mainContainer1Width)) +
                            "px";
                        const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
                        if (slideRightButton) {
                            slideRightButton.classList.remove("hidden");
                        }
                    }
                } else {
                    if (Math.abs(check) > Math.abs(marginRightValue)) {
                        menuNav.style.marginInlineEnd = "0";
                        if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
                            mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
                            const slideRightButton = document.querySelector<HTMLElement>("#slide-right");
                            if (slideRightButton) {
                                slideRightButton.classList.add("hidden");
                            }
                        }
                        menuNav.style.marginInlineStart =
                            (Number(menuNav.style.marginInlineStart.split("px")[0]) -
                                Math.abs(mainContainer1Width)) +
                            "px";

                        const slideLeftButton = document.querySelector<HTMLElement>("#slide-left");
                        if (slideLeftButton) {
                            slideLeftButton.classList.remove("hidden");
                        }
                    }
                }
            }
            const element = document.querySelector<HTMLElement>(".main-menu > .slide.open");
            const element1 = document.querySelector<HTMLElement>(".main-menu > .slide.open > ul");
            if (element) {
                element.classList.remove("active");
            }
            if (element1) {
                element1.style.display = "none";
            }
        }
        switcherArrowFn();
    }

    return (
        <div className="slide-right" onClick={() => { slideRight(); }} id="slide-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
        </div>
    )
}

export default SlideRight