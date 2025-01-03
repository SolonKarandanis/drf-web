import { 
    InputHTMLAttributes,  
    RefCallback,
    SelectHTMLAttributes,
    TableHTMLAttributes,
} from "react";
import { Props } from "react-select";
import { Column } from "react-table";

export interface RegisterProps {
    onChange: (event:any) => unknown;
    onBlur: (event:any) => unknown;
    ref: RefCallback<HTMLInputElement |HTMLSelectElement >;
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
}


export interface Options{
    label:string,
    value:string|number,
}

export interface SelectProps extends Props{
    name:string,
    options:Options[],
    required?:boolean,
    className?:string,
    sectionClassName?:string,
    inputProps?:RegisterProps,
    error?:string,
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement>{
    columns:readonly Column<object>[];
    data:readonly object[];
}