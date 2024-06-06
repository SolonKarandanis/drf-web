'use client'

import { ChangeEvent, useRef, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/shadcn/components/ui/select';
import { FormControl } from '@/shared/shadcn/components/ui/form';


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchField:string;
    count: number| null;
    pages:number| null;
    next:number| null;
    previous:number| null;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchField,
    count,
    pages,
    next,
    previous
}: DataTableProps<TData, TValue>){
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
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
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
                <div className='flex items-center justify-between gap-1'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='ml-auto'>
                                Export as
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <Button 
                                onClick={handlePrint}
                                variant='outline'
                                className='w-20'>
                                Pdf
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='ml-auto'>
                                Columns
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
                                        <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
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
                                    No results.
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
                    onClick={() => table.previousPage()}
                    disabled={!Boolean(previous)}
                >
                    Previous
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.nextPage()}
                    disabled={!Boolean(next)}
                >
                    Next
                </Button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {next ? next -1: pages}
                        of{' '}
                        {pages}
                    </strong>
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}