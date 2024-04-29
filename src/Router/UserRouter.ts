import { Router } from "express";
import { checkToken } from "../controllers/AuthController";
import { createUser, generateJwt, getUser, updateUsers } from "../controllers/UserControllers";

const router = Router();

router.post('/user', createUser);

router.post('/login', generateJwt);

router.get('/user/:username', checkToken, getUser);

router.put('/user', checkToken, updateUsers);

export default router;