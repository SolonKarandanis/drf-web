import { SocialModel } from "@/models/social.models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface SocialState {
	socials:SocialModel[];
    error:string| null;
}

const initialState = {
	socials: [],
	error:null,
} as SocialState;


const socialSlice = createSlice({
    name: 'social',
	initialState,
    reducers:{
        setSocials:(state, action:PayloadAction<SocialModel[]>) =>{
            const payload =action.payload;
            state.socials = payload;
        },
        resetSocials:(state) =>{
            state = initialState;
        }
    }
});

export const { 
    setSocials,
    resetSocials,
} = socialSlice.actions;
export default socialSlice.reducer;


const users = (state: RootState) => state.socials