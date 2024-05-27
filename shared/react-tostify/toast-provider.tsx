"use client";

import {FC, ReactNode} from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    children: ReactNode;
}

const ToastProvider:FC<Props>= ({children}) => {
    return (
        <>
          {children}
          <ToastContainer />
        </>
    );
}

export default ToastProvider