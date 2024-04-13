import { Schema, Document, model } from "mongoose";

export interface IIssue extends Document {
    IssueTitle: string;
    IssueDescription: string;
    IssueStatus: string;
    Views: number;
    IssueType: string;
    IssueImage: string[];
    IssueDate: Date;
    IssueLocation: string;
    IssueLatitude: number;
    IssueLongitude: number;
    IssueContact: string;
    IssuePincode: string;
}

const IssueSchema = new Schema<IIssue>({
    IssueTitle: { type: String, required: true },
    IssueDescription: { type: String, required: true },
    IssueStatus: { type: String, required: true },
    Views: { type: Number, required: true },
    IssueType: { type: String, required: true },
    IssueImage: { type: [String], required: true },
    IssueDate: { type: Date, required: true },
    IssuePincode: { type: String, required: true },
    IssueLocation: { type: String, required: true },
    IssueLatitude: { type: Number, required: true },
    IssueLongitude: { type: Number, required: true },
    IssueContact: { type: String },
}, {
    timestamps: true
})


export const IssuesModel = model<IIssue>('Issues', IssueSchema);

export const CreateIssue = async (IssueData: IIssue) => {
    const Issue = new IssuesModel(IssueData);
    return await Issue.save();
}

export const GetAllIssues = async () => {
    return await IssuesModel.find();
}

export const GetIssueById = async (id: string) => {
    return await IssuesModel.findById({ _id: id });
}

export const UpdateIssue = async (id: string, IssueData: IIssue) => {
    return await IssuesModel.findByIdAndUpdate({ _id: id }, IssueData, { new: true });
}

export const DeleteIssue = async (id: string) => {
    return await IssuesModel.findByIdAndDelete({ _id: id });
}

export const GetIssuesByPincode = async (pincode: string) => {
    return await IssuesModel.find({ IssuePincode: pincode });
}

export const GetIssuesByLocation = async (location: string) => {
    return await IssuesModel.find({ IssueLocation: location });
}

export const GetIssuesByType = async (type: string) => {
    return await IssuesModel.find({ IssueType: type });
}

export const GetIssuesByStatus = async (status: string) => {
    return await IssuesModel.find({ IssueStatus: status });
}

export const GetIssuesByDate = async (date: Date) => {
    return await IssuesModel.find({ IssueDate: date });
}

export const UpdateStatus = async (id: string, status: string) => {
    try {
        const Issue = await IssuesModel.findById({ _id: id });
        if (Issue) {
            Issue.IssueStatus = status;
            return await Issue.save();
        }
        return null;
    } catch (error) {
        return null;
    }
}

