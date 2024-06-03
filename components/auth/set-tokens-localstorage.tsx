"use client"

import { setLoginResponseInStorage } from '@/utils/functions';
import {FC} from 'react'

interface Props{
    access:string;
    refresh:string;
}

const SetTokensLocalStorage:FC<Props> = ({access,refresh}) => {
    setLoginResponseInStorage({access,refresh});
    return null;
}

export default SetTokensLocalStorage