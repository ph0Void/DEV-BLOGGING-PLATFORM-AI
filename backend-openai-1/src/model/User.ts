import mongoose, { Schema } from "mongoose";

export interface User extends Document {
    _id?: mongoose.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    role?: "ADMIN" | "USER";
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const UserModel = mongoose.model<User>('User', userSchema);