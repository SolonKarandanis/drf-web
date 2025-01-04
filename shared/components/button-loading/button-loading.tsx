"use client";

import { useTranslations } from 'next-intl';

const ButtonLoading = () => {
    const t = useTranslations();
    return (
        <span data-testid="Button.Indicator" 
            className='flex flex-row items-center justify-center gap-2'>
            <div>
                {t("GLOBAL.BUTTONS.loading")}
            </div>
            <span data-testid="Button.Spinner"  className='loading'>
                <i className="ri-refresh-line text-[1rem] animate-spin"></i>
            </span>
        </span>
    )
}

export default ButtonLoading