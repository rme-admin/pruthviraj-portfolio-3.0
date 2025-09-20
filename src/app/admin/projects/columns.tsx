
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
import type { Project, ResearchProject } from '@/lib/data'
import { Badge } from "@/components/ui/badge"

const createColumns = <T extends Project | ResearchProject>(isTechnical: boolean): ColumnDef<T>[] => [
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
    accessorKey: "title",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  ...(isTechnical ? [{
    accessorKey: "url",
    header: "URL",
    cell: ({ row }: { row: { original: Project }}) => {
        const url = row.original.url;
        return <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{url}</a>
    }
  }] as ColumnDef<T>[] : []),
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(project.title)}
            >
              Copy project title
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/projects/edit/${project.id}`}>Edit project</Link>
            </DropdownMenuItem>
             <DropdownMenuItem className="text-destructive">Delete project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const technicalProjectColumns: ColumnDef<Project>[] = createColumns<Project>(true);
export const researchProjectColumns: ColumnDef<ResearchProject>[] = createColumns<ResearchProject>(false);
