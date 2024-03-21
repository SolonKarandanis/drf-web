'use client';

import useVerify  from '@/hooks/use-verify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Setup = () => {
    useVerify();
    return <ToastContainer />;
}

export default Setup