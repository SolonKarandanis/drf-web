import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import themeReducer from './features/themeSlice'
import { apiSlice } from './apiSlice';

export const makeStore = () => {
    return configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        theme:themeReducer,
      },
      middleware: getDefaultMiddleware =>
		      getDefaultMiddleware().concat(apiSlice.middleware),
	    devTools: process.env.NODE_ENV !== 'production',
    })
  }
  
  // Infer the type of makeStore
  export type AppStore = ReturnType<typeof makeStore>
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<AppStore['getState']>
  export type AppDispatch = AppStore['dispatch']