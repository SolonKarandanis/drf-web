import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import usersReducer, { userSearchlistenerMiddleware } from './features/users/usersSlice'
import { apiSlice } from './apiSlice';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const usersPersistConfig = {
  key: "users",
  storage: storage,
};

const reducers = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  theme: themeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export const makeStore = () => {
    return configureStore({
      reducer: reducers,
      middleware: getDefaultMiddleware =>
		    getDefaultMiddleware({ serializableCheck: false })
          // .prepend(userSearchlistenerMiddleware.middleware)
          .concat(apiSlice.middleware),
	    devTools: process.env.NODE_ENV !== 'production',
    })
  }
  
  // Infer the type of makeStore
  export type AppStore = ReturnType<typeof makeStore>
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<AppStore['getState']>
  export type AppDispatch = AppStore['dispatch']