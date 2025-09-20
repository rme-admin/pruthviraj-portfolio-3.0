
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { Enquiry } from '@/lib/data'
import { Badge } from "@/components/ui/badge";

export const enquiryColumns: ColumnDef<Enquiry>[] = [
  {
    accessorKey: "date",
     header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "enquiryType",
    header: "Type",
    cell: ({ row }) => {
        const type = row.getValue("enquiryType") as string;
        return <Badge variant="outline">{type}</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const enquiry = row.original

      return (
        <Dialog>
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
                onClick={() => navigator.clipboard.writeText(enquiry.email)}
                >
                Copy email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Message
                    </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem className="text-destructive">Delete enquiry</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enquiry from {enquiry.name}</DialogTitle>
                    <DialogDescription>
                        {enquiry.date} via {enquiry.email}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <p><strong>Type:</strong> <Badge variant="secondary">{enquiry.enquiryType}</Badge></p>
                    <p><strong>Designation:</strong> {enquiry.designation}</p>
                    {enquiry.phone && <p><strong>Phone:</strong> {enquiry.phone}</p>}
                    <div className="p-4 bg-muted rounded-md text-sm">
                        {enquiry.message}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )
    },
  },
]
