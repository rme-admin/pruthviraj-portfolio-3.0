
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
import type { Education } from '@/lib/data'
import { Badge } from "@/components/ui/badge"

export const educationColumns: ColumnDef<Education>[] = [
  {
    accessorKey: "degree",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Degree
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "institution",
    header: "Institution",
  },
  {
    accessorKey: "period",
    header: "Period",
  },
  {
    id: "marks",
    header: "Marks",
    cell: ({ row }) => {
      const education = row.original
      if (!education.marksScored) return null;
      
      const marksString = education.marksType === 'percentage'
        ? `${education.marksScored}%`
        : education.marksOutOf
        ? `${education.marksScored} / ${education.marksOutOf}`
        : education.marksScored;

      return (
        <div className="flex items-center gap-2">
            <span>{marksString}</span>
            {education.marksType && (
                <Badge variant="secondary" className="capitalize">{education.marksType}</Badge>
            )}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const education = row.original

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
              onClick={() => navigator.clipboard.writeText(education.degree)}
            >
              Copy degree
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/education/edit/${education.id}`}>Edit education</Link>
            </DropdownMenuItem>
             <DropdownMenuItem className="text-destructive">Delete education</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
