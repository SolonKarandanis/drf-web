"use client"

import { FilePond, registerPlugin } from 'react-filepond';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import("react-select"), { ssr: false });
 // @ts-ignore
import DatePicker from 'react-datepicker';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FC, useState } from 'react';

import { FilePondFile } from 'filepond';
import { ActualFileObject } from 'filepond';
import FormButton from '@/shared/components/button/form-button';
import { useTranslations } from 'next-intl';
import { useGetProductMisc } from '../hooks/useGetProductMisc';
import { Options } from '@/shared/components/props';
import FormSelect from '@/shared/components/form-select/form-select';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getSaveProductSchema, SaveProductSchema } from '@/schemas/product.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/shared/components/form-input/form-input';
import FormTextArea from '@/shared/components/form-textarea/form-textarea';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

interface Props{
    uuid?:string;
}

const ProductForm:FC<Props> = ({uuid}) => {
    const t = useTranslations("PRODUCTS.CREATE");
    const formT = useTranslations("PRODUCTS.VALIDATION");
    const {
        categoriesOptions,
        categoriesLoading,
        categoriesIsError,
        brandsOptions,
        brandsLoading,
        brandsIsError,
        sizesOptions,
        sizesLoading,
        sizesIsError,
        coloursOptions,
        coloursLoading,
        coloursIsError,
        gendersOptions,
        gendersLoading,
        gendersIsError,
    } = useGetProductMisc();

    const publishStatusOptions: Options[] = [
        {value:'product.status.published',label:t(`LABELS.published`)},
        {value:'product.status.scheduled',label:t(`LABELS.scheduled`)}
    ];

    const availabilityStatusOptions: Options[] = [
        {value:'product.availability.in.stock',label:t(`LABELS.in-stock`)},
        {value:'product.availability.out.of.stock',label:t(`LABELS.out-of-stock`)}
    ];

    const [files, setFiles] = useState<ActualFileObject[]>([]);
    const [files1, setFiles1] = useState<ActualFileObject[]>([]);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const handleDateChange = (date:Date) => {
        // Ensure date is defined before setting it
        if (date) {
            setStartDate(date);
        }
    };

    let defaultValues={
        title:undefined,
        sku:undefined,
        brand:undefined,
        gender:undefined,
        category:undefined,
        publishStatus:undefined,
        availabilityStatus:undefined,
        inventory:undefined,
        price:undefined,
        content:undefined,
        fabricDetails:undefined,
        careInstructions:undefined,
        colors:[],
        sizes:[] 
    }

    if(uuid){

    }

    const {
        register,
        control,
        handleSubmit,
        formState
    } = useForm<SaveProductSchema>({
        resolver: zodResolver(getSaveProductSchema(formT)),
        defaultValues
    })

    const {errors} = formState

    const onSubmit: SubmitHandler<SaveProductSchema> = async (data) =>{
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
                                error={errors.title?.message}>
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
                                error={errors.sku?.message}>
                                {t(`LABELS.product-sku`)}
                            </FormInput>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="category"
                                        options={categoriesOptions}
                                        required={true}
                                        isSearchable={true}
                                        sectionClassName="col-span-12 xl:col-span-6 mb-2"
                                        field={field}
                                        error={errors.category?.message}>
                                            {t(`LABELS.category`)}
                                    </FormSelect>
                                )}
                            />
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="gender"
                                        options={gendersOptions}
                                        required={true}
                                        isSearchable={true}
                                        sectionClassName="col-span-12 xl:col-span-6 mb-2"
                                        field={field}
                                        error={errors.gender?.message}>
                                            {t(`LABELS.gender`)}
                                    </FormSelect>
                                )}
                            />
                            <Controller
                                name="sizes"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="sizes"
                                        isMulti={true}
                                        isSearchable={true}
                                        options={sizesOptions}
                                        sectionClassName="col-span-12 xl:col-span-6 mb-2"
                                        field={field}
                                        error={errors.sizes?.message}>
                                            {t(`LABELS.size`)}
                                    </FormSelect>
                                )}
                            />
                            <Controller
                                name="brand"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="brand"
                                        options={brandsOptions}
                                        required={true}
                                        isSearchable={true}
                                        sectionClassName="col-span-12 xl:col-span-6 mb-2"
                                        field={field}
                                        error={errors.brand?.message}>
                                            {t(`LABELS.brand`)}
                                    </FormSelect>
                                )}
                            />
                            <Controller
                                name="colors"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="colors"
                                        options={coloursOptions}
                                        isSearchable={true}
                                        isMulti={true}
                                        sectionClassName="col-span-12 xl:col-span-6 mb-2"
                                        field={field}
                                        error={errors.colors?.message}>
                                            {t(`LABELS.color`)}
                                    </FormSelect>
                                )}
                            />
                            <FormTextArea
                                name="content"
                                placeholder={t(`PLACEHOLDERS.product-description`)}
                                props={register("content")}
                                error={errors.content?.message}
                                sectionClassName="col-span-12 xl:col-span-12 mb-2">
                                {t(`LABELS.product-description`)}
                            </FormTextArea>
                            <FormTextArea
                                name="fabricDetails"
                                placeholder={t(`LABELS.fabric-details`)}
                                props={register("fabricDetails")}
                                error={errors.fabricDetails?.message}
                                sectionClassName="col-span-12 xl:col-span-12 mb-2">
                                {t(`LABELS.fabric-details`)}
                            </FormTextArea>
                            <FormTextArea
                                name="careInstructions"
                                placeholder={t(`LABELS.care-instructions`)}
                                props={register("careInstructions")}
                                error={errors.careInstructions?.message}
                                sectionClassName="col-span-12 xl:col-span-12 mb-2">
                                {t(`LABELS.care-instructions`)}
                            </FormTextArea>
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
                                props={register("inventory")}
                                error={errors.inventory?.message}>
                                {t(`LABELS.inventory`)}
                            </FormInput>
                            <FormInput 
                                type='number'
                                name='price'
                                autoComplete="product-price" 
                                placeholder={t(`LABELS.price`)}
                                className={"w-full !rounded-md"}
                                sectionClassName="mb-2 col-span-12 xl:col-span-6"
                                props={register("price")}
                                error={errors.price?.message}>
                                {t(`LABELS.price`)}
                            </FormInput>
                            <div className="col-span-12 xl:col-span-12 product-documents-container">
                                <p className="font-semibold mb-2 text-[0.875rem]">Product Images :</p>
                            <FilePond 
                                className="basic-filepond" 
                                accepted-file-types={["application/pdf", "image/png", "image/jpeg", "image/gif"]}
                                server="/api" 
                                allowReorder={true} 
                                files={files} 
                                onupdatefiles={fileItems => {
                                    setFiles(fileItems.map(fileItem => fileItem.file));
                                }}
                                allowMultiple={false} 
                                allowImagePreview={true} 
                                maxFiles={10} 
                                name="filepond"
                                labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>' />
                            </div>
                            <label className="form-label opacity-[0.5] mt-4 xl:col-span-12 col-span-12">Minimum 0f 6 images are need to be uploaded,make sure the image size match the proper background size and all images should be uniformly maintained with width and height to the image container,image size should not exceed 2MB,once uploaded to change the image you need to wait minimum of 24hrs. </label>
                            <div className="col-span-12 xl:col-span-12 product-documents-container">
                                <p className="font-semibold mb-2 text-[0.875rem]">Warrenty Documents :</p>
                                <FilePond className="w-full product-documents"
                                    files={files1}
                                    onupdatefiles={fileItems => {
                                        setFiles1(fileItems.map(fileItem => fileItem.file));
                                    }}
                                    allowMultiple={true}
                                    // maxFiles={6}
                                    server="/api"
                                    name="files"
                                    labelIdle='Drag & Drop your file here or click '
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label htmlFor="publish-date" className="form-label">Publish Date</label>
                                <DatePicker selected={startDate} onChange={handleDateChange} />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label htmlFor="publish-time" className="form-label">Publish Time</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                            <Controller
                                name="publishStatus"
                                control={control}
                                render={({ field }) => (
                                    <FormSelect 
                                        name="publishStatus"
                                        options={publishStatusOptions}
                                        required={true}
                                        isSearchable={true}
                                        sectionClassName="col-span-12 xl:col-span-6"
                                        field={field}
                                        error={errors.publishStatus?.message}>
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
                                        sectionClassName="col-span-12 xl:col-span-6"
                                        field={field}
                                        error={errors.availabilityStatus?.message}>
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
                    type="submit"
                    className="px-5 py-3 mt-2"
                    onClick={handleSubmit(onSubmit)}>
                   {t(`BUTTONS.add-product`)}<i className="bi bi-plus-lg ms-2"></i>
                </FormButton>
                <FormButton 
                    intent="success" 
                    size="md" 
                    type="submit"
                    className="px-5 py-3 mt-2"
                    onClick={handleSubmit(onSubmit)}>
                   {t(`BUTTONS.update-product`)}<i className="bi bi-download ms-2"></i>
                </FormButton>
            </div>
        </form>
    )
}

export default ProductForm