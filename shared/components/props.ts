import { 
    InputHTMLAttributes,  
    RefCallback,
    SelectHTMLAttributes 
} from "react";

export interface Props {
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
    props?:Props,
    error?:string,
    children: React.ReactNode
}

export interface Options{
    label:string,
    value:string|number,
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    name:string,
    options:Options[],
    required?:boolean,
    className?:string,
    sectionClassName?:string,
    inputProps?:Props,
    error?:string,
    children: React.ReactNode
}
