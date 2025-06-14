import express from 'express';

import { addData, createUser, deleteData, deleteUser, editUser, getAllUsers, getUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:username', getUser);

router.post('/:username', addData);

router.delete('/:username/:index', deleteData);

router.put('/:id', editUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

export default router;