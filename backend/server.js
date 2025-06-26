import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';

import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/users", userRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ', PORT);
});


// // use later ig
// const bcrypt = require('bcrypt');

// // Register user
// const password = "user_password123";
// const saltRounds = 12;
// const passwordHash = await bcrypt.hash(password, saltRounds);

// await db.collection('users').insertOne({
//   username: "john_doe",
//   email: "john@example.com",
//   passwordHash: passwordHash,
//   createdAt: new Date()
// });

// // Authenticate user
// const user = await db.collection('users').findOne({ username: "john_doe" });
// const isValid = await bcrypt.compare("user_password123", user.passwordHash);
