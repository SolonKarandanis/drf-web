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
import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'

export type UserTableRow = {
    id: number
    firstName: string
    lastName: string
    email: string
    createdDate: string
    uuid:string
}

const userStatus = new Map<string, string>([
  ["user.unverified","Unverified"],
  ["user.active","Active"],
  ["user.deactivated","Deactivated"],
  ["user.deleted","Deleted"],
]);

const badgeVariants = cva('text-white badge',{
  variants:{
    intent:{
      Unverified:'bg-primary',
      Deactivated:'bg-warning',
      Active:'bg-success',
      Deleted:'bg-danger',
    }, 
  }
});

export const columns: ColumnDef<UserTableRow>[] =[
    {
        header:"Id",
        accessorKey:"id"
    },
    {
        header:"Username",
        accessorKey:"username",
        cell: ({ row }) => {
          const uuid = row.getValue('uuid') as string;
          const username = row.getValue('username') as string;
          return (
            <Link  href={`/users/${uuid}`}
              className="ml-1 hover:underline ltr:float-right rtl:float-left text-sky-600">
              {username}
            </Link>
          )
        }
    },
    {
        header:"First Name",
        accessorKey:"firstName"
    },
    {
        header:"Last Name",
        accessorKey:"lastName"
    },
    {
      header:"Status",
      accessorKey:"status",
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const statusLabel = userStatus.get(status) as VariantProps<typeof badgeVariants>["intent"];
        return <span className={badgeVariants({intent:statusLabel})}>{statusLabel}</span>
      }
    },
    {
        header:"Email",
        accessorKey:"email"
    },
    {
        header:"Created",
        accessorKey:"createdDate",
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdDate'))
            const formatted = date.toLocaleDateString()
            return <div className='font-medium'>{formatted}</div>
        }
    },
    {
      header:"Uuid",
      accessorKey:"uuid"
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='w-8 h-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='w-4 h-4' />
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