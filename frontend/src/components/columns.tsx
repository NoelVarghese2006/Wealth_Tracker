"use client"

import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Entry = {
    date: Date;
    revenue: boolean;
    value: number;
    // _id: string;
}

export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "revenue",
    header: "Type",
  },
  {
    accessorKey: "value",
    header: "Amount",
  },
]