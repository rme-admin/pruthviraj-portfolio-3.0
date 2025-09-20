
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
import { PlaceHolderImages } from '@/lib/placeholder-images'
import type { MediaItem } from '@/lib/data'

export const mediaColumns: ColumnDef<MediaItem>[] = [
  {
    accessorKey: "imageUrlId",
    header: "Image",
    cell: ({ row }) => {
      const imageId = row.getValue("imageUrlId") as string;
      const image = PlaceHolderImages.find(p => p.id === imageId);
      return image ? (
        <Image
          src={image.imageUrl}
          alt={image.description}
          width={64}
          height={48}
          className="rounded-md object-cover w-16 h-12"
          data-ai-hint={image.imageHint}
        />
      ) : <div className="w-16 h-12 bg-muted rounded-md" />;
    },
  },
  {
    accessorKey: "caption",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Caption
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mediaItem.caption)}
            >
              Copy caption
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/media/edit/${mediaItem.id}`}>Edit media</Link>
            </DropdownMenuItem>
             <DropdownMenuItem className="text-destructive">Delete media</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
