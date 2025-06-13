// import React from 'react'

import Sidebar from "@/components/Sidebar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserStore } from "@/store/user";

const DataPage = () => {
  const { mainUser } = useUserStore();
  const formatUTCDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
 };

  return (
    <div className="flex flex-row items-start justify-start w-full h-full">
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
                    <TableRow key={index}>
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