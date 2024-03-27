import { ThemeChanger, ThemeState,toggleDarkTheme,toggleLightTheme } from "@/shared/redux/features/themeSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import Link from "next/link"
import { FC, useState } from "react";

interface Props{
  themeStoreState:ThemeState;
}


const ThemeToggler:FC<Props>= ({themeStoreState}) => {
    const dispatch = useAppDispatch();
    const lightTheme = themeStoreState.class == 'light'? true:false;
    const [isLightTheme, SetIsLightTheme] = useState(lightTheme);

    const ToggleDark = () => {
      if(isLightTheme){
        SetIsLightTheme(false);
        dispatch(toggleDarkTheme());
        localStorage.setItem("ynexdarktheme", "dark");
        localStorage.removeItem("ynexlighttheme");
      }
      else{
        SetIsLightTheme(true);
        dispatch(toggleLightTheme());
        localStorage.setItem("ynexdarktheme", "dark");
        localStorage.removeItem("ynexdarktheme");
        localStorage.removeItem("ynexHeader");
        localStorage.removeItem("ynexMenu");
      }

      // let newState:ThemeState = {
      //   ...localThemeState,
      //   "class": localThemeState.class == "dark" ? "light" : "dark",
      //   "dataHeaderStyles": localThemeState.dataHeaderStyles == "dark" ? "light" : "dark",
      //   "dataMenuStyles": localThemeState.dataNavLayout == "horizontal" ? localThemeState.dataMenuStyles == "dark" ? "light" : "dark" : "dark"
      // }
      // console.log(newState);
      // dispatch(ThemeChanger(newState));
      // SetLocalThemeState(newState);
      // console.log(localThemeState);
      
      // if (localThemeState.class != "dark") {
      //   console.log(localThemeState);
      //   newState ={
      //     ...localThemeState,
      //     "bodyBg": "",
      //     "darkBg": "",
      //     "inputBorder": "",
      //     "Light": "",
      //     "dataHeaderStyles": "",
      //   }
      //   console.log(newState);
      //   dispatch(ThemeChanger(newState));
      //   SetLocalThemeState(newState);
      //   localStorage.setItem("ynexdarktheme", "dark");
      //   localStorage.removeItem("ynexdarktheme");
      //   localStorage.removeItem("ynexHeader");
      //   localStorage.removeItem("ynexMenu");
      // }
      // else {
      //   localStorage.setItem("ynexdarktheme", "dark");
      //   localStorage.removeItem("ynexlighttheme");
      // }
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