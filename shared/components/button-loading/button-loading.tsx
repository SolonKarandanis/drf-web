import { useTranslations } from 'next-intl';
import React from 'react'

const ButtonLoading = () => {
    const t = useTranslations();
    return (
        <span data-testid="Button.Indicator" 
            className='me-2' style={{display: 'block'}}>
            {t("GLOBAL.BUTTONS.loading")}
            <span data-testid="Button.Spinner"  className='loading'>
                <i className="ri-refresh-line text-[1rem] animate-spin"></i>
            </span>
        </span>
    )
}

export default ButtonLoading