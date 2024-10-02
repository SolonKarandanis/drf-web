import { ImageModel } from '@/models/image.models';
import { Paging, UserSearchRequest, UserSearchResponse } from '@/models/search.models';
import { UserAcount, UserGroup, UserModel, UserStatus } from '@/models/user.models';
import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsersState {
	users:UserModel[];
    count: number| undefined;
    pages:number| null;
    next:number| null;
    previous:number| null;
    tableSearchField:string;
    request:UserSearchRequest;
    userGroups:UserGroup[];
    userStatuses:UserStatus[];
	selectedUser:UserAcount | null;
    userProfileImage:ImageModel | null;
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
    count: undefined,
    pages: null,
    next: null,
    previous: null,
    tableSearchField: "firstName",
    request: initialRequest,
    userGroups: [],
    userStatuses:[],
	selectedUser:null,
    userProfileImage: null,
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
            state.count = undefined
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
        setPaging:(state, action:PayloadAction<Paging>)=>{
            const payload =action.payload
            state.request.paging =payload
        },
        setSelectedUser: (state,action:PayloadAction<UserAcount>)=>{
            state.selectedUser = action.payload;
        },
        setProfileImage:(state,action:PayloadAction<ImageModel>)=>{
            state.userProfileImage= action.payload
        },
        resetProfileImage:(state)=>{
            state.userProfileImage =null
        },
        setUserGroups: (state,action:PayloadAction<UserGroup[]>)=>{
            state.userGroups= action.payload
        },
        setError: (state)=>{

        }
    }
});

export const userSearchlistenerMiddleware = createListenerMiddleware();

// userSearchlistenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
//     predicate: (_action, currentState, previousState) => {
//       return currentState.users.request.paging.page !== previousState.users.request.paging.page
//     },
//     effect: async (_action, listenerApi) => {
//       listenerApi.cancelActiveListeners();
//       await listenerApi.delay(500);
  
//       const pokemon = await pokemonSearch(listenerApi.getState().pokemon.search);
//       listenerApi.dispatch(pokemonUpdated(pokemon));
//         search(currentState.users.re)
//         .unwrap()
//         .then((response:UserSearchResponse ) => {
//             listenerApi.dispatch(setUsers(response));
//         })
//     },
//   });

export const { 
    setUsers,
    setSelectedUser,
    setProfileImage,
    resetProfileImage,
    resetUsers,
    setSearchRequest,
    resetSearchRequest,
    setPaging,
    setUserGroups,
} = usersSlice.actions;
export default usersSlice.reducer;