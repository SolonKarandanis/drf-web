import { BrandsWithTotals, CategoriesWithTotals, DiscountsWithTotals, Product, ProductDetails, SizesWithTotals } from '@/models/product.models';
import { Paging, ProductSearchRequest, ProductSearchResponse } from '@/models/search.models';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';


export interface ProductState {
    request:ProductSearchRequest;
	products:Product[],
    count: number| undefined;
    pages:number| null;
    next:number| null;
    previous:number| null;
    selectedProduct:ProductDetails| null;
    categoriesWithTotals:CategoriesWithTotals[];
    brandsWithTotals:BrandsWithTotals[];
    sizesWithTotals:SizesWithTotals[];
    discountsWithTotals:DiscountsWithTotals[];
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
    categoriesWithTotals: [],
    brandsWithTotals: [],
    sizesWithTotals: [],
    discountsWithTotals: [],
	error:null,
} as ProductState;

const productSlice = createSlice({
    name: 'products',
	initialState,
    reducers:{
        setSearchRequest:(state, action:PayloadAction<ProductSearchRequest>) =>{
            const payload =action.payload;
            state.request = payload;
        },
        resetSearchRequest:(state)=>{
            state.request =initialRequest;
        },
        setPaging:(state, action:PayloadAction<Paging>)=>{
            const payload =action.payload;
            state.request.paging =payload;
        },
        setProducts:(state, action:PayloadAction<ProductSearchResponse>) =>{
            const payload =action.payload;
            state.products = payload.data;
            state.count = payload.count;
            state.pages = payload.pages;
            state.next = payload.next;
            state.previous = payload.previous;
        },
        resetProducts:(state)=>{
            state.products = [];
            state.count = undefined;
            state.pages = null;
            state.next = null;
            state.previous = null;
        },
        setSelectedProduct: (state,action:PayloadAction<ProductDetails>)=>{
            state.selectedProduct=action.payload;
        },
        resetSelectedProduct:(state)=>{
            state.selectedProduct=null;
        },
        setCategoriesWithTotals:(state, action:PayloadAction<CategoriesWithTotals[]>) =>{
            state.categoriesWithTotals=action.payload;
        },
        setBrandsWithTotals:(state, action:PayloadAction<BrandsWithTotals[]>) =>{
            state.brandsWithTotals=action.payload;
        },
        setSizesWithTotals:(state, action:PayloadAction<SizesWithTotals[]>) =>{
            state.sizesWithTotals=action.payload;
        },
        setDiscountsWithTotals:(state, action:PayloadAction<DiscountsWithTotals[]>) =>{
            state.discountsWithTotals=action.payload;
        },
    }
});

export const { 
    resetProducts,
    setProducts,
    setSelectedProduct,
    resetSelectedProduct,
    setSearchRequest,
    resetSearchRequest,
    setPaging,
    setCategoriesWithTotals,
    setBrandsWithTotals,
    setSizesWithTotals,
    setDiscountsWithTotals
} = productSlice.actions;

export default productSlice.reducer;

const products = (state: RootState) => state.products;

export const selectedProductSelector = createSelector([products],(products)=>  products.selectedProduct);

export const selectedProductIdSelector = createSelector([selectedProductSelector],(product)=>  product?.id);

export const selectedProductUuidSelector = createSelector([selectedProductSelector],(product)=>  product?.uuid);

export const productsSearchRequestSelector = createSelector([products],(products)=>  products.request);

export const productsSearchResultsSelector = createSelector([products],(products)=>  products.products);

export const productsCountSelector = createSelector([products],(products)=>  products.count);

export const productsCategoriesTotalsSelector = createSelector([products],(products)=>  products.categoriesWithTotals);

export const productsCategoriesTotalsFirstThreeSelector = createSelector([productsCategoriesTotalsSelector],(categories)=>  
    categories.slice(0,3));

export const productsCategoriesTotalsRestSelector = createSelector([productsCategoriesTotalsSelector],(categories)=>  
    categories.slice(3));

export const productsBrandsTotalsSelector = createSelector([products],(products)=>  products.brandsWithTotals);

export const productsBrandsTotalsFirstThreeSelector = createSelector([productsBrandsTotalsSelector],(brands)=>  
    brands.slice(0,3));

export const productsBrandsTotalsRestSelector = createSelector([productsBrandsTotalsSelector],(brands)=>  
    brands.slice(3));

export const productsSizesTotalsSelector = createSelector([products],(products)=>  products.sizesWithTotals);

export const productsSizesTotalsForstThreeSelector = createSelector([productsSizesTotalsSelector],(sizes)=>  
    sizes.slice(0,3));

export const productsSizesTotalsRestSelector = createSelector([productsSizesTotalsSelector],(sizes)=>  
    sizes.slice(3));

export const productsDiscountsTotalsSelector = createSelector([products],(products)=>  products.discountsWithTotals);

export const productsDiscountsTotalsFirstThreeSelector = createSelector([productsDiscountsTotalsSelector],(discounts)=>  
    discounts.slice(0,3));

export const productsDiscountsTotalsRestSelector = createSelector([productsDiscountsTotalsSelector],(discounts)=>  
    discounts.slice(3));

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
