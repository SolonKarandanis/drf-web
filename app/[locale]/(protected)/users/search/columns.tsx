'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/shared/shadcn/components/ui/button' 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/shadcn/components/ui/dropdown-menu'


export const columns: ColumnDef<UserModel>[] =[
    {
        header:"Id",
        accessorKey:"id"
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
        accessorKey:"created_date"
    },
]