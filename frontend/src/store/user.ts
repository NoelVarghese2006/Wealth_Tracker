import {create} from 'zustand'

interface DataEntry {
  date: Date;
  revenue: boolean;
  value: number;
  _id?: string; // Assuming _id is part of the entry
}

interface User {
    username: string;
    password?: string;
    data: DataEntry[];
    _id: string; // Assuming _id is part of the user
}

interface UserStore {
    loggedIn: boolean;
    mainUser: User;
    setUser: (user: User) => void;
    createUser: (user: User) => Promise<{success: boolean, message: string}>;
    getUser: (user: User) => Promise<{success: boolean, message: string}>;
    addDataEntry: (entry: DataEntry, user: User) => Promise<{success: boolean, message: string}>;
    editUser: (user: User) => Promise<{success: boolean, message: string}>;
    deleteDataEntry: (entry: DataEntry, user: User) => Promise<{success: boolean, message: string}>;
    editDataEntry: (entry: DataEntry, user: User) => Promise<{success: boolean, message: string}>;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    mainUser: {
        username: "",
        //password: "",
        data: [],
        _id: "" // Initialize _id as an empty string
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
        const res = await fetch(`/api/users/credentials/${user.username}/${user.password}`, {
            method:"GET",
        })
        const data = await res.json();
        if(data.success === false) {
            return {success:false, message: data.message || "An error occurred while creating the user."}
        }
        console.log(data.data)
        set({ mainUser: data.data, loggedIn: true });
        return {success:true, message: "Login successful"}
    },
    editUser: async (user: User) => {
        const res = await fetch(`/api/users/user/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if(data.success === false) {
            return {success:false, message: data.message || "An error occurred while editing the user."}
        }
        set({ mainUser: data.data });
        return {success:true, message: "User edited successfully"}
    },
    addDataEntry: async (entry: DataEntry, user: User) => {
        //console.log(entry)
        console.log(JSON.stringify({ data: entry }))
        const res = await fetch(`/api/users/data/${user.username}`, {
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
            new Date(entry.date).toISOString() === entryD.date.toISOString() &&
            entry.revenue === entryD.revenue &&
            entry.value === entryD.value
        );
        const res = await fetch(`/api/users/data/${user.username}/${index}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(data.success === true) {
            set((state) => ({
                mainUser: {
                    ...state.mainUser,
                    data: state.mainUser.data.filter(d => new Date(d.date).toISOString() !== entryD.date.toISOString() || d.value !== entryD.value || d.revenue !== entryD.revenue)
                }
            }));
        }
        return {success: data.success, message: data.message || "An error occurred while deleting the entry."}
    },
    editDataEntry: async (entry: DataEntry, user: User) => {
        const res = await fetch(`/api/users/data/${user.username}/${entry._id}`, {
            method: "PUT",
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
                    data: state.mainUser.data.map((d) => d._id === entry._id ? entry : d)
                }
            }));
        }
        return {success: data.success, message: data.message || "An error occurred while editing the entry."}
    },
    logout: async () => {
        set({ mainUser: { username: "", password: "", data: [], _id: "" }, loggedIn: false});
    }
}));