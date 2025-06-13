import {create} from 'zustand'

interface DataEntry {
  date: Date;
  revenue: boolean;
  value: number;
}

interface User {
    username: string;
    password: string;
    data: DataEntry[];
}

interface UserStore {
    loggedIn: boolean;
    mainUser: User;
    setUser: (user: User) => void;
    createUser: (user: User) => Promise<{success: boolean, message: string}>;
    getUser: (user: User) => Promise<{success: boolean, message: string}>;
    addDataEntry: (entry: DataEntry, user: User) => Promise<{success: boolean, message: string}>;
}

export const useUserStore = create<UserStore>((set) => ({
    mainUser: {
        username: "",
        password: "",
        data: [],
    },
    loggedIn: false,
    setUser: (mainUser) => set({ mainUser }),
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
        return {success:true, message: "Product created succesfully"}
    },
    getUser: async (user: User) => {
        const res = await fetch(`/api/users/${user.username}`, {
            method:"GET",
        })
        const data = await res.json();
        if(data.success === false) {
            return {success:false, message: data.message || "An error occurred while creating the user."}
        }
        console.log(data.data)
        if(user.password !== data.data.password) {
            return {success:false, message: "Incorrect password."}
        }
        set({ mainUser: data.data, loggedIn: true });
        return {success:true, message: "Login successful"}
    },
    addDataEntry: async (entry: DataEntry, user: User) => {
        const res = await fetch(`/api/users/${user.username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: entry })
        });
        const data = await res.json();
        return {success: data.success, message: data.message || "An error occurred while adding the entry."}
    }
}));