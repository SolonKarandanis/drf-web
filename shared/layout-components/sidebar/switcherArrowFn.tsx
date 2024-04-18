export function switcherArrowFn() {
    // used to remove is-expanded class and remove class on clicking arrow buttons
    function slideClick() {
        const slide = document.querySelectorAll<HTMLElement>(".slide");
        const slideMenu = document.querySelectorAll<HTMLElement>(".slide-menu");
        slide.forEach((element) => {
            if (element.classList.contains("is-expanded") == true) {
                element.classList.remove("is-expanded");
            }
        });
        slideMenu.forEach((element) => {
            if (element.classList.contains("open") == true) {
                element.classList.remove("open");
                element.style.display = "none";
            }
        });
    }

    slideClick();
}