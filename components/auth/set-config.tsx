"use client"

import { ConfigModel } from '@/models/config.model';
import { setConfig } from '@/shared/redux/features/config/configSlice';
import { useAppDispatch } from '@/shared/redux/hooks';
import {FC} from 'react'

interface Props{
    config: ConfigModel;
}


const SetConfig:FC<Props> = ({config}) => {
    const dispatch = useAppDispatch();
    dispatch(setConfig(config))

    return  null;
}

export default SetConfig