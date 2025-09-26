"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from 'next/image'
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
import type { Project } from '@/lib/types';

// The columns now need to know about the delete handler
export const createColumns = (
    deleteHandler: (projectId: string) => void
): ColumnDef<Project>[] => [
  {
    accessorKey: "img_url",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("img_url") as string;
      return imageUrl ? (
        <Image
          src={imageUrl}
          alt={row.original.title}
          width={64}
          height={48}
          className="rounded-md object-cover w-16 h-12"
        />
      ) : <div className="w-16 h-12 bg-muted rounded-md" />;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      // --- THIS IS THE FIX ---
      // We manually format the date to a consistent YYYY-MM-DD format.
      // This ensures the server and client always render the same string.
      try {
        const date = new Date(row.getValue("date"));
        const year = date.getFullYear();
        // getMonth() is 0-indexed, so we add 1. padStart ensures two digits (e.g., 09).
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } catch (e) {
        // Fallback for invalid dates
        return "Invalid Date";
      }
    }
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original
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
              <Link href={`/admin/projects/edit/${project.id}`}>Edit project</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => deleteHandler(project.id)}
            >
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]