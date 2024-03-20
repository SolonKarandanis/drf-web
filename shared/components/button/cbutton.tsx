import {ButtonHTMLAttributes, FC, ReactElement, ReactNode} from 'react'
import {cva,VariantProps} from 'class-variance-authority'

const buttonVariants = cva('ti-btn ti-btn-wave',{
  variants:{
    intent:{
      primary:'ti-btn-primary',
      secondary:'ti-btn-secondary',
      info:'ti-btn-info',
      warning:'ti-btn-warning',
      success:'ti-btn-success'
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

const btnOptions = {
  primary: "bg-theme-500 hover:bg-theme-700 text-theme-50 font-bold rounded",
  secondary: "bg-theme-50 hover:bg-theme-200 text-theme-700 font-bold rounded",
  tertiary: "bg-theme-800 hover:bg-theme-700 text-theme-100 font-bold rounded",
};

const btnSizes = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-3 px-6 text-lg",
};

type ButtonIntents = VariantProps<typeof buttonVariants>["intent"];


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?:string ,
  intent: ButtonIntents;
  size?: keyof typeof btnSizes;
  onClick?:React.MouseEventHandler<HTMLButtonElement>,
  isLoading?:boolean,
  icon?: ReactElement;
  iconPosition?: 'left' | 'right'
  children:ReactNode
}


const CButton:FC<ButtonProps> = ({ 
    className='',
    intent,
    size,
    onClick, 
    isLoading=false,
    icon,
    iconPosition='left',
    children,
    ...rest 
}) => {
    const iconHtml = icon ? (<span data-testid="Button.Icon" className="mr-3">{icon}</span>) : null;
    return (
        <button 
          className={buttonVariants({
            className,
            intent
          })}
          onClick={onClick}
          {...rest}>
              {!isLoading && <span className='indicator-label'>
                {iconPosition === 'left' && (<>{iconHtml}{children}</>)}
                {iconPosition === 'right' && (<>{children} {iconHtml}</>)}
                </span>
              }
              { isLoading && (
                <span data-testid="Button.Indicator" 
                  className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span data-testid="Button.Spinner" 
                    className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
        </button>
    );
}

export default CButton