import { createAdmin, getAdmin, getAdminByUsername, LoginAdmin, updateAdmin, GetAdminAreaIssues } from '../models/AdminModel';


import { Request, Response } from 'express';

export const CreateAdminController = async (req: Request, res: Response) => {
    try {
        const admin = await createAdmin(req.body);
        if (admin) {
            res.status(201).json(admin);
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const GetAdminController = async (req: Request, res: Response) => {
    try {
        const admin = await getAdmin(req.params.id);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const GetAdminByUsernameController = async (req: Request, res: Response) => {
    try {
        const admin = await getAdminByUsername(req.params.username);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const UpdateAdminController = async (req: Request, res: Response) => {
    try {
        const admin = await updateAdmin(req.params.id, req.body);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const LoginAdminController = async (req: Request, res: Response) => {
    try {
        const admin = await LoginAdmin(req.body.username, req.body.password);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const GetAdminAreaIssuesController = async (req: Request, res: Response) => {
    try {
        const getAdminAreaIssue = await GetAdminAreaIssues(req.params.id);
        if (getAdminAreaIssue) {
            res.status(200).json(getAdminAreaIssue);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}