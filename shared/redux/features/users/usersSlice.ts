import { UserSearchResponse } from '@/models/search.models';
import { UserAcount, UserModel } from '@/models/user.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'



interface UsersState {
	users:UserModel[];
    count: number| null;
    pages:number| null;
    next:number| null;
    previous:number| null;
	isLoading: boolean;
	selectedUser:UserAcount | null;
    error:string| null;
}

const initialState = {
	users: [],
    count: null,
    pages: null,
    next: null,
    previous: null,
	isLoading: false,
	selectedUser:null,
	error:null,
} as UsersState;

const usersSlice = createSlice({
    name: 'users',
	initialState,
	reducers:{
        setUsers:(state, action:PayloadAction<UserSearchResponse>) =>{
            const payload =action.payload
            state.users = payload.data
            state.count = payload.count
            state.pages = payload.pages
            state.next = payload.next
            state.previous = payload.previous
            state.isLoading = false
        },
        resetUsers:(state)=>{
            state.users = [];
            state.isLoading = false
            state.count = null
            state.pages = null
            state.next = null
            state.previous = null
        },
        setSelectedUser: (state,action:PayloadAction<UserAcount>)=>{
            state.selectedUser = action.payload;
            state.isLoading = false
        },
        setError: (state)=>{
            state.isLoading = false
        }
    }
});

export const { 
    setUsers,
    setSelectedUser,
    resetUsers 
} = usersSlice.actions;
export default usersSlice.reducer;