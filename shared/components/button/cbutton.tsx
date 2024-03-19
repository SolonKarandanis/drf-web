import {FC} from 'react'
import { ButtonProps } from '../props'

const CButton:FC<ButtonProps> = ({ 
    className='',
    btnType,onClick, 
    isLoading=false,
    icon,
    iconPosition='left',
    children,
    ...rest 
}) => {
    const btnTypeClass = btnType ?  `btn-${btnType}`: '';
    const iconHtml = icon ? (<span data-testid="Button.Icon" className="mr-3">{icon}</span>) : null;
    return (
        <button 
          className={`${btnTypeClass} ${className}`} 
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