"use client"

import { DataTable } from '@/shared/components/data-table/data-table'
import React from 'react'
import { columns } from './columns'
import { useAppSelector } from '@/shared/redux/hooks'


const Results = () => {
    const usersState = useAppSelector((state) => state.users)
    
    return (
        <DataTable columns={columns}  data={usersState.users}/>
    )
}

export default Results