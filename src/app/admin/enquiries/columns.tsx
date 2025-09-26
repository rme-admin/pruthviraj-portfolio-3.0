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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Enquiry } from '@/lib/types'
import { Badge } from "@/components/ui/badge";

export const createEnquiryColumns = (
  changeStatusHandler: (enquiryId: string, newStatus: Enquiry['status']) => void,
  deleteHandler: (enquiryId: string) => void
): ColumnDef<Enquiry>[] => [
  {
    accessorKey: "date",
     header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "enquiryType",
    header: "Reason",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("enquiryType")}</Badge>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Enquiry['status'];
      const variant: "default" | "secondary" | "destructive" = 
          status === 'responded' ? 'default' 
        : status === 'prioritized' ? 'destructive' 
        : 'secondary';
      return <Badge variant={variant} className="capitalize">{status}</Badge>
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
                <DialogTrigger asChild>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Message
                    </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => changeStatusHandler(enquiry.id, 'pending')}>Mark as Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeStatusHandler(enquiry.id, 'responded')}>Mark as Responded</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeStatusHandler(enquiry.id, 'prioritized')}>Mark as Prioritized</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => deleteHandler(enquiry.id)}
                >
                  Delete enquiry
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            {/* --- THIS IS THE FIX: The dialog content is now fully implemented --- */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Enquiry Details</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4 text-sm">
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
                        <div className="p-4 bg-muted rounded-md min-h-[100px] whitespace-pre-wrap">
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