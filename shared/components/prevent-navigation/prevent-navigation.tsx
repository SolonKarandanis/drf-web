'use client';

import { FC, useEffect, useRef, useState} from 'react'
import { useRouter } from 'next/navigation';
import LeavingDialog from '../leaving-dialog/leaving-dialog';


export interface Props{
  isDirty: boolean;
  backHref: string;
  resetData: () => void; 
}

const PreventNavigation:FC<Props> = ({ isDirty, backHref, resetData}) => {
  const [leavingPage, setLeavingPage] = useState(false);
  const router = useRouter();

  /**
   * Function that will be called when the user selects `yes` in the confirmation modal,
   * redirected to the selected page.
   */
  const confirmationFn = useRef<() => void>(() => {});

  // Used to make popstate event trigger when back button is clicked.
  // Without this, the popstate event will not fire because it needs there to be a href to return.
  if (typeof window !== 'undefined') {
    window.history.pushState(null, document.title, window.location.href);
  }

  useEffect(() => {
    /**
     * Used to prevent navigation when use click in navigation `<Link />` or `<a />`.
     * @param e The triggered event.
     */
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      

      if (isDirty) {
        event.preventDefault();

        confirmationFn.current = () => {
          router.push(target.href);
        };

        setLeavingPage(true);
      }
    };
    /* ********************************************************************* */
    /**
     * Used to prevent navigation when use `back` browser buttons.
     */
    const handlePopState = () => {
      if (isDirty) {
        window.history.pushState(null, document.title, window.location.href);

        confirmationFn.current = () => {
          router.push(backHref);
        };

        setLeavingPage(true);
      } else {
        window.history.back();
      }
    };
    /* ********************************************************************* */
    /**
     * Used to prevent navigation when reload page or navigate to another page, in diffenret origin.
     * @param e The triggered event.
     */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = true;
      }
    };
    /* ********************************************************************* */
    /* *************************** Open listeners ************************** */
    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', handleClick);
    });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    /* ************** Return from useEffect closing listeners ************** */
    return () => {
      document.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', handleClick);
      });
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };


  },[isDirty])

  return (
    <>
      <LeavingDialog
        isOpen={leavingPage}
        noCallback={() => {
          setLeavingPage(false);
          confirmationFn.current = () => {};
        }}
        yesCallback={() => {
          confirmationFn.current();
          setLeavingPage(false);
          confirmationFn.current = () => {};
          resetData();
        }}
      />
    </>
  )


}

export default PreventNavigation