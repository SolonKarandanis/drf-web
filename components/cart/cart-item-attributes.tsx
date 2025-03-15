"use client"

import { CartItem } from "@/models/cart.models"
import { getUpdateCartItemAttributesSchema, UpdateCartItemAttributesSchema } from "@/schemas/cart.schemas"
import FormSelect from "@/shared/components/form-select/form-select"
import { useAppSelector } from "@/shared/redux/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useGetProductMisc } from "../products/hooks/useGetProductMisc"
import { ProductAttributes } from "@/models/product.models"
import { useCartApi, useCartData } from "./providers/cart-context"
import { useMutateUserCart } from "./hooks/useMutateUserCart"

interface Props{
    item: CartItem;
    productItemsAttributes:Record<number, ProductAttributes>;
}

const CartItemAttributes:FC<Props> = ({
    item,
    productItemsAttributes,
}) => {
    const t = useTranslations("CART");
    const formT = useTranslations("CART.VALIDATION");
    const [attributes,setAttributes]= useState<string>(JSON.stringify(item.attributes));
    const {
        sizesOptions,
        coloursOptions,
    } = useGetProductMisc();
    const {
        isLoading
    }= useCartData();
    const {
        onChangeItemAttribute
    }= useCartApi();
    const configState = useAppSelector((state)=>state.config);
    const path = configState.baseUrl
    const host = configState.djangoHost

    const productImage = item.previewImage
    const imagePath = productImage ?   `${host}${productImage.image}` : `${path}/assets/images/faces/21.jpg`;

    const updateAttributesForm = useForm<UpdateCartItemAttributesSchema>({
        resolver: zodResolver(getUpdateCartItemAttributesSchema(formT))
    });
    const {errors} = updateAttributesForm.formState;

    const selectedItemAttributes = item.attributes;
    const productItemAttributes = productItemsAttributes[item.id];
    const productSizes=productItemAttributes.sizes.map(size=>size.attributeOptionId);
    const productColors=productItemAttributes.colors.map(color=>color.attributeOptionId);
    const productSizesOptions = sizesOptions.filter(option=>productSizes.includes(option.value as number));
    const productColorOptions = coloursOptions.filter(option=>productColors.includes(option.value as number));
    const selectedSize = selectedItemAttributes[1];
    const selectedColor = selectedItemAttributes[2];

    type SelectField = "size" | "color";

    const onChange= (e:any,field:SelectField) =>{
        const cartItemId = item.id;
        const attributesObj = JSON.parse(attributes);
        if(field == 'size'){
            attributesObj[1]=e.value;
        }
        else{
            attributesObj[2]=e.value;
        }
        const newAttributeString = JSON.stringify(attributesObj);
        setAttributes(newAttributeString);
        onChangeItemAttribute(cartItemId,item.quantity,newAttributeString);
    }

    return (
        <form className="flex items-center">
            <div className="me-4">
                <span className="avatar avatar-xxl bg-light">
                    <img src={imagePath} alt="" />
                </span>
            </div>
            <div className="flex flex-col">
                <div className="mb-1 text-[0.875rem] font-semibold">
                    <Link href={`/products/${item.productDetails.uuid}`}>
                        {`(${item.productDetails.sku}) ${item.productDetails.title}`}
                    </Link>
                </div>
                <div className="flex flex-row items-center justify-start gap-2 mb-1">
                    <span className="me-1">{t("LABELS.size")}:</span>
                    <Controller
                        name="size"
                        control={updateAttributesForm.control}
                        render={({ field }) => (
                            <FormSelect 
                                name="size"
                                isMulti={false}
                                required={true}
                                isSearchable={true}
                                options={productSizesOptions}
                                defaultValues={[selectedSize]}
                                sectionClassName="col-span-12 xl:col-span-6 mb-2 min-w-[10rem]"
                                field={field}
                                error={errors.size?.message}
                                loading={isLoading}
                                onChangeInput={(e)=>onChange(e,'size')}>
                            </FormSelect>
                        )}
                    />
                </div>
                <div className="flex flex-row items-center justify-start mb-1">
                    <span className="me-1">{t("LABELS.color")}:</span>
                    <Controller
                        name="color"
                        control={updateAttributesForm.control}
                        render={({ field }) => (
                            <FormSelect 
                                name="color"
                                isMulti={false}
                                required={true}
                                isSearchable={true}
                                options={productColorOptions}
                                defaultValues={[selectedColor]}
                                sectionClassName="col-span-12 xl:col-span-6 mb-2 min-w-[10rem]"
                                field={field}
                                error={errors.color?.message}
                                loading={isLoading}
                                onChangeInput={(e)=>onChange(e,'color')}>
                            </FormSelect>
                        )}
                    />
                </div>
            </div>
        </form>
    )
}

export default CartItemAttributes