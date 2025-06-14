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
    deleteDataEntry: (entry: DataEntry, user: User) => Promise<{success: boolean, message: string}>;
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
        //console.log(entry)
        console.log(JSON.stringify({ data: entry }))
        const res = await fetch(`/api/users/${user.username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: entry })
            
        });
        const data = await res.json();
        if(data.success === true) {
            set((state) => ({
                mainUser: {
                    ...state.mainUser,
                    data: [...state.mainUser.data, entry]
                }
            }));
        }
        return {success: data.success, message: data.message || "An error occurred while adding the entry."}
    },
    deleteDataEntry: async (entryD: DataEntry, user: User) => {
        const index = user.data.findIndex(
        (entry) =>
            entry.date.toString() === entryD.date.toString() &&
            entry.revenue === entryD.revenue &&
            entry.value === entryD.value
        );
        const res = await fetch(`/api/users/${user.username}/${index}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(data.success === true) {
            set((state) => ({
                mainUser: {
                    ...state.mainUser,
                    data: state.mainUser.data.filter(d => d.date !== entryD.date || d.value !== entryD.value || d.revenue !== entryD.revenue)
                }
            }));
        }
        return {success: data.success, message: data.message || "An error occurred while deleting the entry."}
    }
}));