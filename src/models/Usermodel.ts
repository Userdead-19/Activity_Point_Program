import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt";

export interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    profilePicture: string;
    authentication: {
        password: string;
        salt: string;
    },
    Issues: Schema.Types.ObjectId[];
    GreenPoints: number;
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false }

    },
    Issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
    GreenPoints: { type: Number, default: 0 }
});


const UserModel = mongoose.model<IUser>('User', UserSchema);

export const CreateUser = async (user: Record<string, any>) => {
    try {
        const { password, ...userDataWithoutPassword } = user;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            ...userDataWithoutPassword,
            authentication: {
                password: hashedPassword,
                salt: salt,
            },
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

export const LoginUser = async (username: string, password: string) => {
    try {
        const user = await UserModel.findOne({ username: username }).select('+authentication.password +authentication.salt');
        if (!user) return null;
        console.log(user);
        const isPasswordValid = await bcrypt.compare(password, user.authentication.password);
        if (!isPasswordValid) return null;
        return user;
    } catch (error) {
        return null;
    }
};

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