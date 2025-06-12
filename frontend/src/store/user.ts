import {create} from 'zustand'

interface DataEntry {
  date: Date;
  value: number;
}

interface User {
    username: string;
    password: string;
    data: DataEntry[];
}

interface UserStore {
    users: User[];
    setUsers: (users: User[]) => void;
    createUser: (user: User) => Promise<{success: boolean, message: string}>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    createUser: async (user: User) => {
        if(!user.username || !user.password) {
            return {success:false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/users", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
        })
        const data = await res.json();
        if(data.success === false) {
            return {success:false, message: data.message || "An error occurred while creating the user."}
        }
        set((state) => ({users:[...state.users, data.data]}))
        return {success:true, message: "Product created succesfully"}
        }
}));