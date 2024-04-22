import {FC} from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shared/shadcn/components/ui/alert-dialog';

interface Props{
    isOpen: boolean;
    yesCallback: () => void;
    noCallback: () => void;
}

const LeavingDialog:FC<Props> = ({isOpen, yesCallback, noCallback}) => {
    return (
        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                The data will be lost.
              </AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to leave the page?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => noCallback()}>No</AlertDialogCancel>
              <AlertDialogAction onClick={() => yesCallback()}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    );
}

export default LeavingDialog