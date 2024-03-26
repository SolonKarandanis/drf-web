import { RefObject, useEffect, useState } from "react";


export const useHover = <T extends HTMLElement= HTMLElement>(ref:RefObject<T>) =>{
    const [value,SetValue] = useState(false);

    const handleMouseOver = () => SetValue(true);
    const handleMouseOut = () => SetValue(false);

    useEffect(
        () =>{
            const node = ref.current;
            if(node){
                node.addEventListener('mouseover',handleMouseOver);
                node.addEventListener('mouseout',handleMouseOut);
                return () =>{
                    node.removeEventListener('mouseover',handleMouseOver);
                    node.removeEventListener('mouseout',handleMouseOut);
                }
            }
        },
        [ref]
    );

    return [ref,value]
}