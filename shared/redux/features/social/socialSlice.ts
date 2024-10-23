import { SocialModel, UserSocials } from "@/models/social.models";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SocialsType } from "@/schemas/social.schemas";

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

export const socialsSelector = createSelector([socials], (socials) => {
    return socials.socials;
});

export const userSelectedSocialsSelector = createSelector([socials], (socials) => {
    return socials.selectedUserSocials;
});


export const userAvailableSocialsSelector = createSelector([socialsSelector,userSelectedSocialsSelector], (allSocials,selectedUserSocials) => {
    return allSocials.filter(social=>selectedUserSocials.some(({socialId})=>social.id !== socialId))
});

export const defaultSocialValuesSelector = (userId: number) => createSelector([userSelectedSocialsSelector],(selectedUserSocials)=>{
    return selectedUserSocials.map(({socialId,url})=>{
        return {socialId:String(socialId),url,userId} as SocialsType;
    });
});
