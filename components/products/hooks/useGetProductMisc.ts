import { AttributeOption, Brand, Category } from "@/models/product.models";
import { 
    allBrandsSelector, 
    allCategoriesSelector, 
    allColoursSelector, 
    allGendersSelector, 
    allSizesSelector, 
} from "@/shared/redux/features/products/productsSlice";
import { useAppSelector } from "@/shared/redux/hooks";
import { Options } from '@/shared/components/props';

export function useGetProductMisc(){
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
    }

}