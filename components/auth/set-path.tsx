"use client"

import { setBaseUrl } from '@/shared/redux/features/config/configSlice';
import { useAppDispatch } from '@/shared/redux/hooks';
import {FC} from 'react'

interface Props{
    path:string;
}


const Setpath:FC<Props> = ({path}) => {
    const dispatch = useAppDispatch();
    dispatch(setBaseUrl(path))

    return  null;
}

export default Setpath