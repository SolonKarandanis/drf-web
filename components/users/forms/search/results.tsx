"use client"

import { DataTable } from '@/shared/components/data-table/data-table'
import { columns } from './columns'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks'
import { setPaging } from '@/shared/redux/features/users/usersSlice';
import { Paging } from '@/models/search.models';


const Results = () => {
    const usersState = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch();

    const handleChangePage = (page:number) =>{
        const paging ={
            page,
            limit:5,
        } as Paging;
        dispatch(setPaging(paging))
    }
    
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