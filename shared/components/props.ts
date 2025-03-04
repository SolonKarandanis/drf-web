import { 
    InputHTMLAttributes,  
    RefCallback,
    TableHTMLAttributes,
    TextareaHTMLAttributes,
} from "react";
import { ControllerRenderProps, UseFormSetValue } from "react-hook-form";
import { Props } from "react-select";
import { Column } from "react-table";

export interface RegisterProps {
    onChange: (event:any) => unknown;
    onBlur: (event:any) => unknown;
    ref: RefCallback<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string,
    type:string,
    required?:boolean,
    className?:string,
    sectionClassName?:string,
    props?:RegisterProps,
    error?:string,
    loading?:boolean,
}


export interface Options{
    label:string,
    value:string|number,
}

export interface SelectProps extends Props{
    options:Options[],
    required?:boolean,
    sectionClassName?:string,
    error?:string,
    field:ControllerRenderProps<any>,
    loading?:boolean,
    defaultValues?:number[];
    onChangeInput?:(e: any)=>void;
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement>{
    columns:readonly Column<object>[];
    data:readonly object[];
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name:string,
    required?:boolean,
    className?:string,
    sectionClassName?:string,
    props?:RegisterProps,
    error?:string,
    loading?:boolean,
}

export interface DateInputProps{
    name:string,
    required?:boolean,
    sectionClassName?:string,
    error?:string,
    field:ControllerRenderProps<any>,
    loading?:boolean,
    minDate?:Date
    disabled?:boolean,
}

export interface FileInputProps{
    labelIdle:string,
    required?:boolean,
    sectionClassName?:string,
    error?:string,
    field:ControllerRenderProps<any>,
    loading?:boolean,
    disabled?:boolean,
    maxFiles?:number;
    allowMultiple?:boolean;
    setValue:UseFormSetValue<any>;
}