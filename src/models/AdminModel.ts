import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IssuesModel } from './IssuesModel';

export interface IAdmin extends Document {
    username: string;
    authentication: {
        password: string;
        salt: string;
    }
    PlaceOfService: string;
    Areas: Array<number>;
    city: string;
    state: string;
    role: string;
}

const AdminSchema = new Schema<IAdmin>({
    username: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false }
    },
    PlaceOfService: { type: String, required: true },
    Areas: { type: [Number], required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    role: { type: String, required: true }
});

const AdminModel = model<IAdmin>('Admin', AdminSchema);

export const createAdmin = async (admin: Record<string, any>) => {
    try {
        const { password, ...adminDataWithoutPassword } = admin;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new AdminModel({
            ...adminDataWithoutPassword,
            authentication: {
                password: hashedPassword,
                salt: salt
            }
        });
        return await newAdmin.save();

    } catch (error) {
        throw new Error(String(error));
    }
}

export const updateAdmin = async (id: string, admin: IAdmin) => {
    const updatedAdmin = await AdminModel.findByIdAndUpdate(id, admin, { new: true });
    return updatedAdmin;
};

export const deleteAdmin = async (id: string) => {
    await AdminModel.findByIdAndDelete(id);
};

export const getAdmin = async (id: string) => {
    const admin = await AdminModel.findById(id);
    return admin;
};

export const getAdminByUsername = async (username: string) => {
    const admin = await AdminModel.findOne({ username });
    return admin;
};

export const LoginAdmin = async (username: string, password: string) => {
    const admin = await AdminModel.findOne({ username }).select('+authentication.password');
    if (!admin) {
        return null;
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.authentication.password);
    if (!isPasswordCorrect) {
        return null;
    }
    return admin;
}

export const GetAdminAreaIssues = async (id: string) => {
    const admin = await getAdmin(id);
    if (!admin) {
        return null;
    }
    const issues = await IssuesModel.find({ Area: { $in: admin.Areas } });
    return issues;
};
