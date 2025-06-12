import { useTheme } from '@/components/ThemeProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/user'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, Toaster } from 'sonner'

const LoginPage = () => {
  const { theme } = useTheme();
  const [newUser, setNewUser] = useState({
      username: "",
      password: "",
      data: [],
  });
  const { getUser } = useUserStore();
  const onSubmit = async ()  => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(theme)
    const {success, message} = await getUser(newUser);
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
    console.log(success, message);
    
  }
  return (
    <div className='flex flex-col items-center justify-center mx-auto w-lg p-4 gap-4'>
      <Toaster theme={theme} richColors={true} />
      <Input placeholder='Username' name='name' value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}/>
      <Input placeholder='Password' type='password' name='price' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}/>
      <Button className='w-full bg-blue-300' onClick={onSubmit}>Login</Button>

      <Link to={"/signup"}>
        Create an account?
      </Link>
    </div>
  )
}

export default LoginPage