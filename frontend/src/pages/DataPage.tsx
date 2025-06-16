// import React from 'react'

import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserStore } from "@/store/user";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { toast, Toaster } from "sonner";

interface DataEntry {
  date: string;
  revenue: boolean;
  value: string;
 _id: string; // Optional _id for the entry, if needed
}

interface realDataEntry {
    date: Date;
    revenue: boolean;
    value: number;
    _id: string; // Assuming _id is part of the entry
}

const DataPage = () => {
  const { mainUser, deleteDataEntry, editDataEntry } = useUserStore();
  const [ currentEntry, setCurrentEntry ] = React.useState<DataEntry>({
    date: new Date().toISOString().split("T")[0],
    revenue: false,
    value: "",
    _id: "" // Initialize _id as an empty string
  });
  const [ open, setOpen ] = React.useState(false);
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
  
  const handleClick = (entry: realDataEntry) => {
    console.log(entry.date)
    const tempEntry = {
        date: entry.date.toString().split("T")[0],
        revenue: entry.revenue,
        value: entry.value.toString(),
        _id: entry._id // Assuming _id is part of the entry
    }
    // console.log(tempEntry.date)
    setCurrentEntry(tempEntry);
    // console.log(currentEntry.date)
    setOpen(true);
  };
  
  function formatDate(date: string | Date): string {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 10);
}



  return (
    <div className="flex flex-row items-start justify-start w-full h-full">
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md bg:black">
                <DialogHeader>
                    <DialogTitle>Change Data?</DialogTitle>
                    <DialogDescription>
                        Edit or Delete the entry below.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col items-center justify-center mx-auto p-4 gap-4'>
                    <Input placeholder='Date' type='date' value={formatDate(currentEntry.date)} onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}/>
                    <Input placeholder='Amount' type='number' name='price' value={currentEntry.value} onChange={(e) => setCurrentEntry({ ...currentEntry, value: e.target.value })}/>
                    <div className="flex items-center space-x-2">
                    <Switch checked={currentEntry.revenue} onCheckedChange={(val) => setCurrentEntry({ ...currentEntry, revenue: val })}/>
                    <Label>{currentEntry.revenue ? "Revenue" : "Expense"}</Label>
                    </div>
                    
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button className=' bg-blue-300' onClick={handleEdit}>
                        Add Expense/Revenue
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete}>
                        Delete Entry
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <Toaster richColors={true} />
        <Sidebar />
        <div className="flex flex-col h-full items-center mx-auto">
            <div>Past Entries</div>
            <Table>
                <TableCaption>A list of your recent entries.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                   {[...mainUser.data]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry, index) => (
                    <TableRow key={index} onClick={() => handleClick(entry)} >
                        <TableCell className="font-medium">
                        {new Date(entry.date).toISOString().split("T")[0]}
                        </TableCell>
                        <TableCell>
                        {entry.revenue ? "Revenue" : "Expense"}
                        </TableCell>
                        {/* No paymentMethod in your type, so use a placeholder */}
                        <TableCell className="text-right">
                        ${entry.value.toFixed(2)}
                        </TableCell>
                    </TableRow>
                    ))}

                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default DataPage