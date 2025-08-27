import User from '../models/user.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


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
    const { username, password } = req.params;

    if(!username) {
        return res.status(400).json({ success: false, message: 'Username is required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Fetch error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteData = async (req, res) => {
    const { user_id, id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try {
        const user = await User.findById(user_id);
        user.data = user.data.filter(item => item._id.toString() !== id);
        await user.save();
        res.status(200).json({ success: true, message: 'Data deleted successfully', data: user.data });
    } catch (error) {
        console.error("Deletion error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const editData = async (req, res) => {
    const { user_id, id } = req.params;

    const data = req.body;
    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try {
        const user = await User.findById(user_id);
        const dataIndex = user.data.findIndex(item => item._id.toString() === id);
        if (dataIndex === -1) {
            res.status(404).json({ success: false, message: "Data entry not found" });
        }
        else {
            user.data[dataIndex].date = data.date;
            user.data[dataIndex].revenue = data.revenue;
            user.data[dataIndex].value = data.value;
            await user.save();
            const updatedProduct = user.data[dataIndex];
            res.status(200).json({success: true, message: "Product updated successfully" });
        }
    } catch(error) {
        console.error("Edit error", error.message);
        res.status(500).json({success: false, message: "Server Error: Edit "});
    }
}

export const editUser = async (req, res) => {
    const { id } = req.params;

    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: 'Invalid user ID' });
    }

    const userData = req.body;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    if(!userData.username || !userData.password) {
        return res.status(400).json({ success: false, message: 'All fields are required from editUser' });
    }
    const fixData = {
        username: userData.username,
        password: hashedPassword, // In a real application, hash the password before saving
        data: userData.data || []
    };

    try {
        const newUser = await User.findByIdAndUpdate(id, fixData, { new: true });
        res.status(200).json({ success: true, message: 'User updated successfully', newUser });
    } catch (error) {   
        console.error("Update error", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const createUser = async (req, res) => {
    const user = req.body;

    if(!user.username || !user.password) {
        return res.status(400).json({ sucess: false, message: 'All fields are required from createUser' });
    }
    const username = user.username
    const existingUser = await User.findOne({ username });
    if(existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser = new User({
        username: user.username,
        password: hashedPassword, // In a real application, hash the password before saving
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