import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import usersReducer from './features/users/usersSlice';
import productsReducer from './features/products/productsSlice';
import cartsReducer from './features/cart/cartSlice'
import socialReducer from './features/social/socialSlice';
import configReducer from './features/config/configSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import { apiSlice } from './apiSlice';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const usersPersistConfig = {
  key: "users",
  storage: storage,
};

const socialPersistConfig = {
  key: "socials",
  storage: storage,
};

const productsPersistConfig = {
  key: "products",
  storage: storage,
};

const cartsPersistConfig = {
  key: "carts",
};

const reducers = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  socials:persistReducer(socialPersistConfig, socialReducer),
  products:persistReducer(productsPersistConfig, productsReducer),
  carts:cartsReducer,
  wishListItems:wishlistReducer,
  theme: themeReducer,
  config:configReducer,
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