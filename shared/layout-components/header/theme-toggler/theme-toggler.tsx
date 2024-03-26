import { ThemeChanger } from "@/shared/redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import Link from "next/link"


const ThemeToggler = () => {
    const dispatch = useAppDispatch();
    const themeState = useAppSelector(state => state.theme);
    
    const ToggleDark = () => {
        dispatch(ThemeChanger({
          ...themeState,
          "class": themeState.class == "dark" ? "light" : "dark",
          "dataHeaderStyles": themeState.dataHeaderStyles == "dark" ? "light" : "dark",
          "dataMenuStyles": themeState.dataNavLayout == "horizontal" ? themeState.dataMenuStyles == "dark" ? "light" : "dark" : "dark"
    
        }));
        if (themeState.class != "dark") {
          dispatch(ThemeChanger({
            ...themeState,
            "bodyBg": "",
            "darkBg": "",
            "inputBorder": "",
            "Light": "",
            "dataHeaderStyles": "",
          }));
          localStorage.setItem("ynexdarktheme", "dark");
          localStorage.removeItem("ynexdarktheme");
          localStorage.removeItem("ynexHeader");
          localStorage.removeItem("ynexMenu");
        }
        else {
          localStorage.setItem("ynexdarktheme", "dark");
          localStorage.removeItem("ynexlighttheme");
        }
      };

    return (
        <div 
            className="header-element header-theme-mode hidden !items-center sm:block !py-[1rem] md:!px-[0.65rem] px-2" 
            onClick={() => ToggleDark()}>
            <Link aria-label="anchor"
                className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                href="#!" data-hs-theme-click-value="dark">
                <i className="bx bx-moon header-link-icon"></i>
            </Link>
            <Link aria-label="anchor"
                className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium text-defaulttextcolor  transition-all text-xs dark:bg-bodybg dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                href="#!" data-hs-theme-click-value="light">
                <i className="bx bx-sun header-link-icon"></i>
            </Link>
        </div>
    )
}

export default ThemeToggler