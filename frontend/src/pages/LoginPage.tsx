import { useTheme } from '@/components/ThemeProvider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
      _id: "" // Initialize _id as an empty string
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [open, setOpen] = useState(false);
  const { getUser, loggedIn, logout, mainUser, editUser } = useUserStore();
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
    console.log(loggedIn);
    
  }
  const handleLogout = () => {
    toast.success("Logged out", {
      description: "You have been logged out successfully.",
      closeButton: true,
    });
    logout();
  }
  const handleEdit = async () => {
    if(!newUser.username || !newUser.password || newUser.password !== passwordCheck) {
      toast.error("Error", {
        description: "Please fill in all fields and ensure passwords match.",
        closeButton: true,
      });
      return;
    }
    const updatedUser = {
      ...mainUser,
      username: newUser.username,
      password: newUser.password,
      _id: mainUser._id // Ensure _id is included
    };
    const { success, message } = await editUser(updatedUser);
    if (!success) {
      toast.error("Error", {
        description: message,
        closeButton: true,
      });
    } else {
      toast.success("Success", {
        description: "User information updated successfully.",
        closeButton: true,
      });
      setOpen(false); // Close the dialog after successful edit
    }
  }
  return (
    <div className='flex justify-center items-center w-screen'>
      <Toaster theme={theme} richColors={true} />
      {!loggedIn && (
        <div className='flex flex-col items-center justify-center w-lg p-4 gap-4'>
          <Input placeholder='Username' name='name' value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}/>
          <Input placeholder='Password' type='password' name='price' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}/>
          <Button className='w-full bg-blue-300' onClick={onSubmit}>Login</Button>
          <Link to={"/signup"}>
            Create an account?
          </Link>
        </div>
      )}
      {loggedIn && (
        <div className='flex flex-col items-center justify-center w-lg p-4 gap-4'>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md bg:black">
              <DialogHeader>
                <DialogTitle>Change Data?</DialogTitle>
                <DialogDescription>
                  Edit or Delete the entry below.
                </DialogDescription>
              </DialogHeader>
              <div className='flex flex-col items-center justify-center mx-auto p-4 gap-4'>
                <Input placeholder='New Username' type='text' value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}/>
                <Input placeholder='New Password' type='text' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}/> 
                <Input placeholder='Reenter Password' type='password' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}/> 
              </div>
              <DialogFooter className="sm:justify-start">
                <Button className=' bg-blue-300' onClick={handleEdit}>
                  Add Expense/Revenue
                </Button>
                <Button type="button" variant="destructive" onClick={handleEdit}>
                  Delete Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={() => setOpen(true)}>Change Account Info?</Button>
          <Button>Delete Account</Button>
        </div>
      )}
    </div>
  )
}

export default LoginPage