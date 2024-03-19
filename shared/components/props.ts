import { 
    ButtonHTMLAttributes, 
    InputHTMLAttributes, 
    ReactElement, 
    ReactNode, 
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
    label:string,
    labelPosition?:'top'|'side'
    required?:boolean,
    className?:string,
    props?:Props,
    error?:string
}

export interface Options{
    label:string,
    value:string|number,
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label:string,
    name:string,
    options:Options[],
    required?:boolean,
    inputProps?:Props,
    error?:string
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?:string ,
    btnType: 'primary' | 'danger' | 'active-light-primary'
    onClick?:React.MouseEventHandler<HTMLButtonElement>,
    isLoading?:boolean,
    icon?: ReactElement;
    iconPosition?: 'left' | 'right'
    children:ReactNode
}