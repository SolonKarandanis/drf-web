'use client'

import { useHydration } from "@/hooks/use-hydration";
import { FC,Suspense } from "react";

interface Props{
    date:Date | string | number;
}

const LocalTime:FC<Props> = ({date}) => {
    const hydrated = useHydration()
    return (
        <Suspense key={hydrated ? 'local' : 'utc'}>
            <time dateTime={new Date(date).toISOString()}>
                {new Date(date).toLocaleTimeString()}
                {hydrated ? '' : ' (UTC)'}
            </time>
        </Suspense>
    )
}

export default LocalTime