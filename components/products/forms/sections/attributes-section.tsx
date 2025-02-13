"use client"

import FormSelect from '@/shared/components/form-select/form-select'
import { useTranslations } from 'next-intl'
import {FC} from 'react'
import { Controller } from 'react-hook-form'
import { AttributesSectionProps } from './props'
import { useGetProductMisc } from '../../hooks/useGetProductMisc'

const AttributesSection:FC<AttributesSectionProps> = ({
    control,
    errors,
    defaultValues,
    isProductLoading,
}) => {
    const t = useTranslations("PRODUCTS.CREATE");
    const {
        categoriesOptions,
        brandsOptions,
        sizesOptions,
        coloursOptions,
        gendersOptions,
    } = useGetProductMisc();

    return (
        <div className="grid grid-cols-12 gap-4">
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <FormSelect 
                        name="category"
                        options={categoriesOptions}
                        required={true}
                        isSearchable={true}
                        sectionClassName="col-span-12 xl:col-span-4 mb-2"
                        field={field}
                        error={errors.category?.message}
                        loading={isProductLoading}>
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
                        sectionClassName="col-span-12 xl:col-span-4 mb-2"
                        field={field}
                        error={errors.gender?.message}
                        loading={isProductLoading}>
                            {t(`LABELS.gender`)}
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
                        sectionClassName="col-span-12 xl:col-span-4 mb-2"
                        field={field}
                        error={errors.brand?.message}
                        loading={isProductLoading}>
                            {t(`LABELS.brand`)}
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
                        required={true}
                        isSearchable={true}
                        options={sizesOptions}
                        sectionClassName="col-span-12 xl:col-span-6 mb-2"
                        field={field}
                        defaultValues={defaultValues.sizes}
                        error={errors.sizes?.message}
                        loading={isProductLoading}>
                            {t(`LABELS.size`)}
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
                        defaultValues={defaultValues.colors}
                        error={errors.colors?.message}
                        loading={isProductLoading}>
                            {t(`LABELS.color`)}
                    </FormSelect>
                )}
            />
        </div>
    )
}

export default AttributesSection