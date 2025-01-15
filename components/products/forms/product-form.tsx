"use client"

import { FC } from 'react';
import FormButton from '@/shared/components/button/form-button';
import { useTranslations } from 'next-intl';
import { Options } from '@/shared/components/props';
import FormSelect from '@/shared/components/form-select/form-select';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getSaveProductSchema, SaveProductSchema } from '@/schemas/product.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/shared/components/form-input/form-input';
import FormTextArea from '@/shared/components/form-textarea/form-textarea';
import FormDate from '@/shared/components/form-date/form-date';
import AttributesSection from './sections/attributes-section';
import { useMutateProduct } from '../hooks/useMutateProduct';
import { CreateProductRequest } from '@/models/product.models';
import FileUpload from '@/shared/components/file-upload/file-upload';


interface Props{
    defaultValues?:any;
    isProductLoading?:boolean;
    isEdit?:boolean;
}

const defaultFormValues={
    title:'',
    sku:'',
    brand:undefined,
    gender:undefined,
    category:undefined,
    publishDate: new Date(),
    publishStatus:'',
    availabilityStatus:'',
    inventory:0,
    price:0,
    content:'',
    fabricDetails:'',
    careInstructions:'',
    colors:undefined,
    sizes:undefined 
}

const ProductForm:FC<Props> = ({
    defaultValues=defaultFormValues, 
    isProductLoading=false,
    isEdit=false,
}) => {
    const t = useTranslations("PRODUCTS.CREATE");
    const formT = useTranslations("PRODUCTS.VALIDATION");
    const imageT = useTranslations("GLOBAL.VALIDATION.IMAGES");
    const {
       mutationLoading,
       handleCreateProductRequest,
       handleUpdateProduct,
    } = useMutateProduct();
    
    const publishStatusOptions: Options[] = [
        {value:'product.status.published',label:t(`LABELS.published`)},
        {value:'product.status.scheduled',label:t(`LABELS.scheduled`)}
    ];

    const availabilityStatusOptions: Options[] = [
        {value:'product.availability.in.stock',label:t(`LABELS.in-stock`)},
        {value:'product.availability.out.of.stock',label:t(`LABELS.out-of-stock`)}
    ];

    const {
        register,
        control,
        handleSubmit,
        formState
    } = useForm<SaveProductSchema>({
        resolver: zodResolver(getSaveProductSchema(formT,imageT)),
        defaultValues
    })

    const {errors} = formState

    const onCreate: SubmitHandler<SaveProductSchema> = async (data) =>{
        const {category,publishDate, ...rest} = data;
        const request:CreateProductRequest={
            categories:[category],
            publishedDate: publishDate.toLocaleDateString(),
            ...rest
        }
        console.log(request);
        // handleCreateProductRequest(request);
    }

    const onUpdate: SubmitHandler<SaveProductSchema> = async (data) =>{
        console.log(data)
    }

    return (
        <form className="p-6">
            <div className="grid grid-cols-12 md:gap-x-[3rem] gap-0">
                <div className="col-span-12 xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 xl:col-span-12">
                            <FormInput 
                                type='text'
                                required={true}
                                name='title'
                                autoComplete="product-name" 
                                placeholder={t(`PLACEHOLDERS.product-name`)}
                                className={"w-full !rounded-md"}
                                sectionClassName="mb-2 col-span-12 xl:col-span-6"
                                props={register("title")}
                                error={errors.title?.message}
                                loading={isProductLoading}>
                                {t(`LABELS.product-name`)}
                            </FormInput>
                            <FormInput 
                                type='text'
                                required={true}
                                name='sku'
                                autoComplete="product-sku" 
                                placeholder={t(`LABELS.product-sku`)}
                                className={"w-full !rounded-md"}
                                sectionClassName="mb-2 col-span-12 xl:col-span-6"
                                props={register("sku")}
                                error={errors.sku?.message}
                                loading={isProductLoading}>
                                {t(`LABELS.product-sku`)}
                            </FormInput>
                            <FormTextArea
                                name="content"
                                placeholder={t(`PLACEHOLDERS.product-description`)}
                                props={register("content")}
                                error={errors.content?.message}
                                sectionClassName="col-span-12 xl:col-span-12 mb-2"
                                loading={isProductLoading}>
                                {t(`LABELS.product-description`)}
                            </FormTextArea>
                            <FormTextArea
                                name="fabricDetails"
                                placeholder={t(`LABELS.fabric-details`)}
                                props={register("fabricDetails")}
                                error={errors.fabricDetails?.message}
                                sectionClassName="col-span-12 xl:col-span-12 mb-2"
                                loading={isProductLoading}>
                                {t(`LABELS.fabric-details`)}
                            </FormTextArea>
                            <FormTextArea
                                name="careInstructions"
                                placeholder={t(`LABELS.care-instructions`)}
                                props={register("careInstructions")}
                                error={errors.careInstructions?.message}
                                sectionClassName="col-span-12 xl:col-span-12 mb-2"
                                loading={isProductLoading}>
                                {t(`LABELS.care-instructions`)}
                            </FormTextArea>
                            <AttributesSection
                                control={control}
                                errors={errors}
                                isProductLoading={isProductLoading}
                                defaultValues={defaultValues}
                            />
                        </div>
                    </div>
                    <div className="col-span-12 xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6">
                        <div className="grid grid-cols-12 gap-4">
                            <FormInput 
                                type='number'
                                required={true}
                                name='inventory'
                                autoComplete="product-sku" 
                                placeholder={t(`LABELS.inventory`)}
                                className={"w-full !rounded-md"}
                                sectionClassName="mb-2 col-span-12 xl:col-span-6"
                                props={register("inventory",{valueAsNumber:true})}
                                error={errors.inventory?.message}
                                loading={isProductLoading}>
                                {t(`LABELS.inventory`)}
                            </FormInput>
                            <FormInput 
                                type='number'
                                name='price'
                                autoComplete="product-price" 
                                placeholder={t(`LABELS.price`)}
                                className={"w-full !rounded-md"}
                                sectionClassName="mb-2 col-span-12 xl:col-span-6"
                                props={register("price",{valueAsNumber:true})}
                                error={errors.price?.message}
                                loading={isProductLoading}>
                                {t(`LABELS.price`)}
                            </FormInput>
                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => (
                                    <FileUpload
                                        sectionClassName="col-span-12 xl:col-span-12 product-documents-container"
                                        field={field}
                                        labelIdle={t(`PLACEHOLDERS.product-images`)}>
                                        {t(`LABELS.product-images`)}
                                    </FileUpload>
                                )}
                            />
                            <Controller
                                control={control}
                                name='publishDate'
                                render={({ field }) => (
                                    <FormDate
                                        disabled={isEdit}
                                        loading={isProductLoading}
                                        name='publishDate'
                                        field={field}
                                        sectionClassName='col-span-12 xl:col-span-4'>
                                        {t(`LABELS.publish-date`)}
                                    </FormDate>
                                )}
                            />
                            <Controller
                                name="publishStatus"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="publishStatus"
                                        options={publishStatusOptions}
                                        required={true}
                                        isSearchable={true}
                                        sectionClassName="col-span-12 xl:col-span-4"
                                        field={field}
                                        error={errors.publishStatus?.message}
                                        loading={isProductLoading}>
                                            {t(`LABELS.publish-status`)}
                                    </FormSelect>
                                )}
                            />
                            <Controller
                                name="availabilityStatus"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="availabilityStatus"
                                        options={availabilityStatusOptions}
                                        required={true}
                                        isSearchable={true}
                                        sectionClassName="col-span-12 xl:col-span-4"
                                        field={field}
                                        error={errors.availabilityStatus?.message}
                                        loading={isProductLoading}>
                                            {t(`LABELS.availability-status`)}
                                    </FormSelect>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="justify-end px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex">
                <FormButton 
                    intent="info" 
                    size="md" 
                    type="button"
                    className="px-5 py-3 mt-2"
                    onClick={handleSubmit(onCreate)}>
                   {t(`BUTTONS.add-product`)}<i className="bi bi-plus-lg ms-2"></i>
                </FormButton>
                <FormButton 
                    intent="success" 
                    size="md" 
                    type="submit"
                    className="px-5 py-3 mt-2"
                    onClick={handleSubmit(onUpdate)}>
                   {t(`BUTTONS.update-product`)}<i className="bi bi-download ms-2"></i>
                </FormButton>
            </div>
        </form>
    )
}

export default ProductForm