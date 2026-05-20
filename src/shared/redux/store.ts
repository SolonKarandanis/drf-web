import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'
import authReducer from './authSlice'
import cartReducer from './cartSlice'

// Pull the user slice import so its endpoints are injected into apiSlice.
import './userApiSlice'
import './productsApiSlice'
import './usersApiSlice'
import './cartApiSlice'
import './wishlistApiSlice'
import './socialsApiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
