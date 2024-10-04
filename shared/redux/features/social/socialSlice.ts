import { SocialModel, UserSocials } from "@/models/social.models";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface SocialState {
	socials:SocialModel[];
    selectedUserSocials:UserSocials[],
    error:string| null;
}

const initialState = {
	socials: [],
    selectedUserSocials:[],
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
        },
        setUserSocials:(state, action:PayloadAction<UserSocials[]>) =>{
            const payload =action.payload;
            state.selectedUserSocials=payload;
        },
        resetUserSocials:(state)=>{
            state.selectedUserSocials = []
        }
    }
});

export const { 
    setSocials,
    resetSocials,
    setUserSocials,
    resetUserSocials
} = socialSlice.actions;
export default socialSlice.reducer;


const socials = (state: RootState) => state.socials

export const userAvailableSocialsSelector = createSelector([socials], (socials) => {
    const allSocials = socials.socials;
    const selectedSocials = socials.selectedUserSocials;

    return allSocials.filter(social=>selectedSocials.some(({socialId})=>social.id !== socialId))
});