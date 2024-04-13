import {
    CreateIssue,
    GetAllIssues,
    GetIssueById,
    UpdateIssue,
    DeleteIssue,
    GetIssuesByLocation,
    GetIssuesByPincode,
    UpdateStatus,
    GetIssuesByStatus,
    GetIssuesByType,
} from "../models/IssuesModel";
import { Request, Response } from "express";

export const CreateIssueController = async (req: Request, res: Response) => {
    try {
        const Issue = await CreateIssue(req.body);
        if (Issue) {
            res.status(201).json(Issue);
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const GetAllIssuesController = async (req: Request, res: Response) => {
    try {
        const Issues = await GetAllIssues();
        if (Issues) {
            res.status(200).json(Issues);
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const GetIssueByIdController = async (req: Request, res: Response) => {
    try {
        const Issue = await GetIssueById(req.params.id);
        if (Issue) {
            res.status(200).json(Issue);
        } else {
            res.status(404).json({ message: "Issue not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const UpdateIssueController = async (req: Request, res: Response) => {
    try {
        const Issue = await UpdateIssue(req.params.id, req.body);
        if (Issue) {
            res.status(200).json(Issue);
        } else {
            res.status(404).json({ message: "Issue not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const DeleteIssueController = async (req: Request, res: Response) => {
    try {
        const Issue = await DeleteIssue(req.params.id);
        if (Issue) {
            res.status(200).json({ message: "Issue deleted successfully" });
        } else {
            res.status(404).json({ message: "Issue not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const GetIssuesByPincodeController = async (
    req: Request,
    res: Response
) => {
    try {
        const Issues = await GetIssuesByPincode(req.params.pincode);
        if (Issues) {
            res.status(200).json(Issues);
        } else {
            res.status(404).json({ message: "Issues not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const GetIssuesByLocationController = async (
    req: Request,
    res: Response
) => {
    try {
        const Issues = await GetIssuesByLocation(req.params.location);
        if (Issues) {
            res.status(200).json(Issues);
        } else {
            res.status(404).json({ message: "Issues not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const UpdateStatusController = async (req: Request, res: Response) => {
    try {
        const Issue = await UpdateStatus(req.params.id, req.body.status);
        if (Issue) {
            res.status(200).json(Issue);
        } else {
            res.status(404).json({ message: "Issue not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const GetIssuesByTypeController = async (
    req: Request,
    res: Response
) => {
    try {
        const Issues = await GetIssuesByType(req.params.type);
        if (Issues) {
            res.status(200).json(Issues);
        } else {
            res.status(404).json({ message: "Issues not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const GetIssuesByStatusController = async (
    req: Request,
    res: Response
) => {
    try {
        const Issues = await GetIssuesByStatus(req.params.status);
        if (Issues) {
            res.status(200).json(Issues);
        } else {
            res.status(404).json({ message: "Issues not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
