"use client"

import { DataTable } from '@/shared/components/data-table/data-table'
import { columns } from './columns'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks'
import { setPaging } from '@/shared/redux/features/users/usersSlice';
import { Paging, SortDirection } from '@/models/search.models';
import { useGetUserSearchResults } from '../../hooks/useGetUserSearchResults';


const Results = () => {
    const usersState = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch();

    const {
        handleGetSearchResults
    } = useGetUserSearchResults();


    const handlePagination = (page:number, pageSize:number) =>{
        const paging ={
            page,
            limit:pageSize,
        } as Paging;
        dispatch(setPaging(paging))
        const searchRequest = {...usersState.request}
        searchRequest.paging=paging
        handleGetSearchResults(searchRequest);
    }

    const handleSorting = (sortField:string, sortDirection:SortDirection) =>{
        const searchRequest = {...usersState.request}
        const page={
            page: searchRequest.paging.page,
            limit:searchRequest.paging.limit,
            sortField,
            sortOrder:sortDirection
        } as Paging;
        searchRequest.paging= page;
        handleGetSearchResults(searchRequest);
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
            onPagination={handlePagination}
            onSorting={handleSorting}/>
    )
}

export default Results