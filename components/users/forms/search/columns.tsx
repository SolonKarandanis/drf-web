'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/shared/shadcn/components/ui/button' 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/shadcn/components/ui/dropdown-menu'

export type UserTableRow = {
    id: number
    first_name: string
    last_name: string
    email: string
    created_date: string
}


export const columns: ColumnDef<UserTableRow>[] =[
    {
        header:"Id",
        accessorKey:"id"
    },
    {
        header:"Username",
        accessorKey:"username"
    },
    {
        header:"First Name",
        accessorKey:"first_name"
    },
    {
        header:"Last Name",
        accessorKey:"last_name"
    },
    {
        header:"Email",
        accessorKey:"email"
    },
    {
        header:"Created",
        accessorKey:"created_date",
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_date'))
            const formatted = date.toLocaleDateString()
            return <div className='font-medium'>{formatted}</div>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(String(user.id))}
                    >
                      Copy user ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
        }
    }
]