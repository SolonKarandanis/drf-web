"use client"

import {ButtonHTMLAttributes, FC, ReactElement,PropsWithChildren} from 'react';
import {cva,VariantProps} from 'class-variance-authority';
import { twMerge } from "tailwind-merge";
import { useFormStatus } from 'react-dom';
import ButtonLoading from '../button-loading/button-loading';

const buttonVariants = cva('ti-btn ti-btn-wave',{
  variants:{
    intent:{
      primary:'ti-btn-primary ti-btn-primary-full',
      secondary:'ti-btn-secondary ti-btn-secondary-full',
      success:'ti-btn-success ti-btn-success-full',
      info:'ti-btn-info ti-btn-info-full',
      warning:'ti-btn-warning ti-btn-warning-full',
      danger:'ti-btn-warning ti-btn-danger-full',
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


const CButton:FC<PropsWithChildren<ButtonProps>> = ({ 
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

    const { pending, data, method, action } = useFormStatus();
    const isSubmitting = pending || isLoading;
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
              { isSubmitting && <ButtonLoading />}
        </button>
    );
}

export default CButton