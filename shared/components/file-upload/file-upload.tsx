"use client"

import {FC, PropsWithChildren} from 'react'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FileInputProps } from '../props';
import { ACCEPTED_IMAGE_TYPES } from '@/utils/constants';
import FormLabel from '../form-label/form-label';
import FormError from '../form-error/form-error';


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const FileUpload:FC<PropsWithChildren<FileInputProps>> = ({
    labelIdle,
    field,
    required=false,
    loading=false,
    disabled=false,
    allowMultiple=false,
    maxFiles=1,
    error,
    sectionClassName,
    children
}) => {
    const hasError = error? true:false;
    const labelHtml = children ? (
        <FormLabel 
            name="filepond"
            required={required}
            hasError={hasError}>
            {children}
        </FormLabel>
    ):null;

    if(loading){
        return (
          <section className={sectionClassName}>
            {labelHtml}
            <div role="status" className="w-full animate-pulse dark:border-gray-700">
              <div className="h-10 bg-gray-400  dark:bg-gray-700 mb-2.5"></div>
            </div>
          </section>
        )
    }
    
    const errorHtml = error ? (<FormError error={error} />) : null;

    const filePondHtml =(
        <FilePond 
            className="basic-filepond" 
            accepted-file-types={ACCEPTED_IMAGE_TYPES}
            allowReorder={true} 
            files={field.value}
            onupdatefiles={field.onChange}
            allowMultiple={allowMultiple} 
            allowImagePreview={true} 
            maxFiles={maxFiles} 
            labelIdle={labelIdle}
            disabled={disabled}
            required={required}/>
    );

    return (
        <section className={sectionClassName}>
            {labelHtml}
            {filePondHtml}
            {errorHtml}
        </section>
    )
}

export default FileUpload