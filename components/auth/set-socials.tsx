"use client"

import { useLazyGetSocialsQuery } from '@/shared/redux/features/social/socialApiSlice';
import { setSocials } from '@/shared/redux/features/social/socialSlice';
import { useAppDispatch } from '@/shared/redux/hooks';
import { useEffect } from 'react';

const SetSocials = () => {
    const [getSocials, response] = useLazyGetSocialsQuery();
    const dispatch = useAppDispatch();
    useEffect(()=>{
        getSocials()
          .unwrap()
          .then((socials) => {
            dispatch(setSocials(socials))
          })
      },[])
    return null;
}

export default SetSocials