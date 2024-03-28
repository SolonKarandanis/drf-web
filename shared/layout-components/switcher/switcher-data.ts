import { useState } from "react";

import { ThemeState } from "@/shared/redux/features/themeSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useThemeState } from "@/hooks/use-themestate";



export function Dark(actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "class": "dark",
        "dataHeaderStyles": "dark",
        "dataMenuStyles": "dark",
        "bodyBg": "",
        "darkBg": "",
        "inputBorder": "",
        "Light": "",
    }))
    localStorage.setItem("ynexdarktheme", "dark");
    localStorage.removeItem("ynexlighttheme");
    localStorage.removeItem("bodyBgRGB");
    localStorage.removeItem("darkBgRGB");
    localStorage.removeItem("inputBorder");
    localStorage.removeItem("Light");
}

export function Light(actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "class": "light",
        "dataHeaderStyles": "light",
        "bodyBg": "",
        "darkBg": "",
        "inputBorder": "",
        "Light": "",
        "dataMenuStyles": theme.dataNavLayout == 'horizontal' ? '' : "dark"
    }))
    localStorage.setItem("ynexlighttheme", "light");
    localStorage.removeItem("ynexdarktheme");
    localStorage.removeItem("bodyBgRGB");
    localStorage.removeItem("primaryRGB");
    localStorage.removeItem("primaryRGB1");
    localStorage.removeItem("inputBorder");
    localStorage.removeItem("Light");

}

export function Ltr(actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({ ...theme, "dir": "ltr" }))
    localStorage.removeItem("ynexrtl");
};
export function Rtl(actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({ ...theme, "dir": "rtl", }))
    localStorage.setItem("ynexrtl", "rtl");
};
export const Vertical = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataMenuStyles": "dark",
        "dataVerticalStyle": "overlay",
        "dataToggled": "",
        "dataNavStyle": ''
    }))
    localStorage.setItem("ynexlayout", "vertical");
    localStorage.removeItem("ynexnavstyles");

};

export const HorizontalClick = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    setTimeout(() => {
        const element:HTMLElement|null = document.querySelector(".main-content");
        if (element){
            element.click();
        }
    }, 100);
    dispatch(actionfunction({
        ...theme,
        "dataNavLayout": "horizontal",
        "dataMenuStyles": localStorage.ynexdarktheme ? 'dark' : localStorage.darkBgRGB ? 'dark' : localStorage.ynexMenu ? localStorage.ynexMenu : "light",
        "dataVerticalStyle": "",
        "dataNavStyle": localStorage.ynexnavstyles ? localStorage.ynexnavstyles : "menu-click"

    }))
    localStorage.setItem("ynexlayout", "horizontal");
    localStorage.removeItem("ynexverticalstyles");
};
export const Menuclick = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataNavStyle": "menu-click",
        "dataToggled": "menu-click-closed",
        "dataVerticalStyle": ""

    }))
    localStorage.setItem("ynexnavstyles", "menu-click");

};
export const MenuHover = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataNavStyle": "menu-hover",
        "dataVerticalStyle": "",
        "dataToggled": "menu-hover-closed",
        "horStyle": ""
    }))
    localStorage.setItem("ynexnavstyles", "menu-hover");
    localStorage.removeItem("ynexverticalstyles");
};

export const IconClick = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataVerticalStyle": "",
        "dataNavStyle": "icon-click",
        "dataToggled": "icon-click-closed",
    }))
    localStorage.setItem("ynexnavstyles", "icon-click");
    localStorage.removeItem("ynexverticalstyles");
    const Sidebar:HTMLElement|null = document.querySelector(".main-menu");
    if(Sidebar){
        Sidebar.style.marginInline = "0px";
    }
    
};
export const IconHover = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    setTimeout(() => {
        const ulElement:HTMLElement|null = document?.querySelector(".slide.has-sub.open ul");
      
        ulElement && (
          ulElement.classList.toggle("child1"),
          ulElement.style.display = ulElement.classList.contains("child1") ? "block" : "none"
        );
      }, 100);
    dispatch(actionfunction({
        ...theme,
        "dataVerticalStyle": "",
        "dataNavStyle": "icon-hover",
        "dataToggled": "icon-hover-closed"
    }))
    localStorage.setItem("ynexnavstyles", "icon-hover");
    localStorage.removeItem("ynexverticalstyles");
    const Sidebar:HTMLElement|null = document.querySelector(".main-menu");
    if(Sidebar){
        Sidebar.style.marginInline = "0px";
    }
};

export const Regular = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataPageStyle": "regular"
    }));
    localStorage.setItem("ynexregular", "Regular");
    localStorage.removeItem("ynexclassic");
    localStorage.removeItem("ynexmodern");
};

export const Classic = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataPageStyle": "classic",
    }));
    localStorage.setItem("ynexclassic", "Classic");
    localStorage.removeItem("ynexregular");
    localStorage.removeItem("ynexmodern");
};
export const Modern = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataPageStyle": "modern",
    }));
    localStorage.setItem("ynexmodern", "Modern");
    localStorage.removeItem("ynexregular");
    localStorage.removeItem("ynexclassic");
};
export function Enable(actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "loader": "enable"
    }));
    localStorage.setItem("ynexloaderenable", "enable");
    localStorage.removeItem("ynexloaderdisable");
}
export function Disable(actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "loader": "disable"
    }));
    localStorage.setItem("ynexloaderdisable", "disable");
    localStorage.removeItem("ynexloaderenable");
}

export const Fullwidth = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataWidth": "fullwidth",
    }))
    localStorage.setItem("ynexfullwidth", "Fullwidth");
    localStorage.removeItem("ynexboxed");

};
export const Boxed = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataWidth": "boxed",
    }))
    localStorage.setItem("ynexboxed", "Boxed");
    localStorage.removeItem("ynexfullwidth");
};
export const FixedMenu = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataMenuPosition": "fixed",
    }))
    localStorage.setItem("ynexmenufixed", "MenuFixed");
    localStorage.removeItem("ynexmenuscrollable");
};

export const ScrollMenu = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataMenuPosition": "scrollable",
    }))
    localStorage.setItem("ynexmenuscrollable", "Menuscrolled");
    localStorage.removeItem("ynexmenufixed")
};

export const Headerpostionfixed = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataHeaderPosition": "fixed",
    }))
    localStorage.setItem("ynexheaderfixed", 'FixedHeader');
    localStorage.removeItem("ynexheaderscrollable");
};
export const Headerpostionscroll = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataHeaderPosition": "scrollable",
    }))
    localStorage.setItem("ynexheaderscrollable", "ScrollableHeader");
    localStorage.removeItem("ynexheaderfixed");
};

export const Defaultmenu = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataVerticalStyle": "overlay",
        "dataNavLayout": "vertical",
        "dataToggled": "closed"
    }))
    localStorage.removeItem("ynexverticalstyles");
};
export const Closedmenu = (actionfunction:ActionCreatorWithPayload<ThemeState, "theme/ThemeChanger">) => {
    const dispatch = useAppDispatch();
    const [theme] = useThemeState();
    dispatch(actionfunction({
        ...theme,
        "dataNavLayout": "vertical",
        "dataVerticalStyle": "closed",
        "dataToggled": "close-menu-close"
    }))
    localStorage.setItem("ynexverticalstyles", "closed");

};