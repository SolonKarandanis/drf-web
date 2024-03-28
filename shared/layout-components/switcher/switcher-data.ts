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