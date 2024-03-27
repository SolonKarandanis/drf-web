import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface Body{
    class: string;
}

export interface ThemeState {
	lang: string;
	dir: string;
	class: string;
	dataMenuStyles: string;
	dataNavLayout: string;
    dataHeaderStyles: string;
    dataVerticalStyle: string;
    dataToggled: string;
    dataNavStyle: string;
    horStyle: string;
    dataPageStyle: string;
    dataWidth: string;
    dataMenuPosition: string;
    dataHeaderPosition: string;
    loader: string;
    iconOverlay: string;
    colorPrimaryRgb: string;
    colorPrimary: string;
    bodyBg: string;
    Light: string;
    darkBg: string;
    inputBorder: string;
    bgImg: string;
    iconText: string;
    body: Body;
}

const initialState = {
    lang: "en",
    dir: "ltr",
    class: "light",
    dataMenuStyles: "dark",
    dataNavLayout: "vertical",
    dataHeaderStyles: "light",
    dataVerticalStyle: "overlay",
    dataToggled: "",
    dataNavStyle: "",
    horStyle: "",
    dataPageStyle: "regular",
    dataWidth: "fullwidth",
    dataMenuPosition: "fixed",
    dataHeaderPosition: "fixed",
    loader: "disable",
    iconOverlay: "",
    colorPrimaryRgb: "",
    colorPrimary: "",
    bodyBg: "",
    Light: "",
    darkBg: "",
    inputBorder: "",
    bgImg: "",
    iconText: "",
    body: {
        class: ""
    },
} as ThemeState;

const themeSlice = createSlice({
    name: 'theme',
	initialState,
    reducers:{
        ThemeChanger:(state, action:PayloadAction<ThemeState>) =>{
            console.log(state)
            state = action.payload;
        }
    }
});

export const { ThemeChanger } = themeSlice.actions;
export default themeSlice.reducer;