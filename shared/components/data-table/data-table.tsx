'use client'

import { useRef, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/shared/shadcn/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/shared/shadcn/components/ui/dropdown-menu';
import { Button } from '@/shared/shadcn/components/ui/button';
import { Input } from '@/shared/shadcn/components/ui/input';
import { useReactToPrint } from "react-to-print";
// @ts-ignore
import  Html2Pdf from 'js-html2pdf'
import { LuArrowDownAZ } from "react-icons/lu";
import { LuArrowUpAZ } from "react-icons/lu";
import { SortDirection } from '@/models/search.models';
import { useTranslations } from 'next-intl';


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchField:string;
    count: number| undefined;
    pages:number| null;
    next:number| null;
    previous:number| null;
    onPagination: (page:number, pageSize:number) =>void;
    onSorting: (sortField:string, sortOrder:SortDirection) =>void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchField,
    count,
    pages,
    next,
    previous,
    onPagination,
    onSorting,
}: DataTableProps<TData, TValue>){
    const t = useTranslations();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
          sorting,
          columnFilters,
          columnVisibility
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        manualPagination: true,
        manualSorting: true,
        rowCount: count,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const printDocumentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printDocumentRef.current,
        print: async (printIframe)=>{
            const document = printIframe.contentDocument;
            if (document) {
                const html = document.getElementById('table');
                const options = {
                    margin: 0,
                    filename: "users.pdf",
                }; 
                const exporter = new Html2Pdf(html, options);
                await exporter.getPdf(options); 
            }
        }
    });

    const handlePagingClick = (page:number|null,pageSize:number) => {
        if(page){
            onPagination(page,pageSize);
        }
    };


    const handleSortingClick = (column:any) =>{
        const sortField = column.id
        const sorted =column.getIsSorted()     
        if(sorted==false){
            onSorting(sortField,SortDirection.ASC)
        }
        if(sorted=='asc'){
            onSorting(sortField,SortDirection.DESC)
        }
    }
   

    return (
        <>
            
            <div className='flex items-center justify-between'>
                {/* Filters */}
                <div className='flex items-center py-4'>
                    <Input
                        placeholder='Search by name...'
                        value={(table.getColumn(searchField)?.getFilterValue() as string) ?? ''}
                        onChange={event =>
                            table.getColumn(searchField)?.setFilterValue(event.target.value)
                        }
                        className='max-w-sm'
                    />
                </div>
                {/* Column visibility */}
                <div className='flex items-center justify-between gap-1' >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='ml-auto'>
                                {t("GLOBAL.EXPORT-AS")}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <Button 
                                onClick={handlePrint}
                                variant='outline'
                                className='w-20'>
                                {t("GLOBAL.PDF")}
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='ml-auto'>
                                {t("GLOBAL.COLUMNS")}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            {table
                                .getAllColumns()
                                .filter(column => column.getCanHide())
                                .map(column => {
                                    return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className='capitalize'
                                        checked={column.getIsVisible()}
                                        onCheckedChange={value => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                    )
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* Table */}
            <div className='border rounded-md' ref={printDocumentRef} id='table'>
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead 
                                            key={header.id}
                                            {...(header.column.getCanSort()
                                                ? { onClick: header.column.getToggleSortingHandler() }
                                                : {})}
                                        >
                                            <div className='flex flex-row' onClick={() => handleSortingClick(header.column)}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                                {header.column.getIsSorted() === "asc" ? (
                                                        <span >
                                                            <LuArrowUpAZ />
                                                        </span>
                                                    ) : header.column.getIsSorted() === "desc" ? (
                                                        <span>
                                                            <LuArrowDownAZ />
                                                        </span>
                                                    ) : null
                                                }
                                            </div>
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    {t("GLOBAL.NO-RESULTS")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination */}
            <div className='flex items-center justify-end py-4 space-x-2'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                        table.previousPage()
                        handlePagingClick(previous,table.getState().pagination.pageSize)
                    }}
                    disabled={!Boolean(previous)}
                >
                    {t("GLOBAL.BUTTONS.previous")}
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                        table.nextPage()
                        handlePagingClick(next,table.getState().pagination.pageSize)
                    }}
                    disabled={!Boolean(next)}
                >
                    {t("GLOBAL.BUTTONS.next")}
                </Button>
                <span className="flex items-center gap-1">
                    <div>{t("GLOBAL.PAGE")}</div>
                    <strong>
                        {next ? next -1: pages}
                        {t("GLOBAL.OF")}{' '}
                        {pages}
                    </strong>
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        const pageSize = Number(e.target.value)
                        table.setPageSize(pageSize)
                        handlePagingClick(1,pageSize)
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        {t("GLOBAL.SHOW")} {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}