import { LoginResponse, RefreshResponse, UserAcount } from '@/models/user.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	user:UserAcount | null;
	token:string | null;
	refreshToken:string|null;
}

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	user: null,
	token:null,
	refreshToken:null,
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccesToken: (state, action:PayloadAction<RefreshResponse>) =>{
			const {access} = action.payload;
			state.token= access;
		},
		setTokens: (state, action: PayloadAction<LoginResponse>) =>{
			const {access,refresh} = action.payload;
			state.token= access;
			state.refreshToken=refresh;
		},
		setAuth: (state, action: PayloadAction<UserAcount>) => {
			state.isAuthenticated = true;
			state.user= action.payload;
			state.isLoading = false;
		},
		logout: state => {
			state.isAuthenticated = false;
			state.user= null;
			state.token= null;
			state.refreshToken= null;
			state.isLoading = false;
		},
		setAthenticated: (state,action:PayloadAction<boolean>) =>{
			state.isAuthenticated = action.payload;
		},
		setLoading: (state,action:PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setAuth,setAccesToken,setTokens, logout, setLoading,setAthenticated } = authSlice.actions;
export default authSlice.reducer;