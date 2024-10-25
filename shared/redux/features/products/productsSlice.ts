import { Product, ProductDetails } from '@/models/product.models';
import { Paging, ProductSearchRequest } from '@/models/search.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ProductState {
    request:ProductSearchRequest;
	products:Product[],
    count: number| undefined;
    pages:number| null;
    next:number| null;
    previous:number| null;
    selectedProduct:ProductDetails | null;
    error:string| null;
};

const intialPaging ={
    page:1,
    limit:8,
} as Paging;

export const initialRequest:ProductSearchRequest = {
    query:null,
    paging:intialPaging
};

const initialState = {
    request:initialRequest,
	products: [],
    count: undefined,
    pages: null,
    next: null,
    previous: null,
    selectedProduct:null,
	error:null,
} as ProductState;

// export const pokemonSlice = createSlice({
//     name: "pokemon",
//     initialState,
//     reducers: {
//       searchUpdated: (state, action: PayloadAction<string>) => {
//         state.search = action.payload;
//       },
//       searchReset: (state) => {
//         state.search = "";
//       },
//       pokemonUpdated: (state, action: PayloadAction<Pokemon[]>) => {
//         state.pokemon = action.payload;
//       },
//     },
//   });
  
//   export const { searchUpdated, pokemonUpdated, searchReset } =
//     pokemonSlice.actions;
  
//   const listenerMiddleware = createListenerMiddleware();
  
//   export const store = configureStore({
//     reducer: {
//       pokemon: pokemonSlice.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().prepend(listenerMiddleware.middleware),
//   });
  
//   export type RootState = ReturnType<typeof store.getState>;
//   export type AppDispatch = typeof store.dispatch;
  
//   export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
//   export const useAppSelector = useSelector.withTypes<RootState>();
  
//   export const useSearch = () => useAppSelector((state) => state.pokemon.search);
//   export const usePokemon = () =>
//     useAppSelector((state) => state.pokemon.pokemon);
  
//   listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
//     predicate: (_action, currentState, previousState) => {
//       return currentState.pokemon.search !== previousState.pokemon.search;
//     },
//     effect: async (_action, listenerApi) => {
//       listenerApi.cancelActiveListeners();
//       await listenerApi.delay(500);
  
//       const pokemon = await pokemonSearch(listenerApi.getState().pokemon.search);
//       listenerApi.dispatch(pokemonUpdated(pokemon));
//     },
//   });
