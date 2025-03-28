"use client"

import {FC, forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react'
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
import { FilePondInitialFile } from 'filepond';
import { ImageModel } from '@/models/image.models';


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

interface FileInputHandleApi{
    focus:()=>void;
    shake:()=>void;
    clear:()=>void;
}

type FileUploadFileType = Array<FilePondInitialFile | ActualFileObject | Blob | string>;


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
    const host = configState.djangoHost;
    const fileMap = new Map();
    const initializeFiles = (images:File[]| ImageModel[]):FilePondInitialFile[]=>{
        if(images && images.length ==0){
            fileMap.clear();
            return [];
        }
        const result:FilePondInitialFile[] =[]
        for(const image of images){
            if(image instanceof File){
                
                const filePondInitialFile = {
                    source: `${host}${image.name}`,
                    file:{
                        name: image.name
                    },
                    options: { type: "input" }
                }as FilePondInitialFile;
                result.push(filePondInitialFile);
            }
            else{
                const filePondInitialFile = {
                    source: `${host}${image.image}`,
                    file:{
                        name: image.title
                    },
                    options: { type: "input" }
                }as FilePondInitialFile;
                result.push(filePondInitialFile);
            }
        }
        const removedDuplicatesArray = toArray(toMap(result));
        return removedDuplicatesArray;
    }

    const toMap=(results:FilePondInitialFile[]):Map<string, FilePondInitialFile>=>{
        const map = new Map<string,FilePondInitialFile>();
        for (const result of results){
            map.set(result.source,result);
        }
        return map
    }

    const toArray = (map:Map<string, FilePondInitialFile>):FilePondInitialFile[] =>{
        return Array.from(map, ([name, value]) => (value));
    }

    const [files, setFiles] = useState<FileUploadFileType>(initializeFiles(field.value));
    

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


    const handleUpdateFiles =  (fileItems: FilePondFile[]) =>{
        setFiles(fileItems.map(fileItem => fileItem.file));
        convertToFiles(fileItems)
            .then((files)=>{
                setValue(field.name,files);
            })
    }


    const convertToFiles =  async (filePondFiles:FilePondFile[]): Promise<File[]> =>{
        const files : File[]=[];
        for(const filePondFile of filePondFiles){
            const file = filePondFile.file;
            const name =filePondFile.filename;
            const type =filePondFile.fileType;
            if(file instanceof File){
                const bytes =  await filePondFile.file.arrayBuffer();
                const blob = new Blob([bytes]);
                files.push(new File([blob],name,{type}));
            }
            if(file instanceof Blob){
                files.push(new File([file],name,{type}));
            }
            
        }
        return files;
    }
    
    const errorHtml = error ? (<FormError error={error} />) : null;

    const filePondHtml =(
        <FilePond 
            className="basic-filepond" 
            accepted-file-types={ACCEPTED_IMAGE_TYPES}
            allowReorder={true}
            onreorderfiles={handleUpdateFiles}
            files={files} 
            onupdatefiles={handleUpdateFiles}
            allowMultiple={allowMultiple} 
            allowImagePreview={true} 
            maxFiles={maxFiles} 
            labelIdle={labelIdle}
            disabled={disabled}
            required={required}
            instantUpload={false}
            server={{
                fetch:(url, load, error, progress, abort, headers)=>{
                    const myRequest = new Request(url);
                    fetch(myRequest,)
                        .then((response)=> {
                            return response.blob();
                        })
                        .then(blob=> {
                            load(blob);
                        })
                        .catch(error=>{
                            console.log(error);
                        })
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