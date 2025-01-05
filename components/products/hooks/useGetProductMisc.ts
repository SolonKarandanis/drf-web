import { AttributeOption, Brand, Category } from "@/models/product.models";
import { 
    useLazyGetAllBrandsQuery, 
    useLazyGetAllCategoriesQuery, 
    useLazyGetAllColoursQuery, 
    useLazyGetAllGendersQuery, 
    useLazyGetAllSizesQuery
} from "@/shared/redux/features/products/productsApiSlice";
import { 
    allBrandsSelector, 
    allCategoriesSelector, 
    allColoursSelector, 
    allGendersSelector, 
    allSizesSelector, 
    setBrands, 
    setCategories,
    setColours,
    setGenders,
    setSizes
} from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";
import { Options } from '@/shared/components/props';

export function useGetProductMisc(){
    const [getCategories,categoryState] = useLazyGetAllCategoriesQuery();
    const [getBrands,brandState] = useLazyGetAllBrandsQuery();
    const [getSizes,sizeState] = useLazyGetAllSizesQuery();
    const [getColours,colourState] = useLazyGetAllColoursQuery();
    const [getGenders,genderState] = useLazyGetAllGendersQuery();

    const dispatch = useAppDispatch();
    const categories:Category[]= useAppSelector(allCategoriesSelector);
    const brands:Brand[]= useAppSelector(allBrandsSelector);
    const sizes:AttributeOption[]= useAppSelector(allSizesSelector);
    const colours:AttributeOption[]= useAppSelector(allColoursSelector);
    const genders:AttributeOption[]= useAppSelector(allGendersSelector);

    const categoriesOptions = categories.map((category)=> {
        return {
            value:category.id,
            label:category.name
        } as Options
    });

    const brandsOptions = brands.map((brand)=> {
        return {
            value:brand.id,
            label:brand.name
        } as Options
    });

    const sizesOptions = sizes.map((size)=> {
        return {
            value:size.id,
            label:size.name
        } as Options
    });

    const coloursOptions = colours.map((color)=> {
        return {
            value:color.id,
            label:color.name
        } as Options
    });

    const gendersOptions = genders.map((gender)=> {
        return {
            value:gender.id,
            label:gender.name
        } as Options
    });


    useEffect(()=>{
        getCategories()
            .unwrap()
            .then((result) =>dispatch(setCategories(result)))
            .catch((error)=>{
            })

        getBrands()
            .unwrap()
            .then((result) =>dispatch(setBrands(result)))
            .catch((error)=>{
            })

        getSizes()
            .unwrap()
            .then((result) =>dispatch(setSizes(result)))
            .catch((error)=>{
            })

        getColours()
            .unwrap()
            .then((result) =>dispatch(setColours(result)))
            .catch((error)=>{
            })

        getGenders()
            .unwrap()
            .then((result) =>dispatch(setGenders(result)))
            .catch((error)=>{
            })
    },[])
    
    return{
        categories,
        categoriesOptions,
        brands,
        brandsOptions,
        sizes,
        sizesOptions,
        colours,
        coloursOptions,
        genders,
        gendersOptions,
        categoriesLoading:categoryState.isLoading,
        categoriesIsError:categoryState.isError,
        brandsLoading:brandState.isLoading,
        brandsIsError:brandState.isError,
        sizesLoading:sizeState.isLoading,
        sizesIsError:sizeState.isError,
        coloursLoading:colourState.isLoading,
        coloursIsError:colourState.isError,
        gendersLoading:genderState.isLoading,
        gendersIsError:genderState.isError,
    }

}