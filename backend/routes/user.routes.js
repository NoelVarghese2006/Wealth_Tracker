import express from 'express';

import { createUser, deleteUser, editUser, getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.put('/:id', editUser);


router.post('/', createUser);

router.delete('/:id', deleteUser);

export default router;