"use client"

import {ButtonHTMLAttributes, FC, ReactElement,PropsWithChildren} from 'react';
import {cva,VariantProps} from 'class-variance-authority';
import { twMerge } from "tailwind-merge";
import ButtonLoading from '../button-loading/button-loading';

const buttonVariants = cva('focus:outline-none text-white focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2',{
  variants:{
    intent:{
      primary:'ti-btn-primary ti-btn-primary-full',
      secondary:'ti-btn-secondary ti-btn-secondary-full',
      success:'bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800',
      info:'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
      warning:'bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-900',
      danger:'bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900',
      light:'ti-btn-warning ti-btn-light',
      dark:'ti-btn-warning ti-btn-dark',
      violet:'bg-violet-500 text-white',
    },
    size:{
      xs: '',
      sm: 'py-1 px-2 text-sm',
      md: 'py-2 px-4 text-md',
      lg: 'py-3 px-6 text-lg',
      xl: 'py-4 px-8 text-xl'
    },
  },
  defaultVariants:{
    intent:'primary',
    size:'md'
  }
});


type ButtonIntents = VariantProps<typeof buttonVariants>["intent"];
type ButtonSizes = VariantProps<typeof buttonVariants>["size"];
type SVGComponent = React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
type ButtonIconPositions = 'left' | 'right';



export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?:string ,
  intent: ButtonIntents;
  size?: ButtonSizes;
  onClick?:React.MouseEventHandler<HTMLButtonElement>,
  isLoading?:boolean,
  isDisabled?:boolean,
  icon?: ReactElement;
  iconPosition?: ButtonIconPositions
}


const FormButton:FC<PropsWithChildren<ButtonProps>> = ({ 
    className='',
    intent,
    size,
    onClick, 
    isLoading=false,
    isDisabled=false,
    icon,
    iconPosition='left',
    children,
    ...rest 
}) => {
    const iconHtml = icon ? (<span data-testid="Button.Icon" className="mr-3">{icon}</span>) : null;
    return (
        <button 
          className={twMerge(buttonVariants({
            intent,
            size
          }),
          className,
          isDisabled && "ti-btn-disabled")}
          onClick={onClick}
          {...rest}>
              {!isLoading && <span className='me-2'>
                {iconPosition === 'left' && (<>{iconHtml}{children}</>)}
                {iconPosition === 'right' && (<>{children} {iconHtml}</>)}
                </span>
              }
              { isLoading && <ButtonLoading />}
        </button>
    );
}

export default FormButton