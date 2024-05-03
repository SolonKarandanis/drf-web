"use client";

import {FC} from 'react'

interface Props{
    error:Error,
    reset: ()=>void,
}

const Error:FC<Props> = ({
    error,
    reset
}) => {
  return (
    <div>
        error
        <button onClick={reset}>Try again</button>
    </div>
  )
}

export default Error