import { Paging, UserSearchRequest, UserSearchResponse } from '@/models/search.models';
import { UserAcount, UserModel } from '@/models/user.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'



interface UsersState {
	users:UserModel[];
    count: number| null;
    pages:number| null;
    next:number| null;
    previous:number| null;
    tableSearchField:string;
    request:UserSearchRequest;
	selectedUser:UserAcount | null;
    error:string| null;
}



const intialPaging ={
    page:1,
    limit:5,
} as Paging;

export const initialRequest = {
    email:"",
    username:"",
    name:"",
    role:0,
    status:undefined,
    paging:intialPaging
} as UserSearchRequest;


const initialState = {
	users: [],
    count: null,
    pages: null,
    next: null,
    previous: null,
    tableSearchField: "firstName",
    request: initialRequest,
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
        },
        resetUsers:(state)=>{
            state.users = [];
            state.count = null
            state.pages = null
            state.next = null
            state.previous = null
        },
        setSearchRequest:(state, action:PayloadAction<UserSearchRequest>) =>{
            const payload =action.payload
            state.request = payload
        },
        resetSearchRequest:(state)=>{
            state.request =initialRequest
        },
        setSelectedUser: (state,action:PayloadAction<UserAcount>)=>{
            state.selectedUser = action.payload;
        },
        setError: (state)=>{

        }
    }
});

export const { 
    setUsers,
    setSelectedUser,
    resetUsers,
    setSearchRequest,
    resetSearchRequest,
} = usersSlice.actions;
export default usersSlice.reducer;