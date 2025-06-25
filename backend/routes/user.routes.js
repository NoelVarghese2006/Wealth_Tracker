import express from 'express';

import { addData, createUser, deleteData, deleteUser, editData, editUser, getAllUsers, getUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/credentials/:username/:password', getUser); // renamed for clarity

router.post('/data/:username', addData);

router.post('/', createUser);

router.delete('/data/:username/:index', deleteData);

router.delete('/user/:id', deleteUser); // disambiguated

router.put('/data/:username/:index', editData);

router.put('/user/:id', editUser); // disambiguated

export default router;