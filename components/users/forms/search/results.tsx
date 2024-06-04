"use client"

import { DataTable } from '@/shared/components/data-table/data-table'
import { columns } from './columns'
import { useAppSelector } from '@/shared/redux/hooks'


const Results = () => {
    const usersState = useAppSelector((state) => state.users)
    
    return (
        <DataTable 
            columns={columns}  
            data={usersState.users} 
            searchField={usersState.tableSearchField}
            count={usersState.count}
            pages={usersState.pages}
            next={usersState.next}
            previous={usersState.previous}/>
    )
}

export default Results