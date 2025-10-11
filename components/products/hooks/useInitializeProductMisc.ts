import { useLazyGetAllAttributesQuery, useLazyGetAllBrandsQuery, useLazyGetAllCategoriesQuery } from "@/shared/redux/features/products/productsApiSlice";
import { setAtributes, setBrands, setCategories } from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useInitializeProductMisc(){
    const [getCategories,categoryState] = useLazyGetAllCategoriesQuery();
    const [getBrands,brandState] = useLazyGetAllBrandsQuery();
    const [getAttributes,attributeState] = useLazyGetAllAttributesQuery();

    const dispatch = useAppDispatch();

    useEffect(()=>{
        getCategories()
            .unwrap()
            .then((result) =>dispatch(setCategories(result)))
            .catch(()=>{
        })

        getBrands()
            .unwrap()
            .then((result) =>dispatch(setBrands(result)))
            .catch(()=>{
        })

        getAttributes()
            .unwrap()
            .then((result) =>dispatch(setAtributes(result)))
            .catch(()=>{
        })
    },[])

    return{
        categoryState,
        brandState,
        attributeState
    }
}