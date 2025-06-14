// import React from 'react'

import Sidebar from "@/components/Sidebar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserStore } from "@/store/user";
import { toast, Toaster } from "sonner";

interface DataEntry {
  date: Date;
  revenue: boolean;
  value: number;
}

const DataPage = () => {
  const { mainUser, deleteDataEntry } = useUserStore();
  const formatUTCDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
  };
  const handleDelete = async (entry: DataEntry, mainUser: any) => {
    const { success, message } = await deleteDataEntry(entry, mainUser);

    if (!success) {
        toast.error("Error", {
        description: message,
        closeButton: true,
        });
    } else {
        toast.success("Deleted", {
        description: `Value of ${entry.revenue ? entry.value : -entry.value} on ${new Date(entry.date).toLocaleDateString()} was deleted.`,
        closeButton: true,
        });
    }
    };

  return (
    <div className="flex flex-row items-start justify-start w-full h-full">
        <Toaster richColors={true} />
        <Sidebar />
        <div className="flex flex-col h-full items-center mx-auto">
            <div>Past Entries</div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
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
                    <TableRow key={index} onClick={() => handleDelete(entry, mainUser)} >
                        <TableCell className="font-medium">
                        {formatUTCDate(entry.date.toString())}
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