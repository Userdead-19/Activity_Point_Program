import { Router } from "express";

import { createUser, loginUser, getUser, updateUsers } from "../controllers/UserControllers";

const router = Router();

router.post('/user', createUser);

router.post('/login', loginUser);

router.get('/user/:username', getUser);

router.put('/user', updateUsers);

export default router;