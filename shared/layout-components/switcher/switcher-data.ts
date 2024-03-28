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