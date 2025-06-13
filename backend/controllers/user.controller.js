import User from '../models/user.model.js';
import mongoose from 'mongoose';


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}/*, '-password'*/); // Exclude password field
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Fetch error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getUser = async (req, res) => {
    const { username } = req.params;

    if(!username) {
        return res.status(400).json({ success: false, message: 'Username is required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Fetch error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const editUser = async (req, res) => {
    const { id } = req.params;

    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: 'Invalid user ID' });
    }

    const userData = req.body;
    try {
        const newUser = await User.findByIdAndUpdate(id, userData, { new: true });
        res.status(200).json({ success: true, message: 'User updated successfully', newUser });
    } catch (error) {   
        console.error("Update error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const createUser = async (req, res) => {
    const user = req.body;

    if(!user.username || !user.password) {
        return res.status(400).json({ sucess: false, message: 'All fields are required' });
    }
    const username = user.username
    const existingUser = await User.findOne({ username });
    if(existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({
        username: user.username,
        password: user.password, // In a real application, hash the password before saving
        data: []
    });

    try {
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Creation error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }

}

export const addData = async (req, res) => {
    const { username } = req.params;
    const {data} = req.body;
    if(!data.date || !data.value) {
        return res.status(400).json({ success: false, message: 'All fields are required from data' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.data.push(data);
        await user.save();
        res.status(200).json({ success: true, message: 'Data added successfully', data: user.data });
    } catch (error) {
        console.error("Data addition error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error("Deletion error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}