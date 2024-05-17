import { UserSearchResponse } from '@/models/search.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'



interface UsersState {
	users:UserModel[];
	isLoading: boolean;
	selectedUser:UserDetails | null;
    error:string| null;
}

const initialState = {
	users: [],
	isLoading: false,
	selectedUser:null,
	error:null,
} as UsersState;

const usersSlice = createSlice({
    name: 'users',
	initialState,
	reducers:{
        setUsers:(state, action:PayloadAction<UserSearchResponse>) =>{

        },
        resetUsers:(state)=>{
            state.users = [];
        },
        setSelectedUser: (state,action:PayloadAction<UserDetails>)=>{
            state.selectedUser = action.payload;
        }
    }
});

export const { 
    setUsers,
    setSelectedUser,
    resetUsers 
} = usersSlice.actions;
export default usersSlice.reducer;