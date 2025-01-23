"use client"

import {FC, forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useState} from 'react'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FileInputProps } from '../props';
import { ACCEPTED_IMAGE_TYPES } from '@/utils/constants';
import FormLabel from '../form-label/form-label';
import FormError from '../form-error/form-error';
import { ActualFileObject, FilePondFile } from 'filepond';
import { useAppSelector } from '@/shared/redux/hooks';
import { ImageModel } from '@/models/image.models';
import { FilePondInitialFile } from 'filepond';


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

interface FileInputHandleApi{
    focus:()=>void;
    shake:()=>void;
    clear:()=>void;
}

// :FC<PropsWithChildren<FileInputProps>> =

const FileUpload = forwardRef<FileInputHandleApi,PropsWithChildren<FileInputProps>>(({
    labelIdle,
    field,
    required=false,
    loading=false,
    disabled=false,
    allowMultiple=false,
    maxFiles=1,
    error,
    sectionClassName,
    setValue,
    children
},ref) => {
    const configState = useAppSelector((state)=>state.config);
    const host = configState.djangoHost
    const [filess] = useState([
    {
        source: `${host}/media/images/gbgoods_470126_sub7_3x4.avif`,
        options: { type: "local" }
    }
    ]);

    const initializeFiles = (images:ImageModel[]):FilePondInitialFile[]=>{
        if(images && images.length ==0){
            return [];
        }
        return images.map(image=> {
            return {
                source: `${host}${image.image}`,
                options: { type: "local" }
            } as FilePondInitialFile;
        });
    }

    const [files, setFiles] = useState<Array<FilePondInitialFile | ActualFileObject | Blob | string>>(initializeFiles(field.value));
    

    useImperativeHandle(ref, ()=>({
        focus() {
            // inputRef.current.focus();
        },
        shake() {
            
        },
        clear(){
            setFiles([]);
        }
    }),[]);
    
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

    const handleClearAll = () => setFiles([]);


    const onUpdateFiles =  (fileItems: FilePondFile[]) =>{
        setFiles(fileItems.map(fileItem => fileItem.file));
        convertToFiles(fileItems)
            .then((files)=>{
                setValue(field.name,files);
            })
    }

    const convertToFiles =  async (filePondFiles:FilePondFile[]): Promise<File[]> =>{
        const files : File[]=[];
        for(const filePondFile of filePondFiles){
            const bytes =  await filePondFile.file.arrayBuffer();
            const name =filePondFile.file.name;
            const type =filePondFile.file.type;
            const blob = new Blob([bytes]);
            files.push(new File([blob],name,{type}));
        }
        return files;
    }
    
    const errorHtml = error ? (<FormError error={error} />) : null;

    const filePondHtml =(
        <FilePond 
            className="basic-filepond" 
            accepted-file-types={ACCEPTED_IMAGE_TYPES}
            allowReorder={true}
            files={files} 
            onupdatefiles={(fileItems)=>onUpdateFiles(fileItems)}
            allowMultiple={allowMultiple} 
            allowImagePreview={true} 
            maxFiles={maxFiles} 
            labelIdle={labelIdle}
            disabled={disabled}
            required={required}
            instantUpload={false}
            server={{
                load: (source, load, error, progress, abort, headers) => {
                    console.log(source);
                    var myRequest = new Request(source);
                    fetch(myRequest).then(function(response) {
                        response.blob().then(function(myBlob) {
                        load(myBlob);
                        });
                    });
                }
              }}/>
    );

    return (
        <section className={sectionClassName}>
            {labelHtml}
            {filePondHtml}
            {errorHtml}
        </section>
    )
})

export default FileUpload