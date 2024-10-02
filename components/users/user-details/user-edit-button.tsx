import { Button } from '@/shared/shadcn/components/ui/button'
import {FC, MouseEventHandler} from 'react'

interface Props{
    onClick:MouseEventHandler<HTMLButtonElement>;
}

const UserEditButton:FC<Props> = ({onClick}) => {
  return (
    <Button 
        type="reset" 
        variant="info"
        className="w-20"
        onClick={onClick}>
        Edit
    </Button>
  )
}

export default UserEditButton