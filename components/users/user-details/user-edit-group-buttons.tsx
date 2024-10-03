import { Button } from '@/shared/shadcn/components/ui/button';
import {FC, MouseEventHandler} from 'react'

interface Props{
    onCancelClick:MouseEventHandler<HTMLButtonElement>;
    fomrId?:string;
}

const UserEditGroupButtons:FC<Props> = ({
    onCancelClick,
    fomrId
}) => {
  return (
    <div className="w-44"  data-testid="buttons">
        <div className='flex justify-between'>
            <Button 
                type="reset" 
                variant="destructive"
                className="w-20"
                onClick={onCancelClick}>
                Cancel
            </Button>
            {fomrId ?(
                <Button 
                    form={fomrId}
                    type="submit" 
                    variant="success"
                    className="w-20">
                    Save 
                </Button>
            ):(
                <Button 
                    type="submit" 
                    variant="success"
                    className="w-20">
                    Save 
                </Button>
            )}
            
        </div>
    </div>
  )
}

export default UserEditGroupButtons