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
import type { MediaItem } from '@/lib/types'

export const createMediaColumns = (
  deleteHandler: (mediaId: string) => void
): ColumnDef<MediaItem>[] => [
  {
    accessorKey: "imageUrlId",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrlId") as string;
      return imageUrl ? (
        <Image
          src={imageUrl}
          alt={row.original.caption}
          width={64}
          height={48}
          className="rounded-md object-cover w-16 h-12"
        />
      ) : <div className="w-16 h-12 bg-muted rounded-md" />;
    },
  },
  {
    accessorKey: "caption",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Caption <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mediaItem = row.original
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
              <Link href={`/admin/media/edit/${mediaItem.id}`}>Edit media</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => deleteHandler(mediaItem.id)}
            >
              Delete media
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]