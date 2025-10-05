import express from 'express';

import { addData, createUser, deleteData, deleteUser, editData, editUser, getAllUsers, getUser, getData } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/credentials/:username/:password', getUser); // renamed for clarity

router.post('/data/:username', addData);

router.post('/', createUser);

router.delete('/data/:user_id/:id', deleteData);

router.delete('/user/:id', deleteUser); // disambiguated

router.put('/data/:user_id/:id', editData);

router.put('/user/:id', editUser); // disambiguated

export default router;