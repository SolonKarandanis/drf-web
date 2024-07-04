import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface ConfigState{
    baseUrl:string;
}

const initialState ={
    baseUrl:''
} as ConfigState

const configSlice = createSlice({
    name: 'config',
	initialState,
    reducers:{
        setBaseUrl: (state, action:PayloadAction<string>) =>{
            state.baseUrl = action.payload;
        }
    }
});

export const { 
    setBaseUrl,
} = configSlice.actions;
export default configSlice.reducer;