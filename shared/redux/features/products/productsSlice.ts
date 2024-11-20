import { 
    BrandsWithTotals, 
    CategoriesWithTotals, 
    DiscountsWithTotals, 
    Products, 
    SizesWithTotals, 
    BaseProductDetails,
    ProductDetails,
    Brand
} from '@/models/product.models';
import { ProductSearchResponse } from '@/models/search.models';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { UserPublic } from '@/models/user.models';
import { Comment } from '@/models/comment.models';
import { ImageModel } from '@/models/image.models';


export interface ProductState {
	products:Products[],
    count: number| undefined;
    pages:number| null;
    next:number| null;
    previous:number| null;
    selectedProduct:BaseProductDetails| null;
    selectedProductOwner:UserPublic|null;
    selectedProductComments:Comment[];
    selectedProductImages:ImageModel[];
    selectedProductBrand:Brand|null;
    categoriesWithTotals:CategoriesWithTotals[];
    brandsWithTotals:BrandsWithTotals[];
    sizesWithTotals:SizesWithTotals[];
    discountsWithTotals:DiscountsWithTotals[];
    error:string| null;
};

const initialState = {
	products: [],
    count: undefined,
    pages: null,
    next: null,
    previous: null,
    selectedProduct:null,
    selectedProductOwner:null,
    selectedProductComments:[],
    selectedProductImages:[],
    selectedProductBrand:null,
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
            const {owner,comments,images,brand, ...rest} =action.payload;
            state.selectedProduct=rest;
            state.selectedProductOwner=owner;
            state.selectedProductComments=comments;
            state.selectedProductImages=images;
            state.selectedProductBrand=brand;
        },
        resetSelectedProduct:(state)=>{
            state.selectedProduct=null;
            state.selectedProductOwner=null;
            state.selectedProductComments=[];
            state.selectedProductImages=[];
            state.selectedProductBrand=null;
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

export const productsSearchResultsSelector = createSelector([products],(products)=>  products.products);

export const productsCountSelector = createSelector([products],(products)=>  products.count);

export const productsPreviousSelector = createSelector([products],(products)=>  products.previous);

export const productsNextSelector = createSelector([products],(products)=>  products.next);

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
