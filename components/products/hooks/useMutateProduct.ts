import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { CreatedProductResponse, CreateProductRequest, UpdateProductRequest } from "@/models/product.models";
import { useCreateProductMutation, useUpdateProductMutation } from "@/shared/redux/features/products/productsApiSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useMutateProduct(){
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const [createProduct, { isLoading:createProductLoading }] = useCreateProductMutation();
    const [updateProduct, { isLoading:updateProductLoading }] = useUpdateProductMutation();

    const handleCreateProductRequest= (request:CreateProductRequest) =>{
        createProduct(request)
            .unwrap()
            .then((response:CreatedProductResponse)=>{
                toast.success(t("PRODUCTS.SUCCESS.create-product"));
                // router.push(`/products/${response.productId}`);
            })
            .catch((error:ErrorResponse)=>{
                toast.error(t("PRODUCTS.ERRORS.create-product"));
                handleError(error);
            })
    }

    const handleUpdateProduct = (uuid:string, request:UpdateProductRequest)=>{

    }

    const mutationLoading = createProductLoading || updateProductLoading;

    // const user = useAppSelector(selectedUserSelector);

    return {
        mutationLoading,
        handleCreateProductRequest,
        handleUpdateProduct,
    }

}