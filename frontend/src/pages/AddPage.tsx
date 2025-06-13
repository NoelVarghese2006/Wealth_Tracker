// import React from 'react'

import { useTheme } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useUserStore } from "@/store/user"
import { useState } from "react"
import { toast, Toaster } from "sonner"

const AddPage = () => {
  const { theme } = useTheme()
  const { addDataEntry, mainUser } = useUserStore();
  const [newData, setNewData] = useState({
    date: new Date().toISOString().split("T")[0],
    revenue: false,
    value: "",
  });

  const onSubmit = async ()  => {
    //console.log(newData)
    //console.log(mainUser)
    const data = {
      date: new Date(newData.date),
      revenue: newData.revenue,
      value: parseFloat(newData.value),
    }
    const {success, message} = await addDataEntry(data, mainUser);
    if(!success) {
      toast.error("Error", {
          description: message,
          closeButton: true
      })
    }
    else {
      toast.success("Success", {
          description: message,
          closeButton: true,

      })
    }
  }

  return (
    <div className='flex flex-col items-center justify-center mx-auto w-lg p-4 gap-4'>
      <Toaster theme={theme} richColors={true} />
      <Input placeholder='Date' type='date' value={newData.date} onChange={(e) => setNewData({ ...newData, date: e.target.value })}/>
      <Input placeholder='Amount' type='number' name='price' value={newData.value} onChange={(e) => setNewData({ ...newData, value: e.target.value })}/>
      <div className="flex items-center space-x-2">
        <Switch checked={newData.revenue} onCheckedChange={(val) => setNewData({ ...newData, revenue: val })}/>
        <Label>{newData.revenue ? "Revenue" : "Expense"}</Label>
      </div>
      <Button className='w-full bg-blue-300' onClick={onSubmit}>Add Expense/Revenue</Button>
    </div>
  )
}

export default AddPage