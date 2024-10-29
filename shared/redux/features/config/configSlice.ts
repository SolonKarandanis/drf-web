import { ConfigModel } from '@/models/config.model';
import {  createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';


const initialState ={
    baseUrl:'',
    djangoHost:''
} as ConfigModel

const configSlice = createSlice({
    name: 'config',
	initialState,
    reducers:{
        setConfig: (state, action:PayloadAction<ConfigModel>) =>{
            const config = action.payload;
            state.baseUrl = config.baseUrl;
            state.djangoHost=config.djangoHost;
        }
    }
});

export const { 
    setConfig,
} = configSlice.actions;
export default configSlice.reducer;

const config = (state: RootState) => state.config;
