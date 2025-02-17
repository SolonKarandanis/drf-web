"use client"

import FormButton from '@/shared/components/button/form-button';
import { useTranslations } from 'next-intl';
import React, { BaseSyntheticEvent, FC } from 'react'

interface Props{
  isLoading:boolean;
  handleAddToCart:(e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const ButtonGroup:FC<Props> = ({isLoading,handleAddToCart}) => {
  const t = useTranslations("CART.BUTTONS");
  return (
    <div className="grid gap-2">
        <FormButton 
            intent="info" 
            size="md" 
            type="button"
            className="ti-btn bg-success !font-medium text-white"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleAddToCart}>
          {t(`add-to-cart`)}
        </FormButton>
        <FormButton 
            intent="info" 
            size="md" 
            type="button"
            className="ti-btn bg-slate-800 !font-medium"
            isLoading={isLoading}
            disabled={isLoading}>
          {t(`add-to-wishlist`)}
        </FormButton>
    </div>
  )
}

export default ButtonGroup