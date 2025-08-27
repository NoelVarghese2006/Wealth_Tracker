// import React from 'react'

import Sidebar from "@/components/Sidebar"
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserStore } from "@/store/user";
import { Toaster } from "sonner";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";


interface realDataEntry {
    date: Date;
    revenue: boolean;
    value: number;
    _id: string; // Assuming _id is part of the entry
}

const DataPage = () => {
  const { mainUser } = useUserStore();

  
  return (
    <div className="flex flex-row items-start justify-start w-full h-full">
        <Toaster richColors={true} />
        <Sidebar />
        <div className="flex flex-col h-full items-center mx-auto">
            <div>Past Entries</div>
            <DataTable columns={columns} data={mainUser.data as realDataEntry[]}  />   
        </div>
    </div>
  )
}

export default DataPage