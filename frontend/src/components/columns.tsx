"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/store/user";
import { MdEdit } from "react-icons/md";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Entry = {
    date: Date;
    revenue: boolean;
    value: number;
    _id: string;
}

export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("date");
      const dateObj = dateValue instanceof Date ? dateValue : new Date(dateValue as string | number | Date);
      return <span>{dateObj.toISOString().split("T")[0]}</span>;
    },
  },
  {
    accessorKey: "revenue",
    header: "Type",
    cell: ({row}) => {
      const tempBool = row.getValue("revenue");
      return tempBool ? <span className="text-green-600 dark:text-green-400">Revenue</span> : <span className="text-red-600 dark:text-red-400">Expense</span>
    }
  },
  {
    accessorKey: "value",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [currentEntry, setCurrentEntry] = useState(row.original)
      const { mainUser, editDataEntry, deleteDataEntry } = useUserStore()
      const handleEdit = async () => {
        const tempEntry = {
            date: new Date(currentEntry.date),
            revenue: currentEntry.revenue,
            value: Number(currentEntry.value),
            _id: currentEntry._id // Assuming _id is part of the entry
        }; 
        const {success, message} = await editDataEntry(tempEntry, mainUser);
        
        if (!success) {
            toast.error("Error", {
            description: message,
            closeButton: true,
            });
        } else {
            toast.success("Deleted", {
            description: `Entry on ${new Date(currentEntry.date).toLocaleDateString()} was changed.`,
            closeButton: true,
            });
        }
        console.log(mainUser.data)

      }
        const handleDelete = async () => {
          
          const tempDate = new Date(currentEntry.date);
          const tempEntry = {
              date: new Date(tempDate.toISOString()),
              revenue: currentEntry.revenue,
              value: Number(currentEntry.value),
              _id: currentEntry._id // Assuming _id is part of the entry
          };  
          console.log(tempEntry.date)
          const { success, message } = await deleteDataEntry(tempEntry, mainUser);
      
          if (!success) {
              toast.error("Error", {
              description: message,
              closeButton: true,
              });
          } else {
              toast.success("Deleted", {
              description: `Entry on ${new Date(currentEntry.date).toLocaleDateString()} was deleted.`,
              closeButton: true,
              });
          }
          console.log(mainUser.data)
        };
      return (
        <Dialog>
          <DialogTrigger><MdEdit /></DialogTrigger>
          <DialogContent className="sm:max-w-md bg:black">
              <DialogHeader>
                  <DialogTitle>Change Data?</DialogTitle>
                  <DialogDescription>
                      Edit or Delete the entry below.
                  </DialogDescription>
              </DialogHeader>
              <div className='flex flex-col items-center justify-center mx-auto p-4 gap-4'>
                  <Input
                    placeholder='Date'
                    type='date'
                    value={
                      currentEntry.date instanceof Date
                        ? currentEntry.date.toISOString().split("T")[0]
                        : new Date(currentEntry.date).toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      setCurrentEntry({
                        ...currentEntry,
                        date: new Date(e.target.value),
                      })
                    }
                  />
                  <Input placeholder='Amount' type='number' name='price' value={currentEntry.value} onChange={(e) => setCurrentEntry({ ...currentEntry, value: Number(e.target.value) })}/>
                  <div className="flex items-center space-x-2">
                  <Switch checked={currentEntry.revenue} onCheckedChange={(val) => setCurrentEntry({ ...currentEntry, revenue: val })}/>
                  <Label>{currentEntry.revenue ? "Revenue" : "Expense"}</Label>
                  </div>
                  
              </div>
              <DialogFooter className="sm:justify-start">
                  <Button className=' bg-green-400' onClick={handleEdit}>
                      Edit Expense/Revenue
                  </Button>
                  <Button type="button" variant="destructive" onClick={handleDelete}>
                      Delete Entry
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
      )
    },
  },
]