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
import type { Education } from '@/lib/types' // Use our central types
import { Badge } from "@/components/ui/badge"

// Columns now accept a delete handler function
export const createEducationColumns = (
  deleteHandler: (educationId: string) => void
): ColumnDef<Education>[] => [
  {
    accessorKey: "course", // Changed from degree to course to match API
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Course <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "institute", // Changed from institution to institute
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
      const edu = row.original;
      if (!edu.marksScored) return null;
      
      const marksString = edu.marksType === 'percentage'
        ? `${edu.marksScored}%`
        : edu.marksOutOf
        ? `${edu.marksScored} / ${edu.marksOutOf}`
        : edu.marksScored;

      return (
        <div className="flex items-center gap-2">
            <span>{marksString}</span>
            {edu.marksType && (
                <Badge variant="secondary" className="capitalize">{edu.marksType}</Badge>
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
            <DropdownMenuItem asChild>
              <Link href={`/admin/education/edit/${education.id}`}>Edit education</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => deleteHandler(education.id)}
            >
              Delete education
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]