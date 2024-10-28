import { 
    useLazyGetBrandsWithTotalsQuery, 
    useLazyGetCategoriesWithTotalsQuery, 
    useLazyGetDiscountsWithTotalsQuery,
    useLazyGetSizesWithTotalsQuery
} from "@/shared/redux/features/products/productsApiSlice";
import { 
    productsBrandsTotalsFirstThreeSelector,
    productsBrandsTotalsRestSelector,
    productsCategoriesTotalsFirstThreeSelector,
    productsCategoriesTotalsRestSelector,
    productsDiscountsTotalsFirstThreeSelector,
    productsDiscountsTotalsRestSelector,
    productsSizesTotalsForstThreeSelector,
    productsSizesTotalsRestSelector,
    setBrandsWithTotals,
    setCategoriesWithTotals, 
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

        // getDiscounts()
        //     .unwrap()
        //     .then((data) =>{
        //         dispatch(setDiscountsWithTotals(data));
        //     })

        getSizes()
            .unwrap()
            .then((data) =>{
                dispatch(setSizesWithTotals(data));
            })
    },[]);

    const categoriesFirstThree = useAppSelector(productsCategoriesTotalsFirstThreeSelector);
    const categoriesRest = useAppSelector(productsCategoriesTotalsRestSelector);

    const brandsFirstThree = useAppSelector(productsBrandsTotalsFirstThreeSelector);
    const brandsRest = useAppSelector(productsBrandsTotalsRestSelector);

    const sizesFirstThree = useAppSelector(productsSizesTotalsForstThreeSelector);
    const sizesRest = useAppSelector(productsSizesTotalsRestSelector);

    const discountsFirstThree = useAppSelector(productsDiscountsTotalsFirstThreeSelector);
    const discountsRest = useAppSelector(productsDiscountsTotalsRestSelector);

    
    return {
        categoriesLoading,
        categoriesFirstThree,
        categoriesRest,
        brandsLoading,
        brandsFirstThree,
        brandsRest,
        sizesLoading,
        sizesFirstThree,
        sizesRest,
    }
    
}