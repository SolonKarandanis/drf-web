import { useEffect, useState } from "react";

export const useLocalStorage = (storageKey:string, fallbackState:string) => {
    const [value, setValue] = useState<string>(
      JSON.parse(localStorage.getItem(storageKey)!) ?? fallbackState
    );
  
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);
  
    return [value, setValue];
};