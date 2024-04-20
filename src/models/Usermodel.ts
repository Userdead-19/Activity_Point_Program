import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt";

export interface IUser extends Document {
    FirstName: string;
    LastName: string;
    email: string;
    username: string;
    profilePicture: string;
    authentication: {
        password: string;
        salt: string;
    },
    Issues: Schema.Types.ObjectId[];
    GreenPoints: number;
    clientid: string;
}

const UserSchema = new Schema<IUser>({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    Issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
    GreenPoints: { type: Number, default: 0 },
    clientid: { type: String, required: true },
});


const UserModel = mongoose.model<IUser>('User', UserSchema);

export const CreateUser = async (user: Record<string, any>) => {
    try {

        const userData = user;
        const newUser = new UserModel({
            ...userData
        });

        return await newUser.save();
    } catch (error) {
        throw new Error(String(error));
    }
};
export const GetUserByUsername = async (username: string) => {
    try {
        const user = await UserModel.findOne({ username: username });
        return user;
    } catch (error) {
        return null;
    }
}

export const GetUserByEmail = async (email: string) => {
    try {
        const user = await UserModel.findOne({ email: email });
        return user;
    } catch (error) {
        return null;
    }
}

export const updateUser = async (user: IUser) => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, user, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const generateUser = async (userid: string) => {
    try {
        const response = await UserModel.findOne({ email: userid })
        return response;

    } catch (error) {
        throw new Error(String(error));


    }
}

export const AddIssues = async (user: IUser, issueId: Schema.Types.ObjectId) => {
    try {
        user.Issues.push(issueId);
        return await updateUser(user);
    } catch (error) {
        throw new Error(String(error));
    }
}

export const UpdatePoints = async (user: IUser, points: number) => {
    try {
        user.GreenPoints += points;
        return await updateUser(user);
    } catch (error) {
        throw new Error(String(error));
    }
}