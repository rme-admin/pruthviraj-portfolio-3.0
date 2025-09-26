"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link'
import { MoreHorizontal, ArrowUpDown, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { SocialLink } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const createSocialLinkColumns = (
  deleteHandler: (linkId: string) => void
): ColumnDef<SocialLink>[] => [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const iconUrl = row.getValue("icon") as string;
      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={iconUrl} alt={row.original.name} />
          <AvatarFallback><Link2 className="h-4 w-4" /></AvatarFallback>
        </Avatar>
      );
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => <a href={row.original.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{row.original.url}</a>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const socialLink = row.original
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
              <Link href={`/admin/social/edit/${socialLink.id}`}>Edit link</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => deleteHandler(socialLink.id)}
            >
              Delete link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]