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
  const [open2, setOpen2] = useState(false);
  const { getUser, loggedIn, logout, mainUser, editUser } = useUserStore();
  const onSubmit = async ()  => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(theme)
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
      setTimeout(() => {
        toast.info("Need Help?", {
          description: "To see your data, click on the '$' icon in the navigation bar.",
          closeButton: true,
        });
      }, 10000);
    }
    newUser.password = ""
    //console.log(success, message);
    //console.log(loggedIn);
    
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
  const handleDelete = async () => {

  } 
  return (
    <div className='flex justify-center items-center w-screen h-[40dvh]'>
      <Toaster theme={theme} richColors={true} />
      {!loggedIn && (
        <div className='flex flex-col items-center justify-center w-lg p-4 gap-4'>
          <Input placeholder='Username' name='name' value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}/>
          <Input placeholder='Password' type='password' name='price' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}/>
          <Button className='w-full bg-green-400' onClick={onSubmit}>Login</Button>
          <Link to={"/signup"} className='hover:underline'>
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
                <Button className=' bg-green-400' onClick={handleEdit}>
                  Edit Account Info
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={open2} onOpenChange={setOpen2}>
            <DialogContent className="sm:max-w-md bg:black">
              <DialogHeader>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogDescription>
                  Reconfirm your accound deletion.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="destructive" onClick={handleDelete}>
                  Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleLogout} className='bg-green-400'>Logout</Button>
          <Button onClick={() => setOpen(true)} className='bg-green-400'>Change Account Info?</Button>
          <Button onClick={() => setOpen2(true)} variant='destructive'>Delete Account</Button>
        </div>
      )}
    </div>
  )
}

export default LoginPage