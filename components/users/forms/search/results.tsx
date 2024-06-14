"use client"

import { DataTable } from '@/shared/components/data-table/data-table'
import { columns } from './columns'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks'
import { setPaging, setUsers } from '@/shared/redux/features/users/usersSlice';
import { Paging, UserSearchResponse } from '@/models/search.models';
import { useSearchUsersMutation } from '@/shared/redux/features/users/usersApiSlice';
import { ErrorResponse } from '@/models/error.models';
import { toast } from 'react-toastify';


const Results = () => {
    const usersState = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch();
    const [search] = useSearchUsersMutation();

    const handleError =(errorResponse:ErrorResponse)=>{
		const {status, data:{detail}} = errorResponse;
		toast.error(`(${status}) ${detail}`);
	}

    const handlePagination = (page:number, pageSize:number) =>{
        const paging ={
            page,
            limit:pageSize,
        } as Paging;
        dispatch(setPaging(paging))
        const searchRequest = {...usersState.request}
        searchRequest.paging=paging
        search(searchRequest)
            .unwrap()
            .then((response:UserSearchResponse ) => {
                dispatch(setUsers(response));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    }
    
    return (
        <DataTable 
            columns={columns}  
            data={usersState.users} 
            searchField={usersState.tableSearchField}
            count={usersState.count}
            pages={usersState.pages}
            next={usersState.next}
            previous={usersState.previous}
            onPagination={handlePagination}/>
    )
}

export default Results