import { 
    useLazyGetBrandsWithTotalsQuery, 
    useLazyGetCategoriesWithTotalsQuery, 
    useLazyGetDiscountsWithTotalsQuery,
    useLazyGetSizesWithTotalsQuery
} from "@/shared/redux/features/products/productsApiSlice";
import { 
    productsBrandsTotalsSelector,
    productsCategoriesTotalsSelector,
    productsDiscountsTotalsSelector,
    productsSizesTotalsSelector,
    setBrandsWithTotals,
    setCategoriesWithTotals, 
    setDiscountsWithTotals, 
    setSizesWithTotals
} from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetProductTotals(){
    const dispatch = useAppDispatch();
    const [getCategories, { isLoading:categoriesLoading}] = useLazyGetCategoriesWithTotalsQuery();
    const [getBrands, { isLoading:brandsLoading}] = useLazyGetBrandsWithTotalsQuery();
    const [getDiscounts, { isLoading:discountsLoading}] = useLazyGetDiscountsWithTotalsQuery();
    const [getSizes, { isLoading:sizesLoading}] = useLazyGetSizesWithTotalsQuery();
   
   
    useEffect(()=>{
        getCategories()
            .unwrap()
            .then((data) =>{
                dispatch(setCategoriesWithTotals(data));
            })

        getBrands()
            .unwrap()
            .then((data) =>{
                dispatch(setBrandsWithTotals(data));
            })

        getDiscounts()
            .unwrap()
            .then((data) =>{
                dispatch(setDiscountsWithTotals(data));
            })

        getSizes()
            .unwrap()
            .then((data) =>{
                dispatch(setSizesWithTotals(data));
            })
    },[]);

    const categoriesWithTotals = useAppSelector(productsCategoriesTotalsSelector);
    const brandsWithTotals = useAppSelector(productsBrandsTotalsSelector);
    const sizesWithTotals = useAppSelector(productsSizesTotalsSelector);
    const discountsWithTotals = useAppSelector(productsDiscountsTotalsSelector);

    
    return {
        categoriesLoading,
        categoriesWithTotals,
        brandsLoading,
        brandsWithTotals,
        discountsLoading,
        discountsWithTotals,
        sizesLoading,
        sizesWithTotals
    }
    
}