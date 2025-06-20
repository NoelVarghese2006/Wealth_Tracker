import express from 'express';

import { addData, createUser, deleteData, deleteUser, editData, editUser, getAllUsers, getUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:username/:password', getUser);

router.post('/:username', addData);

router.post('/', createUser);

router.delete('/:username/:index', deleteData);

router.delete('/:id', deleteUser);

router.put('/:username/:id', editData);

router.put('/:id', editUser);

export default router;