"use client"

import ButtonLoading from '@/shared/components/button-loading/button-loading';
import { Button } from '@/shared/shadcn/components/ui/button';
import { useTranslations } from 'next-intl';
import {FC, MouseEventHandler} from 'react'

interface Props{
    onCancelClick:MouseEventHandler<HTMLButtonElement>;
    fomrId?:string;
    isLoading:boolean;
}

const UserEditGroupButtons:FC<Props> = ({
    onCancelClick,
    fomrId,
    isLoading =false
}) => {
    const t = useTranslations();
    return (
        <div className="w-44"  data-testid="buttons">
            <div className='flex justify-between'>
                <Button 
                    type="reset" 
                    variant="destructive"
                    className="w-20"
                    onClick={onCancelClick}>
                    {t("GLOBAL.BUTTONS.cancel")}
                </Button>
                {fomrId ?(
                    <Button 
                        form={fomrId}
                        type="submit" 
                        variant="success"
                        className="w-20"
                        disabled={isLoading}>
                        {isLoading ? 
                            <ButtonLoading /> : <>{t("GLOBAL.BUTTONS.save")}</>
                        }
                    </Button>
                ):(
                    <Button 
                        type="submit" 
                        variant="success"
                        className="w-20"
                        disabled={isLoading}>
                        {t("GLOBAL.BUTTONS.save")} 
                    </Button>
                )}
                
            </div>
        </div>
    )
}

export default UserEditGroupButtons