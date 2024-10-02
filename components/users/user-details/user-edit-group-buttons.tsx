import { Button } from '@/shared/shadcn/components/ui/button';
import {FC, MouseEventHandler} from 'react'

interface Props{
    onCancelClick:MouseEventHandler<HTMLButtonElement>;
    onSaveClick:MouseEventHandler<HTMLButtonElement>;
}

const UserEditGroupButtons:FC<Props> = ({
    onCancelClick,
    onSaveClick
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
            <Button 
                type="button" 
                variant="success"
                className="w-20"
                onClick={onSaveClick}>
                Save 
            </Button>
        </div>
    </div>
  )
}

export default UserEditGroupButtons