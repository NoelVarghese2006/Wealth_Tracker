import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserStore } from '@/store/user'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8, "Password must be at least 8 characters long").max(64, "Password must be less than 64 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[\W_]/, "Password must contain at least one special character")
})

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const { createUser } = useUserStore();

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    data: [],
  });

  const onSubmit = async ()  => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(newUser)
    const {success, message} = await createUser(newUser);
    console.log(success, message);
    
  }

  return (
    <div className='flex flex-col items-center justify-center mx-auto w-lg p-4 gap-4'>
      <Input placeholder='Product Name' name='name' value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}/>
      <Input placeholder='Price' type='name' name='price' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}/>
      <Button className='w-full bg-blue-300' onClick={onSubmit}>Add User</Button>
    </div>
  )
}

export default SignUpPage