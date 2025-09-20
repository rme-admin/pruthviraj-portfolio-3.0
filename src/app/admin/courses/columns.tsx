
"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link'
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Certification } from '@/lib/data'

export const courseColumns: ColumnDef<Certification>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "issuer",
    header: "Issuer",
  },
  {
    accessorKey: "certificateFile",
    header: "File",
    cell: ({ row }) => {
        const file = row.original.certificateFile;
        if (!file || file === '#') return <span>No File</span>
        return <a href={file} target="_blank" rel="noreferrer" className="text-primary hover:underline">View Certificate</a>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(course.name)}
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/edit/${course.id}`}>Edit course</Link>
            </DropdownMenuItem>
             <DropdownMenuItem className="text-destructive">Delete course</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
