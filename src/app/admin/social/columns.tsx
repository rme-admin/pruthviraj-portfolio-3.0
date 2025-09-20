
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
import type { SocialLink } from '@/lib/data'
import { socialIcons } from "@/lib/social-icons.tsx"
import React from "react"

export const socialLinkColumns: ColumnDef<SocialLink>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const iconName = row.getValue("icon") as string;
      const Icon = socialIcons[iconName];
      return Icon ? <Icon className="h-6 w-6" /> : null;
    }
  },
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
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.original.url;
      return <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{url}</a>
    }
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(socialLink.name)}
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/social/edit/${socialLink.id}`}>Edit link</Link>
            </DropdownMenuItem>
             <DropdownMenuItem className="text-destructive">Delete link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

    