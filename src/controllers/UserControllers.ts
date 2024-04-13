import { CreateUser, GetUserByUsername, LoginUser, updateUser } from '../models/Usermodel';
import { Request, Response } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
require('dotenv').config();


export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await CreateUser(req.body);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await LoginUser(req.body.username, req.body.password);
        if (!user) {
            res.status(400).json({ error: 'Invalid username or password' });
            return;
        }
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
        res.status(200).json({ user: user, token: token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await GetUserByUsername(req.params.username);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


export const updateUsers = async (req: Request, res: Response) => {
    try {
        if (req.body.token) {
            const user = await updateUser(req.body.user);
            res.status(200).json(user);
        } else {
            res.status(400).json({ error: 'User not found' });
        }

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}