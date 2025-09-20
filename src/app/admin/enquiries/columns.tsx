
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
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "enquiryType",
    header: "Reason",
    cell: ({ row }) => {
        const type = row.getValue("enquiryType") as string;
        return <Badge variant="outline">{type}</Badge>
    }
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      const truncatedMessage = message.length > 50 ? `${message.substring(0, 50)}...` : message;
      return <span className="text-muted-foreground">{truncatedMessage}</span>
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enquiry Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="text-muted-foreground col-span-1">Name</p>
                        <p className="font-medium col-span-3">{enquiry.name}</p>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <p className="text-muted-foreground col-span-1">Email</p>
                        <p className="font-medium col-span-3">{enquiry.email}</p>
                    </div>
                     {enquiry.phone && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <p className="text-muted-foreground col-span-1">Phone</p>
                            <p className="font-medium col-span-3">{enquiry.phone}</p>
                        </div>
                     )}
                     <div className="grid grid-cols-4 items-center gap-4">
                        <p className="text-muted-foreground col-span-1">Date</p>
                        <p className="font-medium col-span-3">{enquiry.date}</p>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <p className="text-muted-foreground col-span-1">Designation</p>
                        <p className="font-medium col-span-3">{enquiry.designation}</p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="text-muted-foreground col-span-1">Reason</p>
                        <div className="col-span-3">
                            <Badge variant="secondary">{enquiry.enquiryType}</Badge>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-muted-foreground">Message</p>
                        <div className="p-4 bg-muted rounded-md">
                            {enquiry.message}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )
    },
  },
]
