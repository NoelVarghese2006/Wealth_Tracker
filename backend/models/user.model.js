import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    data: {
        type: [
        {
            date: {
            type: Date,
            required: true,
            },
            value: {
            type: Number,
            required: true,
            }
        }
        ],
    default: [],
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;