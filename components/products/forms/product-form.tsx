"use client"

import { FilePond, registerPlugin } from 'react-filepond';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import("react-select"), { ssr: false });
 // @ts-ignore
import DatePicker from 'react-datepicker';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useState } from 'react';

import { FilePondFile } from 'filepond';
import { ActualFileObject } from 'filepond';
import FormButton from '@/shared/components/button/form-button';
import { useTranslations } from 'next-intl';
import { useGetProductMisc } from '../hooks/useGetProductMisc';
import { Options } from '@/shared/components/props';
import FormSelect from '@/shared/components/form-select/form-select';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const ProductForm = () => {
    const t = useTranslations();
    const formT = useTranslations("USERS.VALIDATION");
    const {
        categories,
        categoriesLoading,
        categoriesIsError,
        brands,
        brandsLoading,
        brandsIsError,
        sizes,
        sizesLoading,
        sizesIsError,
        colours,
        coloursLoading,
        coloursIsError,
        genders,
        gendersLoading,
        gendersIsError
    } = useGetProductMisc();

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


    const [files, setFiles] = useState<ActualFileObject[]>([]);
    const [files1, setFiles1] = useState<ActualFileObject[]>([]);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const handleDateChange = (date:Date) => {
        // Ensure date is defined before setting it
        if (date) {
            setStartDate(date);
        }
    };
    return (
        <div className="p-6">
            <div className="grid grid-cols-12 md:gap-x-[3rem] gap-0">
                <div className="col-span-12 xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 xl:col-span-12">
                            <label htmlFor="product-name-add" className="form-label">
                                Product Name
                            </label>
                            <input type="text" 
                                className="form-control w-full !rounded-md" 
                                id="product-name-add" 
                                placeholder="Name" />
                            <label htmlFor="product-name-add" 
                                className="form-label mt-1 text-[0.75rem] opacity-[0.5] 
                                    !text-[#8c9097] dark:text-white/50 !mb-0">
                                    *Product Name should not exceed 30 characters
                            </label>
                            <div className="col-span-12 xl:col-span-6">
                                <label htmlFor="product-category-add" className="form-label">Category</label>
                                <Select 
                                    id="product-category-add"  
                                    name="product-category-add" 
                                    options={categoriesOptions} 
                                    className="w-full !rounded-md" 
                                    isSearchable
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Category"
                                    
                                />
                                {/* <FormSelect 
                                    name="category"
                                    options={categoriesOptions}
                                    sectionClassName="mb-2"
                                    autoComplete='role-name'
                                   >
                                    Category
                                </FormSelect> */}
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label 
                                    htmlFor="product-gender-add" 
                                    className="form-label">
                                    Gender
                                </label>
                                 <Select 
                                    id="product-gender-add"
                                    name="product-gender-add" 
                                    options={gendersOptions} 
                                    className="w-full !rounded-md" 
                                    isSearchable
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Select"
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label 
                                    htmlFor="product-size-add" 
                                    className="form-label">
                                    Size
                                </label>
                                <Select 
                                    id="product-size-add" 
                                    name="product-size-add" 
                                    options={sizesOptions} 
                                    className="w-full !rounded-md" 
                                    isSearchable
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Select"
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label 
                                    htmlFor="product-brand-add" 
                                    className="form-label">
                                    Brand
                                </label>
                                <Select 
                                    id="product-brand-add"
                                    name="product-brand-add" 
                                    options={brandsOptions} 
                                    className="w-full !rounded-md" 
                                    isSearchable
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Select" 
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-6 color-selection">
                                <label 
                                    htmlFor="product-color-add" 
                                    className="form-label">
                                    Colors
                                </label>
                                <Select 
                                    id="product-color-add"
                                    isMulti name="colors" 
                                    options={coloursOptions} 
                                    className="w-full !rounded-md" 
                                    isSearchable 
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Select"
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label 
                                    htmlFor="product-cost-add" 
                                    className="form-label">
                                    Enter Cost
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control w-full !rounded-md" 
                                    id="product-cost-add" 
                                    placeholder="Cost" />
                                <label 
                                    htmlFor="product-cost-add" 
                                    className="form-label mt-1 text-[0.75rem] opacity-[0.5] 
                                    !text-[#8c9097] dark:text-white/50 mb-0">
                                    *Mention final price of the product
                                </label>
                            </div>
                            <div className="col-span-12 xl:col-span-12">
                                <label 
                                    htmlFor="product-description-add" 
                                    className="form-label">
                                    Product Description
                                </label>
                                <textarea 
                                    className="form-control w-full !rounded-md" 
                                    id="product-description-add" rows={2}></textarea>
                                <label 
                                    htmlFor="product-description-add" 
                                    className="form-label mt-1 text-[0.75rem] opacity-[0.5] 
                                    !text-[#8c9097] dark:text-white/50 mb-0">
                                    *Description should not exceed 500 letters
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 xl:col-span-4">
                                <label 
                                    htmlFor="product-actual-price" 
                                    className="form-label">
                                    Actual Price
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control w-full !rounded-md" 
                                    id="product-actual-price" 
                                    placeholder="Actual Price" />
                            </div>
                            <div className="col-span-12 xl:col-span-4">
                                <label 
                                    htmlFor="product-dealer-price" 
                                    className="form-label">
                                    Dealer Price
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control w-full !rounded-md" 
                                    id="product-dealer-price" 
                                    placeholder="Dealer Price" />
                            </div>
                            <div className="col-span-12 xl:col-span-4">
                                <label 
                                    htmlFor="product-discount" 
                                    className="form-label">
                                    Discount
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control w-full !rounded-md" 
                                    id="product-discount" 
                                    placeholder="Discount in %" />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label 
                                    htmlFor="product-type" 
                                    className="form-label">
                                    Product Type
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control w-full !rounded-md" 
                                    id="product-type" 
                                    placeholder="Type" />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label 
                                    htmlFor="product-discount" 
                                    className="form-label">
                                    Item Weight
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control w-full !rounded-md" 
                                    id="product-discount1" 
                                    placeholder="Weight in gms" />
                            </div>
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
                            <div className="col-span-12 xl:col-span-6">
                                <label htmlFor="product-status-add" className="form-label">Published Status</label>
                                {/* <Select 
                                    name="product-status-add" 
                                    options={Addproduct5} 
                                    className="w-full !rounded-md" 
                                    isSearchable
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Select" 
                                    id="product-status-add"
                                /> */}
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label htmlFor="product-tags" className="form-label">Product Tags</label>
                                {/* <Select 
                                    isMulti 
                                    name="product-tags" 
                                    options={Addproduct6} 
                                    defaultValue={[Addproduct6[0], Addproduct6[3]]}
                                    className="w-full !rounded-md" 
                                    isSearchable id="product-tags"
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Select"
                                /> */}
                            </div>
                            <div className="col-span-12 xl:col-span-12">
                                <label htmlFor="product-status-add1" className="form-label">Availability</label>
                                {/* <Select 
                                    name="product-status-add1" 
                                    options={Addproduct7} 
                                    id="product-status-add1"
                                    className="w-full !rounded-md" 
                                    isSearchable
                                    menuPlacement='auto' 
                                    classNamePrefix="Select2" 
                                    placeholder="Select"
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="justify-end px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex">
                <FormButton 
                    intent="info" 
                    size="md" 
                    type="submit"
                    className="px-5 py-3 mt-2">
                    Add Product<i className="bi bi-plus-lg ms-2"></i>
                </FormButton>
                <FormButton 
                    intent="success" 
                    size="md" 
                    type="submit"
                    className="px-5 py-3 mt-2">
                    Save Product<i className="bi bi-download ms-2"></i>
                </FormButton>
            </div>
        </div>
    )
}

export default ProductForm