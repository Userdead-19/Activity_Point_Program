import { Router } from "express";

import { createUser, generateJwt, getUser, updateUsers } from "../controllers/UserControllers";

const router = Router();

router.post('/user', createUser);

router.post('/login', generateJwt);

router.get('/user/:username', getUser);

router.put('/user', updateUsers);

export default router;