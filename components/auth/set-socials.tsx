"use client"

import { useGetSocials } from './hooks/useGetSocials';

const SetSocials = () => {
  const {response} =useGetSocials();
  return null;
}

export default SetSocials