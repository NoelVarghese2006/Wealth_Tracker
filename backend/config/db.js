import { mongoose } from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://noelvarghese2006:syv0d2Xzpdgay7qR@cluster0.tibkadx.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};